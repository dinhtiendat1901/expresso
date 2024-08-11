use std::fs::File;
use std::io::{self, BufRead, Write};
use std::path::Path;

#[derive(Clone, Debug)]
pub struct ContentBetween {
    pub start_line_number: usize,
    pub end_line_number: usize,
    pub content: Vec<String>,
}

pub fn replace_words(file_path: &str, old_value: &str, new_value: &str) -> io::Result<()> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let mut lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    for line in lines.iter_mut() {
        *line = line.replace(old_value, new_value);
    }

    write_lines(&path, &lines)?;
    Ok(())
}

pub fn get_content_between_string(
    file_path: &str,
    start_string: &str,
    end_string: &str,
    contain: bool,
) -> io::Result<Vec<ContentBetween>> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;
    let mut results = Vec::new();

    let mut start_index: Option<usize> = None;

    for (i, line) in lines.iter().enumerate() {
        let start_condition = if contain {
            line.contains(start_string)
        } else {
            line.trim() == start_string
        };

        let end_condition = if contain {
            line.contains(end_string)
        } else {
            line.trim() == end_string
        };

        if start_condition {
            start_index = Some(i);
        }
        if end_condition {
            if let Some(start) = start_index {
                if i >= start {
                    let content = lines[start..=i].to_vec();
                    results.push(ContentBetween {
                        start_line_number: start + 1, // Convert to 1-based index
                        end_line_number: i + 1,       // Convert to 1-based index
                        content,
                    });
                    start_index = None; // Reset start index to find the next pair
                }
            }
        }
    }

    Ok(results)
}

pub fn remove_specific_line(file_path: &str, contain_string: &str) -> io::Result<()> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    let filtered_lines: Vec<String> = lines.into_iter().filter(|line| !line.contains(contain_string)).collect();

    write_lines(&path, &filtered_lines)?;
    Ok(())
}

pub fn wrap_content(
    list_content: Vec<ContentBetween>,
    wrap_pattern: &str,
) -> Result<Vec<ContentBetween>, &'static str> {
    if !wrap_pattern.contains("...") {
        return Err("wrap_pattern must contain '...'");
    }

    let mut wrapped_contents = Vec::new();

    for content_between in list_content {
        let content_str = content_between.content.join("\n");
        let wrapped_str = wrap_pattern.replace("...", &content_str);
        let wrapped_lines: Vec<String> = wrapped_str.lines().map(|line| line.to_string()).collect();

        wrapped_contents.push(ContentBetween {
            start_line_number: content_between.start_line_number,
            end_line_number: content_between.end_line_number,
            content: wrapped_lines,
        });
    }

    Ok(wrapped_contents)
}

pub fn find_closest_braces_with_content(
    file_path: &str,
    contain_string: &str,
    include_wrapper: bool,
) -> io::Result<Vec<ContentBetween>> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;
    let mut results = Vec::new();

    for (i, line) in lines.iter().enumerate() {
        if line.contains(contain_string) {
            if let Some((open_brace_line, close_brace_line, content)) = find_braces(&lines, i + 1, include_wrapper) {
                results.push(ContentBetween {
                    start_line_number: open_brace_line,
                    end_line_number: close_brace_line,
                    content,
                });
            }
        }
    }

    Ok(results)
}

fn find_braces(lines: &[String], line_number: usize, include_wrapper: bool) -> Option<(usize, usize, Vec<String>)> {
    let mut brace_balance = 0;

    if line_number == 0 || line_number > lines.len() {
        return None;
    }

    let mut open_brace_line = None;

    // Find the closest parent open brace
    for (i, line) in lines.iter().enumerate().take(line_number - 1).rev() {
        for ch in line.chars() {
            if ch == '}' {
                brace_balance += 1;
            } else if ch == '{' {
                if brace_balance == 0 {
                    open_brace_line = Some(i + 1); // Return 1-based line number
                    break;
                } else {
                    brace_balance -= 1;
                }
            }
        }
        if open_brace_line.is_some() {
            break;
        }
    }

    // If no open brace was found, return None
    let open_brace_line = open_brace_line?;

    brace_balance = 0;
    let mut content = Vec::new();

    // Find the corresponding close brace and extract content
    for (i, line) in lines.iter().enumerate().skip(open_brace_line).take(lines.len() - open_brace_line) {
        for ch in line.chars() {
            if ch == '{' {
                brace_balance += 1;
            } else if ch == '}' {
                if brace_balance == 0 {
                    let close_brace_line = i + 1;
                    if include_wrapper {
                        let start = open_brace_line.saturating_sub(1);
                        let end = close_brace_line.min(lines.len());
                        content = lines[start..end].to_vec();
                        return Some((start + 1, end, content)); // Return 1-based line numbers and content
                    } else {
                        return Some((open_brace_line + 1, close_brace_line - 1, content)); // Return 1-based line numbers and content
                    }
                } else {
                    brace_balance -= 1;
                }
            }
        }
        content.push(line.clone());
    }

    None
}

