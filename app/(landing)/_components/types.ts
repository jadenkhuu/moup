import demoMoviesData from "../demoMovies.json";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
};

export const MOVIES: Movie[] = demoMoviesData;

export const getYear = (releaseDate: string) =>
  releaseDate ? new Date(releaseDate).getFullYear() : 0;

export const tmdbPoster = (
  path: string | null,
  size: "w342" | "w500" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null);
