-- Simple SQL to create about table
-- Copy this entire file content and paste in phpMyAdmin SQL tab

-- Step 1: Select the database
USE mnishdb;

-- Step 2: Create the about table
CREATE TABLE IF NOT EXISTS about (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) DEFAULT NULL,
  title VARCHAR(200) DEFAULT NULL,
  sub_heading VARCHAR(500) DEFAULT NULL,
  introduction TEXT DEFAULT NULL,
  birthday VARCHAR(50) DEFAULT NULL,
  website VARCHAR(500) DEFAULT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  age VARCHAR(10) DEFAULT NULL,
  degree VARCHAR(200) DEFAULT NULL,
  email VARCHAR(200) DEFAULT NULL,
  freelance VARCHAR(100) DEFAULT NULL,
  resume LONGTEXT DEFAULT NULL,
  resume_filename VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 3: Verify table was created
SHOW TABLES LIKE 'about';

