'use client';

import { useState } from 'react';
import { Star, Trash2, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieTitle: string;
  onConfirm: (rating: number) => void;
  onRemove?: () => void;
}

export const RatingDialog = ({
  open,
  onOpenChange,
  movieTitle,
  onConfirm,
  onRemove,
}: RatingDialogProps) => {
  const [hovered, setHovered] = useState<number | null>(3);
  const [selected, setSelected] = useState<number | null>(3);

  const displayRating = hovered ?? selected;

  const handleConfirm = () => {
    if (selected !== null) {
      onConfirm(selected);
      onOpenChange(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setHovered(null);
      setSelected(3);
    }
    onOpenChange(open);
  };

  const ratingLabels: Record<number, string> = {
    0: 'Terrible',
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Great',
    5: 'Excellent',
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xs bg-zinc-900 border-zinc-800 text-zinc-100 [&_[data-slot='dialog-close']]:opacity-100 [&_[data-slot='dialog-close']]:text-zinc-300 [&_[data-slot='dialog-close']]:hover:text-white [&_[data-slot='dialog-close']]:hover:bg-zinc-700/60 [&_[data-slot='dialog-close']]:rounded-md [&_[data-slot='dialog-close']]:p-1 [&_[data-slot='dialog-close']]:-m-1">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Rate this movie</DialogTitle>
          <DialogDescription className="text-zinc-400 break-words mt-2">
            {movieTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2 py-2">
          <div
            className="flex gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelected(selected === star ? 0 : star)}
                onMouseEnter={() => setHovered(star)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  size={36}
                  strokeWidth={1.5}
                  className={
                    displayRating !== null && star <= displayRating
                      ? 'fill-zinc-300 text-zinc-300 transition-colors'
                      : 'fill-transparent text-zinc-600 transition-colors'
                  }
                />
              </button>
            ))}
          </div>

          <span className="text-sm h-5 text-zinc-400 tracking-wide">
            {displayRating !== null ? ratingLabels[displayRating] : ''}
          </span>
        </div>

        <DialogFooter className="flex-row items-center justify-end gap-1 sm:gap-2">
          {onRemove ? (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                onRemove();
                onOpenChange(false);
              }}
              className="bg-zinc-800 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-zinc-700/50"
            >
              <Trash2 size={16} />
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                variant="secondary"
                size="icon"
                className="bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
              >
                <X size={16} />
              </Button>
            </DialogClose>
          )}
          <Button
            onClick={handleConfirm}
            disabled={selected === null}
            size="icon"
            className="bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 hover:text-emerald-300 border border-zinc-700/50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
