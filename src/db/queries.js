import { pool } from "./pool.js";

/**
 * @param {string} query
 * @param {any} params
 * @returns {Promise<any>}
 */
async function runQueryParam(query, params = []) {
  const client = await pool.connect();
  let result;
  try {
    result = await client.query(query, params);
  } finally {
    client.release();
  }
  return result;
}

/**
 * @param {string} query
 * @returns {Promise<any>}
 */
async function runQuery(query) {
  const client = await pool.connect();
  let result;
  try {
    result = await client.query(query);
  } finally {
    client.release();
  }
  return result;
}

/**
 * @param {import("../types/users.js").User} user
 * @returns {void}
 */
async function insertIntoUsers(user) {
  const query = `
    INSERT INTO users (
      id, 
      name,
      username
    ) 
    VALUES ($1, $2, $3)
    ON CONFLICT (id) DO NOTHING
  `;
  await runQueryParam(query, [user.id, user.username, user.name]);
}

async function queryMovies() {
  const movies = await runQuery("SELECT * FROM movies");
  return movies;
}

async function queryGenres() {
  const movies = await runQuery("SELECT * FROM genres");
  return movies;
}

/**
 * @param {number} id
 * @returns {<Promise<any>}
 */
async function queryMovieByID(id) {
  const movie = await runQueryParam("SELECT * FROM movies WHERE id = ($1)", [
    id,
  ]);
  return movie;
}

/**
 * @param {number} id
 * @returns {<Promise<any>}
 */
async function deleteMovieByID(id) {
  const movie = await runQueryParam("DELETE FROM movies WHERE id = ($1)", [id]);
  return movie;
}

/**
 * @param {number} movieId
 * @param {number} genreId
 * @returns {<Promise<void>}
 */
async function insertToMovieGenre(movieId, genreId) {
  runQueryParam(
    "INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2)",
    [movieId, genreId],
  );
}

/**
 * @param {import("../types/Movie.js").Movie} movie
 * @returns {Promise<void>}
 */
async function insertIntoMovies(movie) {
  runQueryParam("INSERT INTO movies (id, name) VALUES ($1, $2)", [
    movie.id,
    movie.name,
  ]);
}

export {
  deleteMovieByID,
  insertToMovieGenre,
  queryGenres,
  queryMovieByID,
  queryMovies,
  insertIntoMovies,
};
