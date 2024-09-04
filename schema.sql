-- & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u root -p

CREATE TABLE student_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL,
    day VARCHAR(10) NOT NULL,
    progress INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(id)
);

INSERT INTO student_progress (student_id, day, progress) VALUES 
('student-uuid-1', 'Mon', 70),
('student-uuid-1', 'Tue', 60),
('student-uuid-1', 'Wed', 30),
('student-uuid-1', 'Thu', 80),
('student-uuid-1', 'Fri', 50),
('student-uuid-1', 'Sat', 70),
('student-uuid-1', 'Sun', 40);
