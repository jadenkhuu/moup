# moup

Moup is a simple movie search and tracker app, but with a twist. It evolves beyond the traditional 1-5 star rating system for a pairwise comparison engine that builds a comprehensive, perfectly beautiful ranking of your favorite films.

## The Problem

Most apps ask you to rate a movie in a vacuum: *"Is this a 4 or a 5?"* That’s hard and often inaccurate. Only having 1-5 stars is restrictive—you can't honestly say that every single movie you give 4 stars to gave you the exact same amount of enjoyment. 

On the flip side, trying to manually rank a list of 20+ movies feels like work. It feels like using a spreadsheet and sitting at a 9-5 job to do something that should feel easy and straight forward.

## The Solution

Moup asks a human question: **"Do you like this more than that?"**

Instead of assigning an arbitrary and discrete ranking like out of 5 stars, you play a quick 'This or That' game. Stop overthinking your ratings. Just choose. Moup curates quick comparisons that turn your gut feelings into a perfectly ordered list of your favorite movies.

## Features
- **Search & Track:** Find movies easily and add them to your Watched or Watchlist.
- **Pairwise Ranking Engine:** Compare two movies head-to-head.
- **True Rankings:** Automatically generate a ranked list of your watched movies based on your comparison choices. 

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript/JS
- **Styling:** Tailwind CSS / shadcn/ui
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Data:** [TMDB API](https://developer.themoviedb.org/docs)
