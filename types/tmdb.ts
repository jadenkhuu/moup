export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export interface MovieDetails extends Movie {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string | null;
  status: string;
}