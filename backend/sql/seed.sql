USE it_major_recommendation;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (full_name, email, role, password_hash, student_code, department_name, intake_year, study_year, account_status) VALUES
('Pham Dong Hai', 'student1@example.com', 'student', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', 'IT2024-001', 'School of Computer Science and Engineering', 2024, 'Year 1', 'active'),
('Nguyen Minh Anh', 'student2@example.com', 'student', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', 'IT2024-002', 'School of Computer Science and Engineering', 2024, 'Year 1', 'active'),
('Tran Quoc Bao', 'student3@example.com', 'student', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', 'IT2023-021', 'School of Computer Science and Engineering', 2023, 'Year 2', 'active'),
('Le Thu Trang', 'student4@example.com', 'student', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', 'IT2023-034', 'School of Computer Science and Engineering', 2023, 'Year 2', 'active'),
('Vo Gia Huy', 'student5@example.com', 'student', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', 'IT2022-015', 'School of Computer Science and Engineering', 2022, 'Year 3', 'active'),
('Pham Hoang Yen', 'student6@example.com', 'student', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', 'IT2022-027', 'School of Computer Science and Engineering', 2022, 'Year 3', 'active'),
('Advisor Alice Nguyen', 'advisor1@example.com', 'advisor', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', NULL, 'School of Computer Science and Engineering', NULL, NULL, 'active'),
('Advisor Brian Tran', 'advisor2@example.com', 'advisor', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', NULL, 'School of Computer Science and Engineering', NULL, NULL, 'active'),
('Dept Admin Chloe Pham', 'dept1@example.com', 'department_admin', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', NULL, 'School of Computer Science and Engineering', NULL, NULL, 'active'),
('Dept Admin David Le', 'dept2@example.com', 'department_admin', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', NULL, 'School of Computer Science and Engineering', NULL, NULL, 'active'),
('System Admin Emma Do', 'sys1@example.com', 'system_admin', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', NULL, 'School of Computer Science and Engineering', NULL, NULL, 'active'),
('System Admin Felix Vu', 'sys2@example.com', 'system_admin', '$2b$10$OXTOIXQCyzokYgAJiTEuD.m.8Di4GR1TyI5YvQg.hSFy/kS3A9aqG', NULL, 'School of Computer Science and Engineering', NULL, NULL, 'active');

INSERT INTO majors (code, name, description) VALUES
('CS', 'Computer Science', 'Recommended for students who are strongest in algorithms, software construction, systems thinking, and rigorous problem solving.'),
('DS', 'Data Science', 'Recommended for students who are strongest in mathematics, statistics, machine learning, and data-driven reasoning.'),
('IT', 'Information Technology', 'Recommended for students who are strongest in practical systems, enterprise applications, infrastructure, security, and solution delivery.');

INSERT INTO subjects (subject_code, name, category, credits_total, credits_lecture, credits_lab, study_year, study_semester, program_track, is_year1_input, is_used_in_algorithm, display_order) VALUES
('MA001IU', 'Calculus 1', 'foundation_math', 4, 4, 0, 1, 1, 'common', 1, 1, 10),
('EN008IU', 'Academic English 1 (Listening Skills)', 'english', 2, 2, 0, 1, 1, 'common', 1, 0, 20),
('EN007IU', 'Academic English 1 (Writing Skills)', 'english', 2, 2, 0, 1, 1, 'common', 1, 0, 30),
('IT064IU', 'Introduction to Computing', 'it_core', 3, 3, 0, 1, 1, 'common', 1, 1, 40),
('IT116IU', 'C/C++ Programming', 'it_core', 4, 3, 1, 1, 1, 'common', 1, 1, 50),
('PT001IU', 'Physical Training 1', 'physical_training', 3, 0, 3, 1, 1, 'common', 0, 0, 60),
('IT153IU', 'Discrete Mathematics', 'foundation_math', 3, 3, 0, 1, 2, 'common', 1, 1, 70),
('PH013IU', 'Physics 1', 'foundation_science', 2, 2, 0, 1, 2, 'common', 1, 0, 80),
('IT067IU', 'Digital Logic Design', 'hardware_core', 3, 3, 0, 1, 2, 'common', 1, 1, 90),
('IT099IU', 'Digital Logic Design Laboratory', 'lab', 1, 0, 1, 1, 2, 'common', 1, 0, 100),
('IT069IU', 'Object-Oriented Programming', 'software_core', 4, 3, 1, 1, 2, 'common', 1, 1, 110),
('EN012IU', 'Academic English 2 (Speaking Skills)', 'english', 2, 2, 0, 1, 2, 'common', 1, 0, 120),
('EN011IU', 'Academic English 2 (Writing Skills)', 'english', 2, 2, 0, 1, 2, 'common', 1, 0, 130),
('IT154IU', 'Linear Algebra', 'foundation_math', 3, 3, 0, 2, 1, 'common', 0, 1, 140),
('MA003IU', 'Calculus 2', 'foundation_math', 4, 4, 0, 2, 1, 'common', 0, 0, 150),
('IT013IU', 'Algorithms and Data Structures', 'it_core', 4, 3, 1, 2, 1, 'common', 0, 1, 160),
('PH015IU', 'Physics 3', 'foundation_science', 3, 3, 0, 2, 1, 'common', 0, 0, 170),
('PH016IU', 'Physics 3 Laboratory', 'lab', 1, 0, 1, 2, 1, 'common', 0, 0, 180),
('MA026IU', 'Probability, Statistics and Random Process', 'foundation_math', 3, 3, 0, 2, 1, 'data_track', 0, 1, 190),
('IT149IU', 'Fundamentals of Programming', 'it_core', 4, 3, 1, 1, 1, 'data_track', 0, 1, 200),
('IT135IU', 'Introduction to Data Science', 'data_ai', 3, 3, 0, 1, 1, 'data_track', 0, 1, 210),
('IT151IU', 'Statistical Method', 'data_ai', 3, 3, 0, 2, 1, 'data_track', 0, 1, 220),
('IT097IU', 'Principles of Database Management', 'data_systems', 4, 3, 1, 2, 1, 'data_track', 0, 1, 230),
('IT140IU', 'Fundamental Concepts of Data Security', 'security', 4, 3, 1, 2, 1, 'data_track', 0, 1, 240),
('IT079IU', 'Principle of Database Management', 'data_systems', 4, 3, 1, 2, 1, 'network_computer', 0, 1, 250),
('IT089IU', 'Computer Architecture', 'systems', 4, 3, 1, 2, 1, 'network_computer', 0, 1, 260),
('IT091IU', 'Computer Networks', 'systems', 4, 3, 1, 2, 1, 'network_computer', 0, 1, 270),
('IT096IU', 'Net-Centric Programming', 'software_core', 4, 3, 1, 2, 2, 'network_computer', 0, 1, 280),
('IT094IU', 'Information System Management', 'information_systems', 3, 3, 0, 2, 2, 'network_computer', 0, 1, 290),
('IT017IU', 'Operating System', 'systems', 4, 3, 1, 2, 2, 'network_computer', 0, 1, 300),
('IT093IU', 'Web Application Development', 'software_core', 4, 3, 1, 2, 2, 'network_computer', 0, 1, 310),
('IT117IU', 'System and Network Security', 'security', 4, 3, 1, 3, 1, 'network_computer', 0, 1, 320),
('IT134IU', 'Internet of Things', 'systems', 4, 3, 1, 3, 1, 'network_computer', 0, 1, 330),
('IT074IU', 'Electronics Devices', 'hardware_core', 4, 3, 1, 2, 2, 'computer_engineering', 0, 0, 340),
('IT101IU', 'Electronics Devices Laboratory', 'lab', 1, 0, 1, 2, 2, 'computer_engineering', 0, 0, 350),
('IT068IU', 'Principles of Electrical Engineering I', 'hardware_core', 4, 3, 1, 2, 2, 'computer_engineering', 0, 0, 360),
('IT098IU', 'Principles of Electrical Engineering I Laboratory', 'lab', 1, 0, 1, 2, 2, 'computer_engineering', 0, 0, 370),
('IT105IU', 'Digital System Design', 'hardware_core', 4, 3, 1, 3, 1, 'computer_engineering', 0, 0, 380),
('IT106IU', 'Digital System Design Laboratory', 'lab', 1, 0, 1, 3, 1, 'computer_engineering', 0, 0, 390),
('IT128IU', 'Micro-processing Systems', 'hardware_core', 4, 3, 1, 3, 1, 'computer_engineering', 0, 0, 400),
('IT129IU', 'Micro-processing Systems Laboratory', 'lab', 1, 0, 1, 3, 1, 'computer_engineering', 0, 0, 410),
('IT115IU', 'Embedded Systems', 'hardware_core', 4, 3, 1, 3, 2, 'computer_engineering', 0, 0, 420),
('IT127IU', 'Embedded Systems Laboratory', 'lab', 1, 0, 1, 3, 2, 'computer_engineering', 0, 0, 430),
('IT110IU', 'Concepts in VLSI Design', 'hardware_core', 4, 3, 1, 3, 2, 'computer_engineering', 0, 0, 440),
('IT126IU', 'Concepts in VLSI Design Laboratory', 'lab', 1, 0, 1, 3, 2, 'computer_engineering', 0, 0, 450),
('IT103IU', 'Digital Signal Processing', 'hardware_core', 4, 3, 1, 3, 2, 'computer_engineering', 0, 0, 460),
('IT125IU', 'System and Network Administration', 'systems', 4, 3, 1, 3, 2, 'network_computer', 0, 1, 470),
('IT120IU', 'Entrepreneurship', 'professional', 3, 3, 0, 4, 1, 'common', 0, 0, 480),
('IT082IU', 'Internship', 'internship', 4, 0, 4, 4, 2, 'common', 0, 0, 490),
('IT083IU', 'Special Study of the Field', 'capstone', 4, 0, 4, 4, 2, 'common', 0, 0, 500),
('IT058IU', 'Thesis', 'capstone', 12, 0, 12, 5, 1, 'common', 0, 0, 510),
('IT139IU', 'Scalable and Distributed Computing', 'systems', 4, 3, 1, 3, 2, 'software_systems', 0, 1, 520),
('IT159IU', 'Artificial Intelligence', 'data_ai', 4, 3, 1, 3, 1, 'data_track', 0, 1, 530),
('IT090IU', 'Object-Oriented Analysis and Design', 'software_core', 4, 3, 1, 3, 1, 'software_systems', 0, 1, 540),
('IT133IU', 'Mobile Application Development', 'software_core', 4, 3, 1, 3, 2, 'software_systems', 0, 1, 550),
('IT044IU', 'Human Computer Interaction', 'software_core', 3, 3, 0, 3, 2, 'software_systems', 0, 1, 560),
('IT164IU', 'Cloud Computing', 'systems', 4, 3, 1, 4, 1, 'software_systems', 0, 1, 570),
('IT165IU', 'Security Technology and Implementation', 'security', 4, 3, 1, 4, 1, 'network_computer', 0, 1, 580),
('IT166IU', 'Software Quality Verification and Validation', 'software_core', 4, 3, 1, 4, 1, 'software_systems', 0, 1, 590),
('IT167IU', 'Game Application Development', 'software_core', 4, 3, 1, 4, 1, 'software_systems', 0, 0, 600),
('IT150IU', 'Blockchain', 'systems', 3, 3, 0, 4, 1, 'software_systems', 0, 0, 610),
('IT156IU', 'Development & Operation (DevOps)', 'systems', 3, 3, 0, 4, 1, 'software_systems', 0, 1, 620),
('IT138IU', 'Data Science and Visualization', 'data_ai', 3, 3, 0, 3, 2, 'data_track', 0, 1, 630),
('PE008IU', 'Critical Thinking', 'general_education', 2, 2, 0, 2, 1, 'common', 0, 0, 640),
('PE020IU', 'Engineering Ethics and Professional Skills', 'professional', 2, 2, 0, 3, 1, 'common', 0, 0, 650),
('IT092IU', 'Principles of Programming Languages', 'software_core', 3, 3, 0, 3, 1, 'software_systems', 0, 1, 660),
('IT160IU', 'Data Mining', 'data_ai', 4, 3, 1, 3, 2, 'data_track', 0, 1, 670),
('IT130IU', 'Digital Image Processing', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 0, 680),
('IT114IU', 'Software Architecture', 'software_core', 4, 3, 1, 4, 1, 'software_systems', 0, 1, 690),
('IT076IU', 'Software Engineering', 'software_core', 4, 3, 1, 3, 1, 'software_systems', 0, 1, 700),
('IT168IU', 'Special Study of the Field 2', 'capstone', 4, 0, 4, 4, 2, 'common', 0, 0, 710),
('IT056IU', 'IT Project Management', 'professional', 4, 3, 1, 4, 1, 'software_systems', 0, 1, 720),
('IT024IU', 'Computer Graphics', 'software_core', 4, 3, 1, 4, 1, 'software_systems', 0, 0, 730),
('IT157IU', 'Deep Learning', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 1, 740),
('IT171IU', 'Statistical Learning', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 1, 750),
('IT137IU', 'Data Analysis', 'data_ai', 4, 3, 1, 3, 2, 'data_track', 0, 1, 760),
('IT136IU', 'Regression Analysis', 'data_ai', 4, 3, 1, 3, 2, 'data_track', 0, 1, 770),
('IT172IU', 'Machine Learning', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 1, 780),
('IT173IU', 'Big Data Analytics', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 1, 790),
('IT144IU', 'Business Process Analysis', 'information_systems', 3, 3, 0, 4, 1, 'it_management', 0, 1, 800),
('IT145IU', 'Decision Support Systems', 'information_systems', 4, 3, 1, 4, 1, 'it_management', 0, 1, 810),
('IT169IU', 'Time Series Analysis', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 1, 820),
('IT146IU', 'Theory of Networks', 'systems', 4, 3, 1, 4, 1, 'network_computer', 0, 1, 830),
('IT163IU', 'Optimization and Applications', 'data_ai', 4, 3, 1, 4, 1, 'data_track', 0, 1, 840),
('PH014IU', 'Physics 2', 'foundation_science', 3, 3, 0, 2, 1, 'common', 0, 0, 850),
('PH012IU', 'Physics 4', 'foundation_science', 2, 2, 0, 3, 1, 'common', 0, 0, 860),
('PE021IU', 'General Law', 'general_education', 3, 3, 0, 2, 2, 'common', 0, 0, 870),
('PE015IU', 'Philosophy of Marx-Lenin', 'general_education', 3, 3, 0, 1, 2, 'common', 0, 0, 880),
('PE016IU', 'Marx-Lenin Political Economy', 'general_education', 2, 2, 0, 2, 1, 'common', 0, 0, 890),
('PE017IU', 'Scientific Socialism', 'general_education', 2, 2, 0, 2, 2, 'common', 0, 0, 900),
('PE018IU', 'History of Vietnamese Communist Party', 'general_education', 2, 2, 0, 3, 1, 'common', 0, 0, 910),
('PE019IU', 'Ho Chi Minh Thought', 'general_education', 2, 2, 0, 3, 1, 'common', 0, 0, 920);

INSERT INTO interests (name, display_order) VALUES
('coding', 10),
('data', 20),
('math', 30),
('systems', 40),
('AI', 50),
('application', 60),
('security', 70),
('hardware', 80),
('research', 90),
('product_design', 100);

INSERT INTO self_assessment_questions (question_text, display_order) VALUES
('I enjoy solving programming problems.', 10),
('I like working with data and finding patterns.', 20),
('I feel comfortable with mathematics and abstract reasoning.', 30),
('I want to understand how computer systems and networks work.', 40),
('I enjoy building practical applications for users.', 50),
('I am interested in artificial intelligence and machine learning.', 60),
('I can stay patient when debugging difficult technical problems.', 70),
('I want a future role that mixes teamwork, communication, and technical work.', 80);

INSERT INTO major_foundation_requirements (major_id, subject_id, weight)
SELECT m.id, s.id, x.weight
FROM (
    SELECT 'CS' AS major_code, 'IT116IU' AS subject_code, 1.00 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT069IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT013IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT153IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT064IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT067IU' AS subject_code, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'MA001IU' AS subject_code, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT154IU' AS subject_code, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT089IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT017IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT092IU' AS subject_code, 0.75 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT076IU' AS subject_code, 0.85 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT114IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT139IU' AS subject_code, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'IT156IU' AS subject_code, 0.60 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'MA001IU' AS subject_code, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'MA003IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'MA026IU' AS subject_code, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT154IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT135IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT149IU' AS subject_code, 0.85 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT069IU' AS subject_code, 0.70 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT151IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT137IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT136IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT160IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT172IU' AS subject_code, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT157IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT173IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'IT163IU' AS subject_code, 0.85 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT064IU' AS subject_code, 1.00 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT116IU' AS subject_code, 0.85 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT069IU' AS subject_code, 0.85 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT079IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT091IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT017IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT093IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT125IU' AS subject_code, 0.95 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT117IU' AS subject_code, 0.90 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT165IU' AS subject_code, 0.85 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT164IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT094IU' AS subject_code, 0.75 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT144IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT145IU' AS subject_code, 0.80 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'IT056IU' AS subject_code, 0.70 AS weight
) x
JOIN majors m ON m.code = x.major_code
JOIN subjects s ON s.subject_code = x.subject_code;

INSERT INTO interest_major_weights (major_id, interest_id, weight)
SELECT m.id, i.id, x.weight
FROM (
    SELECT 'CS' AS major_code, 'coding' AS interest_name, 1.00 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'data' AS interest_name, 0.55 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'math' AS interest_name, 0.80 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'systems' AS interest_name, 0.75 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'AI' AS interest_name, 0.75 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'application' AS interest_name, 0.65 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'security' AS interest_name, 0.55 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'hardware' AS interest_name, 0.40 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'research' AS interest_name, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'product_design' AS interest_name, 0.35 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'coding' AS interest_name, 0.75 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'data' AS interest_name, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'math' AS interest_name, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'systems' AS interest_name, 0.40 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'AI' AS interest_name, 0.95 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'application' AS interest_name, 0.55 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'security' AS interest_name, 0.30 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'hardware' AS interest_name, 0.20 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'research' AS interest_name, 0.80 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'product_design' AS interest_name, 0.35 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'coding' AS interest_name, 0.70 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'data' AS interest_name, 0.60 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'math' AS interest_name, 0.35 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'systems' AS interest_name, 1.00 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'AI' AS interest_name, 0.40 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'application' AS interest_name, 0.90 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'security' AS interest_name, 0.90 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'hardware' AS interest_name, 0.55 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'research' AS interest_name, 0.35 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'product_design' AS interest_name, 0.70 AS weight
) x
JOIN majors m ON m.code = x.major_code
JOIN interests i ON i.name = x.interest_name;

INSERT INTO question_major_weights (major_id, question_id, weight)
SELECT m.id, q.id, x.weight
FROM (
    SELECT 'CS' AS major_code, 'I enjoy solving programming problems.' AS question_text, 1.00 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I like working with data and finding patterns.' AS question_text, 0.55 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 0.90 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I want to understand how computer systems and networks work.' AS question_text, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I enjoy building practical applications for users.' AS question_text, 0.65 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I am interested in artificial intelligence and machine learning.' AS question_text, 0.70 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I can stay patient when debugging difficult technical problems.' AS question_text, 0.90 AS weight
UNION ALL
    SELECT 'CS' AS major_code, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 0.55 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I enjoy solving programming problems.' AS question_text, 0.70 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I like working with data and finding patterns.' AS question_text, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 0.95 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I want to understand how computer systems and networks work.' AS question_text, 0.35 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I enjoy building practical applications for users.' AS question_text, 0.50 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I am interested in artificial intelligence and machine learning.' AS question_text, 1.00 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I can stay patient when debugging difficult technical problems.' AS question_text, 0.80 AS weight
UNION ALL
    SELECT 'DS' AS major_code, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 0.55 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I enjoy solving programming problems.' AS question_text, 0.65 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I like working with data and finding patterns.' AS question_text, 0.55 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 0.40 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I want to understand how computer systems and networks work.' AS question_text, 1.00 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I enjoy building practical applications for users.' AS question_text, 0.95 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I am interested in artificial intelligence and machine learning.' AS question_text, 0.35 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I can stay patient when debugging difficult technical problems.' AS question_text, 0.75 AS weight
UNION ALL
    SELECT 'IT' AS major_code, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 0.90 AS weight
) x
JOIN majors m ON m.code = x.major_code
JOIN self_assessment_questions q ON q.question_text = x.question_text;

INSERT INTO student_subject_scores (student_id, subject_id, score)
SELECT u.id, s.id, x.score
FROM (
    SELECT 'student1@example.com' AS email, 'MA001IU' AS subject_code, 8.80 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'EN008IU' AS subject_code, 8.20 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'EN007IU' AS subject_code, 8.00 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'IT064IU' AS subject_code, 9.00 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'IT116IU' AS subject_code, 9.10 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'IT153IU' AS subject_code, 8.70 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'PH013IU' AS subject_code, 7.50 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'IT067IU' AS subject_code, 8.30 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'IT099IU' AS subject_code, 8.80 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'IT069IU' AS subject_code, 9.20 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'EN012IU' AS subject_code, 8.00 AS score
UNION ALL
    SELECT 'student1@example.com' AS email, 'EN011IU' AS subject_code, 8.10 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'MA001IU' AS subject_code, 9.00 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'EN008IU' AS subject_code, 7.80 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'EN007IU' AS subject_code, 7.60 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'IT064IU' AS subject_code, 8.20 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'IT116IU' AS subject_code, 8.00 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'IT153IU' AS subject_code, 9.30 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'PH013IU' AS subject_code, 7.00 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'IT067IU' AS subject_code, 7.80 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'IT099IU' AS subject_code, 7.90 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'IT069IU' AS subject_code, 8.40 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'EN012IU' AS subject_code, 7.50 AS score
UNION ALL
    SELECT 'student2@example.com' AS email, 'EN011IU' AS subject_code, 7.60 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'MA001IU' AS subject_code, 7.00 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'EN008IU' AS subject_code, 7.20 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'EN007IU' AS subject_code, 7.00 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'IT064IU' AS subject_code, 8.10 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'IT116IU' AS subject_code, 8.50 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'IT153IU' AS subject_code, 7.80 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'PH013IU' AS subject_code, 6.80 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'IT067IU' AS subject_code, 8.40 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'IT099IU' AS subject_code, 8.20 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'IT069IU' AS subject_code, 8.70 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'EN012IU' AS subject_code, 7.40 AS score
UNION ALL
    SELECT 'student3@example.com' AS email, 'EN011IU' AS subject_code, 7.50 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'MA001IU' AS subject_code, 7.80 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'EN008IU' AS subject_code, 8.00 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'EN007IU' AS subject_code, 8.10 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'IT064IU' AS subject_code, 8.50 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'IT116IU' AS subject_code, 7.60 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'IT153IU' AS subject_code, 7.40 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'PH013IU' AS subject_code, 7.20 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'IT067IU' AS subject_code, 7.10 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'IT099IU' AS subject_code, 7.40 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'IT069IU' AS subject_code, 8.00 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'EN012IU' AS subject_code, 8.30 AS score
UNION ALL
    SELECT 'student4@example.com' AS email, 'EN011IU' AS subject_code, 8.20 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'MA001IU' AS subject_code, 8.10 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'EN008IU' AS subject_code, 7.00 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'EN007IU' AS subject_code, 7.20 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'IT064IU' AS subject_code, 8.70 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'IT116IU' AS subject_code, 8.90 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'IT153IU' AS subject_code, 8.20 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'PH013IU' AS subject_code, 6.90 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'IT067IU' AS subject_code, 8.80 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'IT099IU' AS subject_code, 8.50 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'IT069IU' AS subject_code, 8.60 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'EN012IU' AS subject_code, 7.10 AS score
UNION ALL
    SELECT 'student5@example.com' AS email, 'EN011IU' AS subject_code, 7.00 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'MA001IU' AS subject_code, 9.20 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'EN008IU' AS subject_code, 8.50 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'EN007IU' AS subject_code, 8.60 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'IT064IU' AS subject_code, 8.90 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'IT116IU' AS subject_code, 8.40 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'IT153IU' AS subject_code, 9.10 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'PH013IU' AS subject_code, 7.80 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'IT067IU' AS subject_code, 7.00 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'IT099IU' AS subject_code, 7.20 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'IT069IU' AS subject_code, 8.10 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'EN012IU' AS subject_code, 8.30 AS score
UNION ALL
    SELECT 'student6@example.com' AS email, 'EN011IU' AS subject_code, 8.40 AS score
) x
JOIN users u ON u.email = x.email
JOIN subjects s ON s.subject_code = x.subject_code;

INSERT INTO user_interests (student_id, interest_id, rating)
SELECT u.id, i.id, x.rating
FROM (
    SELECT 'student1@example.com' AS email, 'coding' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'data' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'math' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'systems' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'AI' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'application' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'security' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'hardware' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'research' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'product_design' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'coding' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'data' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'math' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'systems' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'AI' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'application' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'security' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'hardware' AS interest_name, 1 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'research' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'product_design' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'coding' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'data' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'math' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'systems' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'AI' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'application' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'security' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'hardware' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'research' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'product_design' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'coding' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'data' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'math' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'systems' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'AI' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'application' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'security' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'hardware' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'research' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'product_design' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'coding' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'data' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'math' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'systems' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'AI' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'application' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'security' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'hardware' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'research' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'product_design' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'coding' AS interest_name, 4 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'data' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'math' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'systems' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'AI' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'application' AS interest_name, 3 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'security' AS interest_name, 2 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'hardware' AS interest_name, 1 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'research' AS interest_name, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'product_design' AS interest_name, 2 AS rating
) x
JOIN users u ON u.email = x.email
JOIN interests i ON i.name = x.interest_name;

INSERT INTO self_assessment_answers (student_id, question_id, rating)
SELECT u.id, q.id, x.rating
FROM (
    SELECT 'student1@example.com' AS email, 'I enjoy solving programming problems.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I like working with data and finding patterns.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I want to understand how computer systems and networks work.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I enjoy building practical applications for users.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I am interested in artificial intelligence and machine learning.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I can stay patient when debugging difficult technical problems.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student1@example.com' AS email, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I enjoy solving programming problems.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I like working with data and finding patterns.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I want to understand how computer systems and networks work.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I enjoy building practical applications for users.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I am interested in artificial intelligence and machine learning.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I can stay patient when debugging difficult technical problems.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student2@example.com' AS email, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I enjoy solving programming problems.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I like working with data and finding patterns.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I want to understand how computer systems and networks work.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I enjoy building practical applications for users.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I am interested in artificial intelligence and machine learning.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I can stay patient when debugging difficult technical problems.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student3@example.com' AS email, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I enjoy solving programming problems.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I like working with data and finding patterns.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I want to understand how computer systems and networks work.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I enjoy building practical applications for users.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I am interested in artificial intelligence and machine learning.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I can stay patient when debugging difficult technical problems.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student4@example.com' AS email, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I enjoy solving programming problems.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I like working with data and finding patterns.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I want to understand how computer systems and networks work.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I enjoy building practical applications for users.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I am interested in artificial intelligence and machine learning.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I can stay patient when debugging difficult technical problems.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student5@example.com' AS email, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I enjoy solving programming problems.' AS question_text, 4 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I like working with data and finding patterns.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I feel comfortable with mathematics and abstract reasoning.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I want to understand how computer systems and networks work.' AS question_text, 2 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I enjoy building practical applications for users.' AS question_text, 3 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I am interested in artificial intelligence and machine learning.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I can stay patient when debugging difficult technical problems.' AS question_text, 5 AS rating
UNION ALL
    SELECT 'student6@example.com' AS email, 'I want a future role that mixes teamwork, communication, and technical work.' AS question_text, 3 AS rating
) x
JOIN users u ON u.email = x.email
JOIN self_assessment_questions q ON q.question_text = x.question_text;

INSERT INTO recommendation_runs (student_id, review_status, created_at) VALUES
((SELECT id FROM users WHERE email = 'student1@example.com'), 'Reviewed', '2026-04-01 09:15:00'),
((SELECT id FROM users WHERE email = 'student2@example.com'), 'Pending', '2026-04-01 10:00:00'),
((SELECT id FROM users WHERE email = 'student3@example.com'), 'Advised', '2026-04-01 11:20:00'),
((SELECT id FROM users WHERE email = 'student4@example.com'), 'Pending', '2026-04-02 08:30:00'),
((SELECT id FROM users WHERE email = 'student5@example.com'), 'Reviewed', '2026-04-02 14:10:00'),
((SELECT id FROM users WHERE email = 'student6@example.com'), 'Advised', '2026-04-03 16:45:00');

INSERT INTO recommendation_results (run_id, major_id, academic_score, interest_score, self_assessment_score, total_score, level, explanation, weakness_suggestion, ranking_position) VALUES
(1, (SELECT id FROM majors WHERE code = 'CS'), 87.00, 74.00, 80.00, 82.00, 'High', 'Strong programming, logic, and software-oriented academic profile with consistently high first-year coding results.', 'Keep strengthening systems breadth and collaborative project delivery.', 1),
(1, (SELECT id FROM majors WHERE code = 'DS'), 79.00, 84.00, 78.00, 80.00, 'Medium', 'Strong enough mathematical and AI interest profile to succeed in data-oriented coursework.', 'Build more statistics and data-project exposure.', 2),
(1, (SELECT id FROM majors WHERE code = 'IT'), 73.00, 68.00, 72.00, 71.00, 'Medium', 'Can work well in practical IT roles but the current profile is more software-centric.', 'Gain more networking, security, and infrastructure practice.', 3),
(2, (SELECT id FROM majors WHERE code = 'DS'), 90.00, 92.00, 89.00, 90.00, 'High', 'Excellent mathematics, data, and AI profile with very strong abstract reasoning.', 'Continue building software engineering depth to complement analytics strength.', 1),
(2, (SELECT id FROM majors WHERE code = 'CS'), 78.00, 67.00, 73.00, 74.00, 'Medium', 'Good logical foundation, but software-first motivation is less dominant than data motivation.', 'Practise larger coding projects and algorithm implementation.', 2),
(2, (SELECT id FROM majors WHERE code = 'IT'), 65.00, 55.00, 60.00, 61.00, 'Low', 'Current profile is less aligned with infrastructure and application-delivery priorities.', 'Develop systems and networking interest through practical labs.', 3),
(3, (SELECT id FROM majors WHERE code = 'IT'), 84.00, 89.00, 86.00, 86.00, 'High', 'Strong systems, security, and practical computing interests match IT-oriented pathways.', 'Document projects clearly and strengthen enterprise application exposure.', 1),
(3, (SELECT id FROM majors WHERE code = 'CS'), 76.00, 70.00, 74.00, 74.00, 'Medium', 'Programming and problem-solving are solid, but the profile is more systems-practical than theory-heavy.', 'Build more algorithmic and architecture depth.', 2),
(3, (SELECT id FROM majors WHERE code = 'DS'), 60.00, 48.00, 55.00, 55.00, 'Low', 'Data and mathematical motivation are not currently the strongest signal.', 'Improve statistics confidence and complete one data-analysis project.', 3),
(4, (SELECT id FROM majors WHERE code = 'IT'), 80.00, 88.00, 84.00, 84.00, 'High', 'Application-building, teamwork, and practical systems orientation align well with IT.', 'Add networking and security lab experience for an even stronger fit.', 1),
(4, (SELECT id FROM majors WHERE code = 'CS'), 70.00, 64.00, 66.00, 67.00, 'Medium', 'Can still succeed in CS, especially on the software side.', 'Strengthen algorithms and logic-heavy coursework.', 2),
(4, (SELECT id FROM majors WHERE code = 'DS'), 62.00, 58.00, 55.00, 58.00, 'Low', 'Current interests are less math- and analytics-driven.', 'Build statistical reasoning before pursuing advanced data courses.', 3),
(5, (SELECT id FROM majors WHERE code = 'IT'), 86.00, 90.00, 82.00, 86.00, 'High', 'Excellent systems and security interest profile with strong technical execution in first-year subjects.', 'Expand software architecture and cloud portfolio work.', 1),
(5, (SELECT id FROM majors WHERE code = 'CS'), 79.00, 68.00, 74.00, 75.00, 'Medium', 'Good programming strength supports CS success, especially in systems-oriented software.', 'Add more theory-heavy and algorithmic practice.', 2),
(5, (SELECT id FROM majors WHERE code = 'DS'), 58.00, 50.00, 54.00, 54.00, 'Low', 'Current profile is less aligned with a math-first data path.', 'Strengthen statistics and analytics fundamentals if you want DS options open.', 3),
(6, (SELECT id FROM majors WHERE code = 'DS'), 91.00, 95.00, 92.00, 93.00, 'High', 'Outstanding data, math, and AI motivation with excellent first-year results.', 'Add deployment and software engineering practice so models can be shipped into products.', 1),
(6, (SELECT id FROM majors WHERE code = 'CS'), 80.00, 72.00, 79.00, 78.00, 'Medium', 'Strong enough coding and logic profile to succeed in CS.', 'Practise larger systems and architecture tasks.', 2),
(6, (SELECT id FROM majors WHERE code = 'IT'), 66.00, 57.00, 61.00, 62.00, 'Low', 'Profile currently signals less interest in systems operations and enterprise delivery.', 'Explore cloud and infrastructure labs before choosing an IT-heavy path.', 3);

INSERT INTO advisory_notes (run_id, advisor_id, note_text) VALUES
(1, (SELECT id FROM users WHERE email = 'advisor1@example.com'), 'Student shows a clear software-development trajectory. Recommend joining a programming club and building one portfolio project this semester.'),
(3, (SELECT id FROM users WHERE email = 'advisor2@example.com'), 'Student is currently a strong fit for IT. Suggest a path combining networks, security, and cloud administration.'),
(6, (SELECT id FROM users WHERE email = 'advisor1@example.com'), 'Student has excellent DS potential. Encourage participation in a small ML or data-visualisation research project.');

INSERT INTO major_learning_paths (major_id, year_label, sort_order, content) VALUES
((SELECT id FROM majors WHERE code = 'CS'), 'Year 1 - Semester 1', 10, 'Start with MA001IU Calculus 1, EN008IU Academic English 1 Listening, EN007IU Academic English 1 Writing, IT064IU Introduction to Computing, and IT116IU C/C++ Programming. The goal is to build coding fluency, analytical thinking, and academic communication.'),
((SELECT id FROM majors WHERE code = 'CS'), 'Year 1 - Semester 2', 20, 'Continue with IT153IU Discrete Mathematics, PH013IU Physics 1, IT067IU Digital Logic Design, IT099IU Digital Logic Design Laboratory, IT069IU Object-Oriented Programming, EN012IU Academic English 2 Speaking, and EN011IU Academic English 2 Writing. Focus on abstraction, OOP, and foundational digital systems.'),
((SELECT id FROM majors WHERE code = 'CS'), 'Year 2', 30, 'Prioritise IT154IU Linear Algebra, MA003IU Calculus 2, IT013IU Algorithms and Data Structures, IT079IU Principle of Database Management, IT089IU Computer Architecture, IT017IU Operating System, and IT091IU Computer Networks. This stage builds theory and systems depth required for a CS pathway.'),
((SELECT id FROM majors WHERE code = 'CS'), 'Year 3', 40, 'Core CS growth should centre on IT076IU Software Engineering, IT090IU Object-Oriented Analysis and Design, IT092IU Principles of Programming Languages, IT093IU Web Application Development, IT139IU Scalable and Distributed Computing, and IT044IU Human Computer Interaction. Build team projects and a Git-based portfolio.'),
((SELECT id FROM majors WHERE code = 'CS'), 'Year 4', 50, 'Choose advanced software electives such as IT114IU Software Architecture, IT166IU Software Quality Verification and Validation, IT156IU DevOps, IT164IU Cloud Computing, IT024IU Computer Graphics, IT133IU Mobile Application Development, or IT167IU Game Application Development. Use IT056IU IT Project Management to improve delivery skills.'),
((SELECT id FROM majors WHERE code = 'CS'), 'Internship and Thesis', 60, 'Complete IT082IU Internship, IT083IU Special Study of the Field, IT168IU Special Study of the Field 2, and IT058IU Thesis. A strong CS graduation profile should include at least one substantial software or systems project with clear architecture and testing evidence.'),
((SELECT id FROM majors WHERE code = 'DS'), 'Year 1 - Semester 1', 10, 'Use MA001IU Calculus 1, IT135IU Introduction to Data Science, IT149IU Fundamentals of Programming, EN008IU Academic English 1 Listening, and EN007IU Academic English 1 Writing to build the quantitative and communication baseline for data work.'),
((SELECT id FROM majors WHERE code = 'DS'), 'Year 1 - Semester 2', 20, 'Strengthen IT069IU Object-Oriented Programming, MA026IU Probability Statistics and Random Process, IT154IU Linear Algebra, EN012IU Academic English 2 Speaking, and EN011IU Academic English 2 Writing. The priority is mathematical maturity and clean programming practice.'),
((SELECT id FROM majors WHERE code = 'DS'), 'Year 2', 30, 'Move into IT151IU Statistical Method, IT013IU Data Structures and Algorithms, IT097IU Principles of Database Management, IT140IU Fundamental Concepts of Data Security, IT137IU Data Analysis, and IT136IU Regression Analysis. This stage forms the bridge from mathematics into practical analytics.'),
((SELECT id FROM majors WHERE code = 'DS'), 'Year 3', 40, 'Deepen the pipeline with IT138IU Data Science and Visualization, IT160IU Data Mining, IT159IU Artificial Intelligence, IT172IU Machine Learning, IT169IU Time Series Analysis, and IT163IU Optimization and Applications. Build notebook-based projects and dashboards.'),
((SELECT id FROM majors WHERE code = 'DS'), 'Year 4', 50, 'Take advanced electives such as IT157IU Deep Learning, IT173IU Big Data Analytics, IT130IU Digital Image Processing, IT145IU Decision Support Systems, and IT144IU Business Process Analysis. Focus on model evaluation, storytelling with data, and business impact.'),
((SELECT id FROM majors WHERE code = 'DS'), 'Internship and Thesis', 60, 'Finish with IT082IU Internship, IT083IU Special Study of the Field, IT168IU Special Study of the Field 2, and IT058IU Thesis. A strong DS graduation profile should show data preparation, modelling, interpretation, and communication in one coherent portfolio.'),
((SELECT id FROM majors WHERE code = 'IT'), 'Year 1 - Semester 1', 10, 'Build practical foundations with MA001IU Calculus 1, EN008IU Academic English 1 Listening, EN007IU Academic English 1 Writing, IT064IU Introduction to Computing, and IT116IU C/C++ Programming. The first goal is broad technical literacy and communication.'),
((SELECT id FROM majors WHERE code = 'IT'), 'Year 1 - Semester 2', 20, 'Continue with IT153IU Discrete Mathematics, PH013IU Physics 1, IT067IU Digital Logic Design, IT099IU Digital Logic Design Laboratory, IT069IU Object-Oriented Programming, EN012IU Academic English 2 Speaking, and EN011IU Academic English 2 Writing. Keep balancing theory with hands-on practice.'),
((SELECT id FROM majors WHERE code = 'IT'), 'Year 2', 30, 'Concentrate on IT079IU Principle of Database Management, IT091IU Computer Networks, IT017IU Operating System, IT093IU Web Application Development, IT094IU Information System Management, and IT125IU System and Network Administration. This stage builds the operational mindset that defines IT work.'),
((SELECT id FROM majors WHERE code = 'IT'), 'Year 3', 40, 'Expand into IT117IU System and Network Security, IT165IU Security Technology and Implementation, IT164IU Cloud Computing, IT144IU Business Process Analysis, IT145IU Decision Support Systems, and IT056IU IT Project Management. Focus on deployable solutions and enterprise scenarios.'),
((SELECT id FROM majors WHERE code = 'IT'), 'Year 4', 50, 'Choose breadth electives such as IT134IU Internet of Things, IT150IU Blockchain, IT156IU DevOps, IT133IU Mobile Application Development, IT166IU Software Quality Verification and Validation, and IT120IU Entrepreneurship. Build one portfolio case that shows an end-to-end IT solution from requirement to deployment.'),
((SELECT id FROM majors WHERE code = 'IT'), 'Internship and Thesis', 60, 'Complete IT082IU Internship, IT083IU Special Study of the Field, IT168IU Special Study of the Field 2, and IT058IU Thesis. A strong IT graduation profile should demonstrate infrastructure awareness, application delivery, security thinking, and stakeholder communication.');
