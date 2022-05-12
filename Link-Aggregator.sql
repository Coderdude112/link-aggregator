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
CREATE TABLE links( -- All ratings
  id INT IDENTITY(1,1),
  link VARCHAR(300),
  title VARCHAR(100),
  filename VARCHAR(300),
  PRIMARY KEY(id)
);

INSERT INTO links VALUES('www.lingscars.com/', 'The UK''s craziest car leasing website!', 'LingsCars');
INSERT INTO links VALUES('www.tesla.com/', 'Electric Cars, Solar & Clean Energy', 'Tesla');
INSERT INTO links VALUES('github.com/', 'GitHub', 'GitHub');

-- ------------------ --
-- Print out the info --
-- ------------------ --

SELECT * FROM links;

--DROP TABLE links;