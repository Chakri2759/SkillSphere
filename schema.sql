-- & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u root -p

-- Create student_progress table
-- CREATE TABLE student_progress (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     student_id VARCHAR(100),
--     subject_id VARCHAR(100),
--     progress_percentage DECIMAL(5,2),
--     date DATE,
--     weekday VARCHAR(80)
-- );


-- Insert sample progress data with the current weekday
INSERT INTO student_progress (student_id, subject_id, progress_percentage, date, weekday)
VALUES
    -- ('b3dffc26-4552-461d-b959-e42e166574aa',101, 80.50, '2024-09-15', 'Mon'),
    -- ('b3dffc26-4552-461d-b959-e42e166574aa',102, 90.75, '2024-09-16', 'Tue'),
    -- ('b3dffc26-4552-461d-b959-e42e166574aa',103, 78.25, '2024-09-17', 'Wed'),
    ('b3dffc26-4552-461d-b959-e42e166574aa',104, 50, '2024-09-18', 'Thu');


-- Calculate average progress grouped by weekday
-- SELECT weekday, AVG(progress_percentage) AS average_progress
-- FROM student_progress
-- GROUP BY weekday
-- ORDER BY FIELD(weekday, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');

