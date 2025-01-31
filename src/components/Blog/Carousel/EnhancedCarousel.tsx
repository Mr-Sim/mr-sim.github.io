import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselProps } from './types';
import { CarouselSlide } from './CarouselSlide';

export function EnhancedCarousel({ 
  slides, 
  autoplay = false, 
  interval = 5000, 
  matchHeight = true,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState('auto');
  const touchStart = useRef<number>(0);
  const autoplayTimerRef = useRef<number>();
  const transitionTimerRef = useRef<number>();
  const firstSlideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (matchHeight && firstSlideRef.current) {
      const updateHeight = () => {
        const height = firstSlideRef.current?.getBoundingClientRect().height || 0;
        setCarouselHeight(`${height}px`);
      };

      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [matchHeight]);

  useEffect(() => {
    if (autoplay && !isPaused) {
      autoplayTimerRef.current = window.setInterval(() => {
        handleNext();
      }, interval);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, interval, isPaused]);

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(newIndex);

    // Clear any existing transition timer
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // Reset transition state after animation completes
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the transition duration in the CSS
  };

  const handleNext = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  useEffect(() => {
    if (matchHeight && firstSlideRef.current) {
      const updateHeight = () => {
        const height = firstSlideRef.current?.getBoundingClientRect().height || 0;
        console.log("Height of first slide:", height); // Debug log
        setCarouselHeight(`${height}px`);
      };
  
      updateHeight();
      window.addEventListener('resize', updateHeight);
  
      return () => window.removeEventListener('resize', updateHeight);
    } else {
      console.log("MatchHeight disabled or firstSlideRef is null."); // Debug log
    }
  }, [matchHeight]);

  return (
    <div 
      className="relative my-12 group bg-gray-900 aspect-video rounded-lg overflow-hidden"
      style={matchHeight ? { height: carouselHeight } : undefined}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 flex will-change-transform ${
            isTransitioning ? 'transition-transform duration-500 ease-out' : ''
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="w-full h-full flex-shrink-0"
              aria-hidden={index !== currentSlide}
              ref={index === 0 ? firstSlideRef : undefined}
            >
              <CarouselSlide 
                slide={slide}
                isVisible={index === currentSlide}
                isTransitioning={isTransitioning}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
          bg-black/50 hover:bg-black/70 text-white/90 
          opacity-0 group-hover:opacity-100 transition-all transform 
          hover:scale-110 active:scale-95 z-10
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
          bg-black/50 hover:bg-black/70 text-white/90 
          opacity-0 group-hover:opacity-100 transition-all transform 
          hover:scale-110 active:scale-95 z-10
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </div>
  );
}
