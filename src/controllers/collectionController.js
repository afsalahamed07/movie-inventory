import { Request, Response } from "express";
import * as db from "../db/queries.js";
import { fetchMovie } from "../util/tmdb/movieList.js";

// TODO: need error handling
/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
async function postCollection(req, res) {
  const id = Number(req.params.id);
  const name = req.body.title;

  /** @type {import("../types/Movie.js").Movie} */
  const movie = { id: id, name: name };

  await db.insertIntoCollection(movie, req.user.id);

  res.redirect("/collection");
}

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
async function getCollection(req, res) {
  const collecitonList = await db.getUserCollection(req.user.id);
  const genres = await db.queryGenres();

  const movieList = await Promise.all(
    collecitonList.rows.map(async ({ movie_id }) => {
      const movie = await fetchMovie(movie_id);
      return movie;
    }),
  );

  res.render("movies", {
    movies: movieList,
    to: "delete",
    genres: genres.rows,
    btnMsg: "Delete Collection",
    displayGenre: { link: "/trening", name: "Trening" },
  });
}

// TODO: need error handling
/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
async function postDeleteFromCollection(req, res) {
  const movieId = Number(req.params.id);
  db.deleteMovieFromCollection(req.user.id, movieId);
  res.redirect("/collection");
}

export { getCollection, postCollection, postDeleteFromCollection };
