# moup

moup is a simple movie search and tracker app, but with a twist. It evolves beyond the traditional 1-5 star rating system for a pairwise comparison engine that builds a comprehensive, perfectly beautiful ranking of your favorite films.

## The Problem

Most apps ask you to rate a movie in a vacuum: *"Is this a 4 or a 5?"* That’s hard, restrictive, and often inaccurate. You can't honestly say that every single 4-star movie gave you the exact same amount of enjoyment.

Plus, standard rating scales are broken. If you rate a restaurant a 6/10, people assume something went wrong. Because 7/10 is socially accepted as "average," you're realistically only using three numbers (8, 9, 10) to rank things you actually like.

But the alternative—manually ranking a list of 20+ movies—feels like spreadsheet work at a 9-5 job. It takes something that should be fun and turns it into a chore.

## The Solution

moup fixes this by asking a simple question: **"Do you like this more than that?"**

Instead of assigning an arbitrary and discrete ranking like out of 5 stars, you play a quick 'This or That' game. Stop overthinking your ratings. Just choose. moup curates quick comparisons that turn your gut feelings into a perfectly ordered list of your favorite movies.

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

## Running on Docker
```shell
# Build image
docker build -t jadenkhuu/moup-app:ver .

# Push image to DockerHub
docker push jadenkhuu/moup-app:ver

# Run container
docker run --rm -it -p 8080:3000 \
    -e TMDB_ACCESS_TOKEN="token" \
    -e NEXT_PUBLIC_SUPABASE_URL="https://url" \
    -e NEXT_PUBLIC_SUPABASE_ANON_KEY="key" \
    jadenkhuu/moup-app:ver
```
