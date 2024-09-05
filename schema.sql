-- & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u root -p


CREATE TABLE student_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL,
    day VARCHAR(10) NOT NULL,
    progress INT NOT NULL,
    week_start_date DATE NOT NULL,
    UNIQUE (student_id, day, week_start_date)
);
