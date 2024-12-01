#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY,
  original_title VARCHAR,
  backdrop_path VARCHAR, original_language VARCHAR(10),
  overview TEXT,
  popularity DOUBLE PRECISION,
  poster_path VARCHAR,
  release_date DATE,
  title VARCHAR,
  vote_average DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS movie_genre (
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_movie (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  PRIMARY KEY (movie_id, user_id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: "afsalahamed",
    database: "inventory_odin",
    host: "localhost",
    port: 5432,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
