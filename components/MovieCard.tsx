import { Movie } from '@/types/tmdb';
import { Calendar, BookmarkPlus, Star, Info, Eye } from 'lucide-react'; // Kept Star for the button icon
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="h-60 w-full flex flex-row overflow-hidden bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700 transition-all group gap-0 p-0">
      
      {/* Left: Portrait Poster */}
      <div className="relative w-40 shrink-0 bg-zinc-800 border-r border-zinc-800/50">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover duration-500"
            sizes="160px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 text-xs">
            No Poster
          </div>
        )}
      </div>

      {/* Right: Content container */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Header Section */}
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-zinc-100 font-bold text-lg line-clamp-1 leading-tight group-hover:text-white transition-colors">
            {movie.title}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {movie.release_date && (
              <div className="flex items-center gap-1 text-zinc-500">
                <Calendar size={12} />
                <span className="text-xs">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Overview / Blurb */}
        <CardContent className="px-4 py-1 flex-1">
          <p className="text-zinc-400 text-xs line-clamp-5 leading-relaxed">
            {movie.overview || "No overview available."}
          </p>
        </CardContent>

        {/* Footer: Action Buttons */}
        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
            
            {/* More Info Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
                >
                  <Info size={16} strokeWidth={2.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Info</p>
              </TooltipContent>
            </Tooltip>


            {/* Watchlist Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
                >
                  <BookmarkPlus size={16} strokeWidth={2.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Watchlist</p>
              </TooltipContent>
            </Tooltip>

            {/* Watched Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 border border-zinc-700/50"
                >
                  <Eye size={16} strokeWidth={2.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as Watched</p>
              </TooltipContent>
            </Tooltip>

        </CardFooter>
      </div>
    </Card>
  );
};