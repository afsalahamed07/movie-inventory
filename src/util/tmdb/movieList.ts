import { Movie } from "../../types/Movie.ts";
import "dotenv/config.js";

// TODO: move the authorization to env
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API}`,
  },
};

// TODO: try to add lang as param
async function fetchMovies(param: string, page: number) {
  const url = `https://api.themoviedb.org/3/movie/${param}?language=en-US&page=${page}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function discoverWithGenre(genreID: number, page: number) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreID}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getMoviesList(data: object) {
  const results = data.results;

  const movieList = results.map((movieResult: object) => {
    const movie: Movie = {
      backdropPath: movieResult.backdrop_path,
      genreId: movieResult.genre_ids,
      id: movieResult.id,
      original_language: movieResult.original_language,
      overview: movieResult.overview,
      popularity: movieResult.popularity,
      poster_path: movieResult.poster_path,
      release_date: movieResult.release_date,
      title: movieResult.title,
      voteAverage: movieResult.vote_average,
    };

    return movie;
  });

  return movieList;
}

async function fetchMovie(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function castToMovie(movieResult: object) {
  const movie: Movie = {
    backdropPath: movieResult.backdrop_path,
    genreIds: movieResult.genres.map((genre) => genre.id),
    id: movieResult.id,
    originalLanguage: movieResult.original_language,
    overview: movieResult.overview,
    popularity: movieResult.popularity,
    posterPath: movieResult.poster_path,
    releaseDate: movieResult.release_date,
    title: movieResult.title,
    voteAverage: movieResult.vote_average,
    originalTitle: "",
  };

  return movie;
}

export {
  castToMovie,
  fetchMovie,
  fetchMovies,
  getMoviesList,
  discoverWithGenre,
};
