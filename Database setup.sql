-- ----------------------------- --
-- Setup the database and tables --
-- ----------------------------- --

-- DB
USE master;

IF DB_ID('linkaggregator') IS NOT NULL -- If the DB exists
  DROP DATABASE linkaggregator;

CREATE DATABASE linkaggregator;
  GO -- Prevents errors about the database not existing and about tables already existing
  USE linkaggregator;

-- Tables
CREATE TABLE categories( -- All categories
  id INT IDENTITY(1,1),
  name VARCHAR(104),
  color VARCHAR(6),
  icon VARCHAR(32),
  PRIMARY KEY(id)
);

CREATE TABLE links( -- All ratings
  id INT IDENTITY(1,1),
  link VARCHAR(512),
  website_name VARCHAR(104)
  title VARCHAR(104),
  image_filename VARCHAR(256),
  category INT,
  PRIMARY KEY(id),
  FOREIGN KEY(category) REFERENCES categories(id),
);

-- ----------------------- --
-- Insert data for testing --
-- ----------------------- --

INSERT INTO categories VALUES('Homepage', 'FF6666', 'ic:baseline-10k');
INSERT INTO categories VALUES('Creative', '66FF66', 'ic:twotone-vpn-lock');
INSERT INTO categories VALUES('Go Outside', 'FF99FF', 'ic:twotone-wb-sunny');

INSERT INTO links VALUES('www.lingscars.com/', 'The UK''s craziest car leasing website!', 'LingsCars', 1);
INSERT INTO links VALUES('www.tesla.com/', 'Electric Cars, Solar & Clean Energy', 'Tesla', 2);
INSERT INTO links VALUES('github.com/', 'GitHub', 'GitHub', 3);

-- ------------------ --
-- Print out the info --
-- ------------------ --

SELECT * FROM categories;
SELECT * FROM links;
