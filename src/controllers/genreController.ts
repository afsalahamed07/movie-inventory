import { Request, Response } from "express";
import { discoverWithGenre, fetchMovies } from "../util/tmdb/movieList";
import { getMoviesList } from "../util/tmdb/movieList";
import { queryGenres } from "../db/queries";

export async function genreController(req: Request, res: Response) {
  // TODO: veify genre exist in the db
  const genre = Number(req.params.genre);
  const discoverResult = await discoverWithGenre(genre, 1);
  const movielist = getMoviesList(discoverResult);
  const genres = await queryGenres();

  const displayGenre = genres.rows.find(({ id }) => id == genre);

  res.render("movies", {
    movies: movielist,
    to: "add",
    btnMsg: "Add to Collection",
    genres: genres.rows,
    displayGenre: { name: displayGenre.name },
  });
}
