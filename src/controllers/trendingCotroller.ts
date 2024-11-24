import { Request, Response } from "npm:express";
import * as movieList from "../util/tmdb/movieList.ts";

async function getTrendingMovies(req: Request, res: Response) {
  const popularMoviesResult = await movieList.fetchMovies("popular", 1);
  const popularMoviesList = movieList.getMoviesList(popularMoviesResult);
  res.render("trendingMovies", { "movies": popularMoviesList });
}

export { getTrendingMovies };
