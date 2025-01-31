import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CanvasSlide } from './CanvasSlide';
import { CarouselDots } from './CarouselDots';
import { AnimationName } from './AnimationName';
import { AnimationType, AnimationInfo } from '../types';

interface CanvasCarouselProps {
  backgroundColor: string;
}

const ANIMATIONS: AnimationInfo[] = [
  { type: 'squares', name: 'Vortex' },
  { type: 'circles', name: 'Polymers' }
];

export function CanvasCarousel({ backgroundColor }: CanvasCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(() => 
    Math.floor(Math.random() * ANIMATIONS.length)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const cleanupTransition = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleTransition = (newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    
    cleanupTransition();
    setIsTransitioning(true);
    
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + ANIMATIONS.length) % ANIMATIONS.length;
    handleTransition(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % ANIMATIONS.length;
    handleTransition(newIndex);
  };

  useEffect(() => {
    return cleanupTransition;
  }, [cleanupTransition]);

  const currentAnimation = ANIMATIONS[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Canvas slide */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <CanvasSlide
          key={currentIndex}
          type={currentAnimation.type}
          backgroundColor={backgroundColor}
        />
      </div>
      
      {/* Animation name */}
      <AnimationName 
        name={currentAnimation.name}
        isTransitioning={isTransitioning}
      />
      
      {/* Navigation buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none" style={{ zIndex: 20 }}>
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6 text-white opacity-75 hover:opacity-100 transition-opacity" />
        </button>
        
        <button
          onClick={handleNext}
          className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6 text-white opacity-75 hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Navigation dots */}
      <CarouselDots
        total={ANIMATIONS.length}
        current={currentIndex}
        onClick={handleTransition}
        disabled={isTransitioning}
      />
    </div>
  );
}