'use server'

import { Movie, MovieDetails, TMDBResponse } from '@/types/tmdb';

const accessToken = process.env.TMDB_ACCESS_TOKEN;

export async function fetchMovies(page: number): Promise<Movie[]> {
  
  if (!accessToken) {
    console.error("TMDB Access Token is missing");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      { 
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        next: { revalidate: 3600 } 
      }
    );

    if (!res.ok) {
      throw new Error(`TMDB API Error: ${res.status}`);
    }

    const data: TMDBResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

export async function fetchMovieById(id: string | number): Promise<MovieDetails | null> {
  if (!accessToken) {
    console.error("TMDB Access Token is missing");
    return null;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      { 
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`TMDB API Error: ${res.status}`);
    }

    const data: MovieDetails = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie ${id}:`, error);
    return null;
  }
}

export async function searchMovies(query: string, page: number): Promise<Movie[]> {
  if (!accessToken) {
    console.error("TMDB Access Token is missing");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
      { 
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!res.ok) {
      throw new Error(`TMDB API Error: ${res.status}`);
    }

    const data: TMDBResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error("Failed to search movies:", error);
    return [];
  }
}