import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import { Movie } from '@/types/tmdb';

interface PairMovieCardProps {
  movie: Movie;
  isSelected?: boolean;
  onClick?: () => void;
}

export const PairMovieCard = ({ movie, isSelected = false, onClick }: PairMovieCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`flex flex-col overflow-hidden bg-zinc-900/50 backdrop-blur-sm transition-all duration-200 group gap-0 p-0 cursor-pointer
        ${isSelected
          ? '-translate-y-2 scale-[1.03] border-white'
          : 'border-zinc-800/50 hover:border-zinc-700 hover:-translate-y-0.5'
        }`}
    >
      <div className="relative w-full aspect-[2/3] bg-zinc-800">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover select-none pointer-events-none"
            sizes="(max-width: 768px) 50vw, 342px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
            No Poster
          </div>
        )}
      </div>

      <div className="px-3 py-2.5 flex flex-col items-center gap-1">
        <CardTitle
          title={movie.title}
          className="text-zinc-100 font-bold text-sm sm:text-lg leading-tight text-center group-hover:text-white transition-colors line-clamp-2"
        >
          {movie.title}
        </CardTitle>

        {movie.release_date && (
          <div className="flex items-center gap-1 text-zinc-500">
            <Calendar size={12} />
            <span className="text-xs">{new Date(movie.release_date).getFullYear()}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
