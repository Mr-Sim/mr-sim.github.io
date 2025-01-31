import React from 'react';

interface AnimationNameProps {
  name: string;
  isTransitioning: boolean;
}

export function AnimationName({ name, isTransitioning }: AnimationNameProps) {
  return (
    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10">
      <h2 
        className={`text-white font-medium tracking-wider transition-opacity duration-500 
          text-base md:text-xl ${
          isTransitioning ? 'opacity-0' : 'opacity-80'
        }`}
      >
        {name}
      </h2>
    </div>
  );
}