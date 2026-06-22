'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MovieCategory } from '@/types/tmdb';

const CATEGORIES: { value: MovieCategory; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'now_playing', label: 'Now Playing' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'top_rated', label: 'Top Rated' },
];

export default function CategorySelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // A search query takes over the page, so the category filter is irrelevant.
  const isSearching = !!searchParams.get('q');
  const category = (searchParams.get('category') as MovieCategory) || 'popular';

  const handleChange = (value: string) => {
    startTransition(() => {
      // Keep the URL clean for the default category.
      router.push(value === 'popular' ? '/search' : `/search?category=${value}`);
    });
  };

  return (
    <Select value={category} onValueChange={handleChange} disabled={isSearching}>
      <SelectTrigger
        size="sm"
        className="w-[130px] border-zinc-700 bg-zinc-800/20 dark:bg-zinc-800/20 backdrop-blur-md text-zinc-300 focus:ring-0 focus:ring-offset-0 shrink-0 shadow-xs disabled:opacity-40"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
        {CATEGORIES.map(({ value, label }) => (
          <SelectItem
            key={value}
            value={value}
            className="text-zinc-200 focus:bg-zinc-700 focus:text-zinc-100 cursor-pointer"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
