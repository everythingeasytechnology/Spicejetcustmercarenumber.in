-- cPanel/phpMyAdmin: select the database created in cPanel first,
-- then import this file. A domain name is not a valid cPanel database name.

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO admins (username, password) VALUES
('admin', '$2y$10$j0kEurSa5Vdxw7CpB07cU.AqjZBj3PJZbtsxTCl7vEkOnIOEg6ghK')
ON DUPLICATE KEY UPDATE username = username;

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(120) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  job_role VARCHAR(120) NOT NULL,
  location VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  category VARCHAR(150) NOT NULL,
  reference_id VARCHAR(100) DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  id TINYINT PRIMARY KEY,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(150) NOT NULL,
  address TEXT NOT NULL
);

INSERT INTO site_settings (id, phone, email, address) VALUES
(1, '+91 70444 87792', 'support@spicejets.in', 'Level 1, Tower C, Global Business Park Mehrauli - Gurgaon Road, Gurugram, Haryana')
ON DUPLICATE KEY UPDATE id = id;
