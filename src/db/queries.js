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
 * @param {import("../types/User.js").User} user
 * @returns {void}
 */
async function insertIntoUsers(user) {
  const query = `
    INSERT INTO users (
      name,
      username,
      password
    ) 
    VALUES ($1, $2, $3)
    ON CONFLICT (id) DO NOTHING
  `;
  await runQueryParam(query, [user.name, user.username, user.password]);
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

/**
 * @param {import("../types/Movie.js").Movie} movie
 * @param {number} userId
 */
async function insertIntoCollection(movie, userId) {
  const movieResult = await queryMovieByID(movie.id);

  if (movieResult.rows.length < 1) {
    await insertIntoMovies(movie);
  }

  runQueryParam(
    "INSERT INTO collection (user_id, movie_id) VALUES ($1, $2) ON CONFLICT (user_id, movie_id) DO NOTHING",
    [userId, movie.id],
  );
}

/**
 * @param {number} userId
 */
async function getUserCollection(userId) {
  return await runQueryParam(
    "SELECT movie_id FROM collection where user_id = $1",
    [userId],
  );
}

export {
  deleteMovieByID,
  insertToMovieGenre,
  queryGenres,
  queryMovieByID,
  queryMovies,
  insertIntoMovies,
  insertIntoUsers,
  insertIntoCollection,
  getUserCollection,
};
