import React from 'react';

interface TechChipProps {
  technology: string;
}

export function TechChip({ technology }: TechChipProps) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
      bg-white/10 text-white/80 whitespace-nowrap">
      {technology}
    </span>
  );
}