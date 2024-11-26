// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express";
import { castToMovie, fetchMovie } from "../util/tmdb/movieList.ts";
import * as db from "../db/queries.ts";

// TODO: need error handling
async function postCollection(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const movieDet = await fetchMovie(id);
  const movie = castToMovie(movieDet);

  console.log(movie);

  await db.insertIntoMovies(movie);

  movie.genre_ids.forEach((genreId) =>
    db.insertToMovieGenre(movie.id, genreId)
  );

  res.redirect("/collection");
}

async function getCollection(req: Request, res: Response) {
  const collecitonList = await db.queryMovies();
  const genres = await db.queryGenres();

  res.render("trendingMovies", {
    "movies": collecitonList.rows,
    "to": "delete",
    "genres": genres.rows,
    "btnMsg": "Delete Collection",
  });
}

// TODO: need error handling
async function postDeleteFromCollection(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  db.deleteMovieByID(id);
  res.redirect("/collection");
}

export { getCollection, postCollection, postDeleteFromCollection };