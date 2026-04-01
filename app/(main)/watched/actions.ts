'use server'

import { createClient } from '@/lib/supabase/server'
import { Movie } from '@/types/tmdb'

const STAR_TO_RATING: Record<number, number> = {
  0: 900,
  1: 1100,
  2: 1300,
  3: 1500,
  4: 1700,
  5: 1900,
}

const GLICKO2_DEFAULTS = {
  rd: 350,
  volatility: 0.06,
}

export async function addToWatched(movie: Movie, stars: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('watched').upsert({
    user_id: user.id,
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    overview: movie.overview,
    release_date: movie.release_date,
    stars,
    rating: STAR_TO_RATING[stars] ?? 1500,
    ...GLICKO2_DEFAULTS,
  }, { onConflict: 'user_id,movie_id' })

  if (error) return { error: error.message }

  return { success: true }
}

export async function removeFromWatched(movieId: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('watched')
    .delete()
    .match({ user_id: user.id, movie_id: movieId })

  if (error) return { error: error.message }

  return { success: true }
}
