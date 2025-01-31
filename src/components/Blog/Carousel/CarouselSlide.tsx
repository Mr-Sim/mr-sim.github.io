import React from 'react';
import { CarouselSlide as SlideType } from './types';

interface CarouselSlideProps {
  slide: SlideType;
  isVisible: boolean;
  isTransitioning: boolean;
}

export function CarouselSlide({ slide, isVisible, isTransitioning }: CarouselSlideProps) {
  const contentClasses = `transition-opacity duration-500 ${
    isVisible && !isTransitioning ? 'opacity-100' : 'opacity-0'
  }`;

  if (slide.type === 'image-only') {
    return (
      <div className="relative w-full h-full">
        <img
          src={slide.image}
          alt={slide.title || ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {slide.title && (
          <div className={`absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent ${contentClasses}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {slide.title}
            </h3>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row">
      {/* Image Section */}
      <div 
        className={`relative w-full md:w-3/5 h-full ${
          slide.alignment === 'right' ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <img
          src={slide.image}
          alt={slide.title || ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Mobile Title Overlay */}
        <div className={`md:hidden absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent ${contentClasses}`}>
          {slide.title && (
            <h3 className="text-xl font-bold text-white">
              {slide.title}
            </h3>
          )}
        </div>
      </div>

      {/* Text Panel */}
      <div 
        className={`w-full md:w-2/5 ${
          slide.alignment === 'right' ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <div className={`h-full flex flex-col justify-center p-6 md:p-8 bg-black/40 backdrop-blur-sm ${contentClasses}`}>
          {/* Desktop Title */}
          {slide.title && (
            <h3 className="hidden md:block text-2xl md:text-3xl font-bold text-white mb-4">
              {slide.title}
            </h3>
          )}
          {slide.description && (
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              {slide.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}