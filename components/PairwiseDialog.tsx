'use client';

import { useState } from 'react';
import { PairMovieCard } from '@/components/PairMovieCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Movie } from '@/types/tmdb';

const mockMovieA: Movie = {
  id: 550,
  title: 'Fight Club',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  vote_average: 8.4,
  release_date: '1999-10-15',
  overview: '',
};

const mockMovieB: Movie = {
  id: 13,
  title: 'Forrest Gump',
  poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
  vote_average: 8.5,
  release_date: '1994-07-06',
  overview: '',
};

interface PairwiseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PairwiseDialog({ open, onOpenChange }: PairwiseDialogProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-zinc-900 border-zinc-800 p-0 overflow-hidden max-w-sm sm:max-w-md gap-0"
        onClick={() => setSelected(null)}
      >
        {/* Title bar */}
        <DialogHeader className="bg-zinc-900/80 backdrop-blur-md px-6 py-3 border-b border-zinc-800">
          <DialogTitle className="font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl tracking-tight text-left">
            pairwise
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div
          className="flex flex-col items-center px-6 py-8 gap-8"
          onClick={() => setSelected(null)}
        >
          <p className="text-zinc-400 text-sm font-medium tracking-wide uppercase">
            choose one option from below:
          </p>

          <div
            className="flex gap-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1">
              <PairMovieCard
                movie={mockMovieA}
                isSelected={selected === mockMovieA.id}
                onClick={() => setSelected(mockMovieA.id)}
              />
            </div>
            <div className="flex-1">
              <PairMovieCard
                movie={mockMovieB}
                isSelected={selected === mockMovieB.id}
                onClick={() => setSelected(mockMovieB.id)}
              />
            </div>
          </div>

          <p
            className={`text-zinc-400 text-sm transition-all duration-300 ${
              selected !== null
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-1 pointer-events-none'
            }`}
          >
            click it again to confirm the selection
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
