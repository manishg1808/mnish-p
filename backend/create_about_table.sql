-- Create about table for portfolio database
-- Run this in phpMyAdmin if table doesn't auto-create
-- Go to: http://localhost/phpmyadmin/index.php?route=/database/structure&db=mnishdb
-- Click on "SQL" tab and paste this query

USE mnishdb;

-- Drop table if exists (optional - only if you want to recreate)
-- DROP TABLE IF EXISTS about;

CREATE TABLE IF NOT EXISTS about (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sub_heading VARCHAR(500) DEFAULT NULL,
  introduction TEXT DEFAULT NULL,
  resume LONGTEXT DEFAULT NULL,
  resume_filename VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify table was created
SELECT 'Table created successfully!' AS status;
SELECT COUNT(*) AS table_exists FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'mnishdb' AND TABLE_NAME = 'about';

