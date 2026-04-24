import Image from "next/image";
import { Movie, tmdbPoster } from "./types";

export const Poster = ({ movie }: { movie: Movie }) => {
  const src = tmdbPoster(movie.poster_path);
  return (
    <div className="poster relative w-full aspect-[2/3] overflow-hidden bg-zinc-900">
      {src ? (
        <Image
          src={src}
          alt={movie.title}
          fill
          className="object-cover select-none pointer-events-none"
          sizes="(max-width: 768px) 50vw, 342px"
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
          No Poster
        </div>
      )}
    </div>
  );
};
