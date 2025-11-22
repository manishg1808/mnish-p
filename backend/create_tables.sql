-- Use mnishdb database
USE mnishdb;

-- Drop existing tables if needed (uncomment if you want to reset)
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS team;
-- DROP TABLE IF EXISTS skills;

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create team table
CREATE TABLE IF NOT EXISTS team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  bio TEXT,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  tech TEXT,
  image VARCHAR(100) NOT NULL,
  link VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- Insert sample skills data
INSERT INTO skills (name, level) VALUES
('HTML & CSS', 90),
('JavaScript', 85),
('Tailwind CSS', 88),
('React.js', 80),
('Node.js', 70),
('MongoDB', 65),
('MySQL', 75),
('C/C++', 70),
('Git & GitHub', 75),
('MERN Stack', 75);

-- Insert sample projects data
INSERT INTO projects (title, description, tech, image, link) VALUES
('Food - Online Food Ordering System', 'Developed a responsive food ordering system using HTML and CSS to provide a user-friendly interface for browsing and selecting food items.', '["HTML", "CSS", "Responsive Design"]', 'placeholder1', 'https://github.com/dashboard'),
('Password Generator', 'A simple password generator built using HTML, CSS, and JavaScript.', '["HTML", "CSS", "JavaScript"]', 'placeholder2', 'https://github.com/dashboard'),
('MERN Stack Projects', 'Multiple web applications developed using MERN stack (MongoDB, Express.js, React.js, Node.js).', '["React.js", "Node.js", "MongoDB", "Express.js"]', 'placeholder3', 'https://github.com/dashboard');

