import { Request, Response } from "express";
import * as db from "../db/queries.js";

// TODO: need error handling
/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
async function postCollection(req, res) {
  const id = Number(req.params.id);

  /** @type {import("../types/Movie.js").Movie} */
  const movie = { id: id, name: "test" };

  await db.insertIntoMovies(movie);

  movie.genreIds.forEach((genreId) => db.insertToMovieGenre(movie.id, genreId));

  res.redirect("/collection");
}

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
async function getCollection(req, res) {
  const collecitonList = await db.queryMovies();
  const genres = await db.queryGenres();

  res.render("movies", {
    movies: collecitonList.rows,
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
  const id = Number(req.params.id);
  db.deleteMovieByID(id);
  res.redirect("/collection");
}

export { getCollection, postCollection, postDeleteFromCollection };
