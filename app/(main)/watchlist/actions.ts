'use server'

import { createClient } from '@/lib/supabase/server'
import { Movie } from '@/types/tmdb'

export async function addToWatchlist(movie: Movie) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('watchlist').insert({
    user_id: user.id,
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    overview: movie.overview,
    release_date: movie.release_date,
  })

  if (error) return { error: error.message }

  return { success: true }
}

export async function removeFromWatchlist(movieId: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('watchlist')
    .delete()
    .match({ user_id: user.id, movie_id: movieId })

  if (error) return { error: error.message }

  return { success: true }
}
