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
  websiteName VARCHAR(104),
  pageTitle VARCHAR(104),
  imageFilename VARCHAR(256),
  category INT,
  PRIMARY KEY(id),
  FOREIGN KEY(category) REFERENCES categories(id),
);

-- ----------------------- --
-- Insert data for testing --
-- ----------------------- --

INSERT INTO categories VALUES('General', 'FF6666', 'ic:baseline-inbox');
INSERT INTO categories VALUES('Security', '66FF66', 'ic:baseline-lock');
INSERT INTO categories VALUES('Privacy', 'FF99FF', 'ic:baseline-remove-red-eye');

INSERT INTO links VALUES('www.tesla.com', 'Tesla!', 'Electric Cars, Solar & Clean Energy', '', 1);
INSERT INTO links VALUES('www.freecodecamp.org/news/tag/cybersecurity', 'freeCodeCamp', '#CYBERSECURITY', '', 2);
INSERT INTO links VALUES('www.freecodecamp.org/news/tag/privacy', 'freeCodeCamp', '#PRIVACY', '', 3);

-- ------------------ --
-- Print out the info --
-- ------------------ --

SELECT * FROM categories;
SELECT * FROM links;
