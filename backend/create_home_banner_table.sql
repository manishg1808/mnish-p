-- Create home_banner table for mnishdb database
USE mnishdb;

-- Drop table if exists (optional - uncomment if you want to reset)
-- DROP TABLE IF EXISTS home_banner;

-- Create home_banner table
CREATE TABLE IF NOT EXISTS home_banner (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  subtitle VARCHAR(500),
  media LONGTEXT,
  media_type VARCHAR(20) DEFAULT 'image',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

