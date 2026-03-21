'use server'

import { createClient } from '@/lib/supabase/server'
import { Movie } from '@/types/tmdb'
import glicko2 from 'glicko2-lite'

export type MatchupPair = { target: Movie; opponent: Movie }

export async function getMatchupQueue(
  limit: number = 3
): Promise<MatchupPair[] | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { data: movies, error } = await supabase
    .from('watched')
    .select('movie_id, title, poster_path, release_date, overview, rating, rd, volatility')
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  if (!movies || movies.length < 2) return { error: 'Not enough movies' }

  const toMovie = (m: typeof movies[0]): Movie => ({
    id: m.movie_id,
    title: m.title,
    poster_path: m.poster_path,
    vote_average: 0,
    release_date: m.release_date ?? '',
    overview: m.overview ?? '',
  })

  // Sort by highest rd (most uncertain ranking) to pick targets
  const sorted = [...movies].sort((a, b) => b.rd - a.rd)
  const targets = sorted.slice(0, limit)

  const usedOpponentIds = new Set<number>()
  const pairs: MatchupPair[] = []

  for (const target of targets) {
    const candidates = movies.filter(
      (m) => m.movie_id !== target.movie_id && !usedOpponentIds.has(m.movie_id)
    )

    if (candidates.length === 0) break

    const opponent = candidates.reduce((best, m) =>
      Math.abs(m.rating - target.rating) < Math.abs(best.rating - target.rating) ? m : best
    )

    usedOpponentIds.add(target.movie_id)
    usedOpponentIds.add(opponent.movie_id)
    pairs.push({ target: toMovie(target), opponent: toMovie(opponent) })
  }

  return pairs
}

export async function resolveMatch(
  winnerId: number,
  loserId: number
): Promise<{ success: true } | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { data: movies, error } = await supabase
    .from('watched')
    .select('movie_id, rating, rd, volatility')
    .eq('user_id', user.id)
    .in('movie_id', [winnerId, loserId])

  if (error) return { error: error.message }
  if (!movies || movies.length < 2) return { error: 'Movies not found' }

  const winner = movies.find((m) => m.movie_id === winnerId)!
  const loser = movies.find((m) => m.movie_id === loserId)!

  // score 1 = win, score 0 = loss
  const newWinner = glicko2(winner.rating, winner.rd, winner.volatility, [
    [loser.rating, loser.rd, 1],
  ])
  const newLoser = glicko2(loser.rating, loser.rd, loser.volatility, [
    [winner.rating, winner.rd, 0],
  ])

  await supabase
    .from('watched')
    .update({ rating: newWinner.rating, rd: newWinner.rd, volatility: newWinner.vol })
    .eq('movie_id', winnerId)
    .eq('user_id', user.id)

  await supabase
    .from('watched')
    .update({ rating: newLoser.rating, rd: newLoser.rd, volatility: newLoser.vol })
    .eq('movie_id', loserId)
    .eq('user_id', user.id)

  return { success: true }
}
