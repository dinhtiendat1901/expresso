use std::fs::File;
use std::io::{self, BufRead, BufReader, Write};
use std::path::Path;

#[derive(Clone, Debug)]
pub struct ContentBetween {
    pub start_line_number: usize,
    pub end_line_number: usize,
    pub content: Vec<String>,
}

pub struct ScriptFile {
    pub path: String,
    pub content: Vec<String>,
    pub list_filtered: Vec<ContentBetween>,
}


impl ScriptFile {
    pub fn read_file(&mut self) -> io::Result<()> {
        let file = File::open(&self.path)?;
        let reader = BufReader::new(file);
        self.content = reader.lines().collect::<Result<_, _>>()?;
        Ok(())
    }

    pub fn find_closest_braces(
        &mut self,
        contain_string: &str,
        include_wrapper: bool,
    ) -> &mut Self {
        let lines = &self.content;
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

        self.list_filtered = results;
        self
    }

    pub fn wrap_with_pattern(&mut self, wrap_pattern: &str) -> &mut Self {
        let mut wrapped_contents = Vec::new();

        for content_between in &self.list_filtered {
            let content_str = content_between.content.join("\n");
            let wrapped_str = wrap_pattern.replace("...", &content_str);
            let wrapped_lines: Vec<String> = wrapped_str.lines().map(|line| line.to_string()).collect();

            wrapped_contents.push(ContentBetween {
                start_line_number: content_between.start_line_number,
                end_line_number: content_between.end_line_number,
                content: wrapped_lines,
            });
        }

        self.list_filtered = wrapped_contents;
        self
    }

    pub fn rewrite_content(&mut self) -> &mut Self {
        // To keep track of line number changes
        let mut offset: isize = 0;

        for content_between in &self.list_filtered {
            let start_index = (content_between.start_line_number as isize - 1 + offset) as usize;
            let end_index = (content_between.end_line_number as isize + offset) as usize;
            let original_length = end_index - start_index;
            let new_length = content_between.content.len();

            // Replace the specified range with new content
            self.content.splice(start_index..end_index, content_between.content.clone());

            // Adjust offset for the next iteration
            offset += new_length as isize - original_length as isize;
        }

        self
    }

    pub fn rewrite_file(&self) -> io::Result<()> {
        // Write lines to the file
        let path = Path::new(&self.path);
        let mut file = File::create(path)?;
        for line in &self.content {
            writeln!(file, "{}", line)?;
        }
        Ok(())
    }

    pub fn find_between_string(
        &mut self,
        start_string: &str,
        end_string: &str,
        contain: bool,
    ) -> &mut Self {
        let lines = &self.content;
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

        self.list_filtered = results;
        self
    }

    pub fn remove_brace(&mut self) -> &mut Self {
        for content_between in &mut self.list_filtered {
            if content_between.content.len() > 2 {
                content_between.content.remove(0); // Remove the first line
                content_between.content.pop(); // Remove the last line
            }
        }
        self
    }

    pub fn merge_element_consecutive(&mut self) -> &mut Self {
        if self.list_filtered.is_empty() {
            return self;
        }

        let mut merged_list = Vec::new();
        let mut current_element = self.list_filtered[0].clone();

        for element in self.list_filtered.iter().skip(1) {
            if element.start_line_number == current_element.end_line_number + 1 {
                // Consecutive element, merge it
                current_element.end_line_number = element.end_line_number;
                current_element.content.extend(element.content.clone());
            } else {
                // Non-consecutive element, push the current one and start a new one
                merged_list.push(current_element);
                current_element = element.clone();
            }
        }

        // Push the last merged element
        merged_list.push(current_element);

        self.list_filtered = merged_list;
        self
    }

    pub fn filter_list_content(&mut self, contain_string: &str) -> &mut Self {
        self.list_filtered = self.list_filtered
            .clone()
            .into_iter()
            .filter(|content_between| !content_between.content.iter().any(|line| line.contains(contain_string)))
            .collect();
        self
    }

    pub fn cut_off_file(&mut self, start_line: &str, end_line: &str) -> &mut Self {
        let start_index = self.content.iter().position(|line| line.contains(start_line));
        let end_index = self.content.iter().position(|line| line.contains(end_line));

        if let (Some(start), Some(end)) = (start_index, end_index) {
            if start < end {
                let new_content: Vec<String> = self.content[(start + 1)..end].to_vec();
                self.content = new_content;
            }
        }

        self
    }

    pub fn remove_lines(&mut self, contain_string: &str) -> &mut Self {
        self.content = self.content
            .clone()
            .into_iter()
            .filter(|line| !line.contains(contain_string))
            .collect();
        self
    }

    pub fn replace_words(&mut self, old_value: &str, new_value: &str) -> &mut Self {
        for line in self.content.iter_mut() {
            *line = line.replace(old_value, new_value);
        }
        self
    }
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