import { Request, Response } from "express";
import { fetchMovies } from "../util/tmdb/movieList";

export async function genreController(req: Request, res: Response) {
  // TODO: veify genre exist in the db
  const genre = req.params.genre;

  const movies = await fetchMovies(genre, 1);

  console.log(movies);
}
