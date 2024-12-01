import { pool } from "./pool.ts";
import { Movie } from "../types/Movie.ts";

async function runQueryParam(query: string, params: any[] = []) {
  const client = await pool.connect();
  let result;
  try {
    result = await client.query(query, params);
  } finally {
    client.release();
  }
  return result;
}

async function runQuery(query: string) {
  const client = await pool.connect();
  let result;
  try {
    result = await client.query(query);
  } finally {
    client.release();
  }
  return result;
}

async function insertIntoMovies(movie: Movie) {
  const movieQuery = await queryMovieByID(movie.id);

  const query = `
    INSERT INTO movies (
      id, 
      original_title, 
      backdrop_path, 
      original_language, 
      overview, 
      popularity, 
      poster_path, 
      release_date, 
      title, 
      vote_average
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (id) DO NOTHING
  `;
  await runQueryParam(query, [
    movie.id,
    movie.originalTitle,
    movie.backdropPath,
    movie.originalLanguage,
    movie.overview,
    movie.popularity,
    movie.posterPath,
    movie.releaseDate,
    movie.title,
    movie.voteAverage,
  ]);
}

async function queryMovies() {
  const movies = await runQuery("SELECT * FROM movies");
  return movies;
}

async function queryGenres() {
  const movies = await runQuery("SELECT * FROM genres");
  return movies;
}

async function queryMovieByID(id: number) {
  const movie = await runQueryParam("SELECT * FROM movies WHERE id = ($1)", [
    id,
  ]);
  return movie;
}

async function deleteMovieByID(id: number) {
  const movie = await runQueryParam("DELETE FROM movies WHERE id = ($1)", [id]);
  return movie;
}

async function insertToMovieGenre(movieId: number, genreId: number) {
  runQueryParam(
    "INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2)",
    [movieId, genreId],
  );
}

export {
  deleteMovieByID,
  insertIntoMovies,
  insertToMovieGenre,
  queryGenres,
  queryMovieByID,
  queryMovies,
};