pub fn write_file_with_list_content(file_path: &str, list_content: Vec<ContentBetween>) -> io::Result<()> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let mut lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    // To keep track of line number changes
    let mut offset: isize = 0;

    for content_between in list_content {
        let start_index = (content_between.start_line_number as isize - 1 + offset) as usize;
        let end_index = (content_between.end_line_number as isize + offset) as usize;
        let original_length = end_index - start_index;
        let new_length = content_between.content.len();

        // Replace the specified range with new content
        lines.splice(start_index..end_index, content_between.content.clone());

        // Adjust offset for the next iteration
        offset += new_length as isize - original_length as isize;
    }

    write_lines(&path, &lines)?;
    Ok(())
}

pub fn filter_list_content(list_content: Vec<ContentBetween>, contain_string: &str) -> Vec<ContentBetween> {
    list_content.into_iter()
        .filter(|content_between| !content_between.content.iter().any(|line| line.contains(contain_string)))
        .collect()
}

pub fn cut_off_file(file_path: &str, start_line: &str, end_line: &str) -> io::Result<()> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    let start_index = lines.iter().position(|line| line.contains(start_line));
    let end_index = lines.iter().position(|line| line.contains(end_line));

    if let (Some(start), Some(end)) = (start_index, end_index) {
        if start < end {
            let new_content: Vec<String> = lines[(start + 1)..end].to_vec();
            write_lines(&path, &new_content)?;
        } else {
            eprintln!("The start line is after the end line.");
            return Err(io::Error::new(io::ErrorKind::InvalidInput, "Invalid line order"));
        }
    }

    Ok(())
}

fn write_lines<P>(filename: P, lines: &[String]) -> io::Result<()>
where
    P: AsRef<Path>,
{
    let mut file = File::create(filename)?;
    for line in lines {
        writeln!(file, "{}", line)?;
    }
    Ok(())
}

pub fn remove_brace(file_path: &str, list_content: Vec<ContentBetween>) -> io::Result<()> {
    let path = Path::new(file_path);
    let file = File::open(&path)?;
    let reader = io::BufReader::new(file);
    let mut lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    // Collect all wrap-line pairs to remove
    let mut wrap_lines: Vec<(usize, usize)> = Vec::new();
    for content in list_content {
        if content.start_line_number > 1 && content.end_line_number <= lines.len() {
            wrap_lines.push((content.start_line_number - 1, content.end_line_number + 1));
        }
    }

    // Remove the wrap-line pairs from the file content, adjusting for removed lines
    let mut removed_count = 0;
    for (start_line, end_line) in wrap_lines {
        let adjusted_start = start_line - removed_count - 1;
        let adjusted_end = end_line - removed_count - 1;

        if adjusted_end < lines.len() {
            lines.remove(adjusted_end);
        }
        if adjusted_start < lines.len() {
            lines.remove(adjusted_start);
        }

        removed_count += 2;
    }

    write_lines(&path, &lines)?;
    Ok(())
}

pub fn merge_element_consecutive(list_content: Vec<ContentBetween>) -> Vec<ContentBetween> {
    if list_content.is_empty() {
        return list_content;
    }

    let mut merged_list = Vec::new();
    let mut current_element = list_content[0].clone();

    for element in list_content.into_iter().skip(1) {
        if element.start_line_number == current_element.end_line_number + 1 {
            // Consecutive element, merge it
            current_element.end_line_number = element.end_line_number;
            current_element.content.extend(element.content);
        } else {
            // Non-consecutive element, push the current one and start a new one
            merged_list.push(current_element);
            current_element = element;
        }
    }

    // Push the last merged element
    merged_list.push(current_element);

    merged_list
}
