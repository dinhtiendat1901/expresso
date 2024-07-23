use std::fs::File;
use std::io::{self, BufRead, Write};
use std::path::Path;

pub fn remove_line_and_wrap_with_pattern<P>(filename: P, start_str: &str, replace_pattern: &str) -> io::Result<()>
where
    P: AsRef<Path>,
{
    let file = File::open(&filename)?;
    let reader = io::BufReader::new(file);
    let mut lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    match find_statements_and_apply_braces(&mut lines, start_str, replace_pattern) {
        Ok(_) => {
            // Write the modified lines back to the original file
            write_lines(&filename, &lines)?;
            Ok(())
        }
        Err(e) => {
            eprintln!("Error: {}", e);
            Err(io::Error::new(io::ErrorKind::Other, e))
        }
    }
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

pub fn get_content_between_line(file_path: &str, start_line: &str, end_line: &str) -> io::Result<()> {
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
    } else {
        eprintln!("Start line or end line not found.");
        return Err(io::Error::new(io::ErrorKind::NotFound, "Line not found"));
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

fn find_closest_braces_with_content(lines: &[String], line_number: usize) -> Option<(usize, usize, Vec<String>)> {
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
                    return Some((open_brace_line, i + 1, content)); // Return 1-based line number and content
                } else {
                    brace_balance -= 1;
                }
            }
        }
        content.push(line.clone());
    }

    None
}

fn find_statements_and_apply_braces(lines: &mut Vec<String>, start_str: &str, replace_pattern: &str) -> Result<Vec<(usize, usize, usize, String)>, &'static str> {
    if !replace_pattern.contains("...") {
        return Err("replace_pattern must contain '...'");
    }

    let mut results = Vec::new();

    let mut i = 0;
    while i < lines.len() {
        if lines[i].trim_start().starts_with(start_str) {
            if let Some((open_brace_line, close_brace_line, mut content)) = find_closest_braces_with_content(&lines, i + 1) {
                // Remove the initial statement starting with start_str from the content
                content.drain(..i + 1 - open_brace_line);

                let content_str = content.join("\n");
                let replaced_content = replace_pattern.replace("...", &content_str);
                results.push((i + 1, open_brace_line, close_brace_line, replaced_content.clone())); // 1-based line numbers

                // Remove the statement and content between braces
                lines.drain(i..close_brace_line - 1);

                // Insert the replaced content at the position of the statement
                lines.insert(i, replaced_content);
            } else {
                i += 1;
            }
        } else {
            i += 1;
        }
    }

    Ok(results)
}
