-- Switch to the movie_inventory database
\c inventory_odin;

-- Drop the existing "Movies" table if it exists
DROP TABLE IF EXISTS movies CASCADE;

-- Drop the "Collection" table if it exists
DROP TABLE IF EXISTS collection CASCADE;

-- Drop the "Users" table if it exists
DROP TABLE IF EXISTS users CASCADE;

-- Creating the "user" table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(250) NOT NULL
);

-- Creating the "movies" table
CREATE TABLE movies (id INT PRIMARY KEY, name VARCHAR(200) NOT NULL);

-- Creating the "collection" table to represent the relationship
CREATE TABLE collection (
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES Movies (id) ON DELETE CASCADE
);
