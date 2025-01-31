import React from 'react';

interface CarouselDotsProps {
  total: number;
  current: number;
  onClick?: (index: number) => void;
  disabled?: boolean;
}

export function CarouselDots({ total, current, onClick, disabled }: CarouselDotsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onClick?.(i)}
          disabled={disabled}
          className={`w-2 h-2 rounded-full transition-all transform
            ${current === i 
              ? 'bg-white scale-125' 
              : 'bg-white/40 hover:bg-white/60'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}