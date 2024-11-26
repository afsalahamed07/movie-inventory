import { Request, Response } from "npm:express";
import * as movieList from "../util/tmdb/movieList.ts";
import { queryGenres } from "../db/queries.ts";

async function getTrendingMovies(req: Request, res: Response) {
  const popularMoviesResult = await movieList.fetchMovies("popular", 1);
  const popularMoviesList = movieList.getMoviesList(popularMoviesResult);
  const genres = await queryGenres();
  res.render("trendingMovies", {
    "movies": popularMoviesList,
    "to": "add",
    "btnMsg": "Add to Collection",
    "genres": genres.rows,
  });
}

export { getTrendingMovies };
