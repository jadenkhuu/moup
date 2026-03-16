'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { Movie } from '@/types/tmdb'

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
  }, { onConflict: 'user_id,movie_id' })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
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

  revalidatePath('/', 'layout')
  return { success: true }
}
