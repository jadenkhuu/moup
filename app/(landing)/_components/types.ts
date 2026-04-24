import demoMoviesData from "../demoMovies.json";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  stars: number;
};

export const MOVIES: Movie[] = demoMoviesData;

// Mirrors the real app's seed ratings in app/(main)/watched/actions.ts
export const STAR_TO_RATING: Record<number, number> = {
  0: 900,
  1: 1100,
  2: 1300,
  3: 1500,
  4: 1700,
  5: 1900,
};

export const getYear = (releaseDate: string) =>
  releaseDate ? new Date(releaseDate).getFullYear() : 0;

export const tmdbPoster = (
  path: string | null,
  size: "w342" | "w500" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null);
