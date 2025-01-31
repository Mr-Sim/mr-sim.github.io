import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { Project } from './types';
import { useCarousel } from './hooks/useCarousel';

interface ProjectCarouselProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
}

export function ProjectCarousel({ projects, onViewProject }: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    currentIndex,
    totalSlides,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    itemsPerView,
    translateX
  } = useCarousel(containerRef, projects.length);

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-grow flex items-center px-12 md:px-16">
        {/* Main carousel container */}
        <div 
          ref={containerRef}
          className="w-full h-[90%] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex gap-6 h-full transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="flex-shrink-0 h-full"
                style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
              >
                <ProjectCard 
                  project={project}
                  onViewProject={onViewProject}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          className={`absolute left-4 p-3 rounded-full bg-black/30 hover:bg-black/50 
            backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95
            ${!canScrollPrev ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Previous slide"
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className={`absolute right-4 p-3 rounded-full bg-black/30 hover:bg-black/50 
            backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95
            ${!canScrollNext ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-label="Next slide"
          disabled={!canScrollNext}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all transform
              ${currentIndex === i 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={currentIndex === i}
          />
        ))}
      </div>
    </div>
  );
}