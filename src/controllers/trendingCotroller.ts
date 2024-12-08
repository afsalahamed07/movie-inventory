import { Request, Response } from "express";
import * as movieList from "../util/tmdb/movieList.js";
import { queryGenres } from "../db/queries.js";

async function getTrendingMovies(req: Request, res: Response) {
  const popularMoviesResult = await movieList.fetchMovies("popular", 1);
  const popularMoviesList = movieList.getMoviesList(popularMoviesResult);
  const genres = await queryGenres();
  res.render("movies", {
    movies: popularMoviesList,
    to: "add",
    btnMsg: "Add to Collection",
    genres: genres.rows,
    displayGenre: { link: "/trening", name: "Trening" },
  });
}

export { getTrendingMovies };
