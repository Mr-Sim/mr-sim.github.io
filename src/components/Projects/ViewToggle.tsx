import React from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface ViewToggleProps {
  mode: 'carousel' | 'grid';
  onToggle: () => void;
}

export function ViewToggle({ mode, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors
        backdrop-blur-sm text-white/90 hover:text-white
        transform hover:scale-105 active:scale-95"
      aria-label={`Switch to ${mode === 'carousel' ? 'grid' : 'carousel'} view`}
    >
      {mode === 'carousel' ? (
        <LayoutGrid className="w-5 h-5" />
      ) : (
        <LayoutList className="w-5 h-5" />
      )}
    </button>
  );
}