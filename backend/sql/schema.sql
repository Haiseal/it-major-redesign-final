DROP DATABASE IF EXISTS it_major_recommendation;
CREATE DATABASE it_major_recommendation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE it_major_recommendation;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('student', 'advisor', 'department_admin', 'system_admin') NOT NULL,
    password_hash VARCHAR(255) NULL,
    student_code VARCHAR(30) NULL,
    department_name VARCHAR(100) NULL,
    intake_year INT NULL,
    study_year VARCHAR(30) NULL,
    account_status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_users_role (role),
    INDEX idx_users_email (email)
);

CREATE TABLE subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    credits_total DECIMAL(4,1) NULL,
    credits_lecture DECIMAL(4,1) NULL,
    credits_lab DECIMAL(4,1) NULL,
    study_year INT NULL,
    study_semester INT NULL,
    program_track VARCHAR(50) NULL,
    is_year1_input BOOLEAN NOT NULL DEFAULT FALSE,
    is_used_in_algorithm BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 999,
    INDEX idx_subjects_year_input (is_year1_input, display_order),
    INDEX idx_subjects_track (program_track),
    INDEX idx_subjects_category (category)
);

CREATE TABLE majors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE interests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    display_order INT NOT NULL DEFAULT 999
);

CREATE TABLE self_assessment_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_text VARCHAR(255) NOT NULL UNIQUE,
    display_order INT NOT NULL DEFAULT 999
);

CREATE TABLE major_foundation_requirements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    major_id INT NOT NULL,
    subject_id INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    UNIQUE KEY uk_major_subject (major_id, subject_id),
    FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE question_major_weights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    major_id INT NOT NULL,
    question_id INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    UNIQUE KEY uk_major_question (major_id, question_id),
    FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES self_assessment_questions(id) ON DELETE CASCADE
);

CREATE TABLE interest_major_weights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    major_id INT NOT NULL,
    interest_id INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    UNIQUE KEY uk_major_interest (major_id, interest_id),
    FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

CREATE TABLE student_subject_scores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    score DECIMAL(4,2) NOT NULL,
    UNIQUE KEY uk_student_subject (student_id, subject_id),
    CONSTRAINT chk_subject_score CHECK (score BETWEEN 0 AND 10),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE user_interests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    interest_id INT NOT NULL,
    rating INT NOT NULL,
    UNIQUE KEY uk_student_interest (student_id, interest_id),
    CONSTRAINT chk_interest_rating CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

CREATE TABLE self_assessment_answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    question_id INT NOT NULL,
    rating INT NOT NULL,
    UNIQUE KEY uk_student_question (student_id, question_id),
    CONSTRAINT chk_self_rating CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES self_assessment_questions(id) ON DELETE CASCADE
);

CREATE TABLE recommendation_runs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    review_status ENUM('Pending', 'Reviewed', 'Advised') NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_runs_student (student_id, created_at)
);

CREATE TABLE recommendation_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    run_id INT NOT NULL,
    major_id INT NOT NULL,
    academic_score DECIMAL(6,2) NOT NULL,
    interest_score DECIMAL(6,2) NOT NULL,
    self_assessment_score DECIMAL(6,2) NOT NULL,
    total_score DECIMAL(6,2) NOT NULL,
    level ENUM('High', 'Medium', 'Low') NOT NULL,
    explanation TEXT,
    weakness_suggestion TEXT,
    ranking_position INT NOT NULL,
    FOREIGN KEY (run_id) REFERENCES recommendation_runs(id) ON DELETE CASCADE,
    FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE,
    UNIQUE KEY uk_run_rank (run_id, ranking_position)
);

CREATE TABLE advisory_notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    run_id INT NOT NULL,
    advisor_id INT NOT NULL,
    note_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (run_id) REFERENCES recommendation_runs(id) ON DELETE CASCADE,
    FOREIGN KEY (advisor_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE major_learning_paths (
    id INT PRIMARY KEY AUTO_INCREMENT,
    major_id INT NOT NULL,
    year_label VARCHAR(30) NOT NULL,
    sort_order INT NOT NULL DEFAULT 999,
    content TEXT NOT NULL,
    FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE,
    UNIQUE KEY uk_major_path_stage (major_id, year_label)
);
