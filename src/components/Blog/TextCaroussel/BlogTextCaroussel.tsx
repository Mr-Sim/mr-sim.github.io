import React, { useState, useEffect, useRef } from 'react';
import { BlogText } from '../Text/BlogText';

interface BlogTextCarouselProps {
  images: SimpleCarouselSlide[];
  imagePosition?: 'left' | 'right';
  imageWidth?: '1/2' | '1/3' | '1/4';
  useP?: boolean;
  imageOnTopMobile?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  children: React.ReactNode;
  className?: string;
  controlsPosition?: 'inside' | 'outside';
}

export interface SimpleCarouselSlide {
  src: string; 
  alt: string; 
  caption?: string;
}

export function BlogTextCarousel({
  images,
  imagePosition = 'right',
  imageWidth = '1/2',
  useP = true,
  imageOnTopMobile = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  children,
  className = '',
  controlsPosition = 'inside',
}: BlogTextCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const firstImageRef = useRef<HTMLImageElement>(null);

  const imageWidthClass = {
    '1/2': 'w-3/4 md:w-1/2',
    '1/3': 'w-3/5 md:w-1/3',
    '1/4': 'w-1/2 md:w-1/4',
  }[imageWidth];

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  useEffect(() => {
    if (firstImageRef.current) {
      const img = firstImageRef.current;
      img.onload = () => {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
        setIsLoaded(true);
      };
    }
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={`my-12 ${className}`}>
      <div
        className={`flex ${
          imageOnTopMobile ? 'flex-col' : 'flex-col md:flex-row'
        } ${
          imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
        } gap-8 items-center`}
      >
        <figure className={`${imageWidthClass} relative`}>
          <div className="relative w-full h-auto rounded-lg overflow-hidden" style={{ aspectRatio }}>
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
            )}

            <img
              ref={firstImageRef}
              decoding="async"
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              loading="lazy"
              className={`w-full h-auto object-contain rounded-lg transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          {images[currentIndex].caption && (
            <figcaption className="mt-2 text-sm text-white/60 text-center">
              {images[currentIndex].caption}
            </figcaption>
          )}

          <div
            className={`absolute inset-0 flex justify-between items-center px-2 ${
              controlsPosition === 'outside' ? 'translate-y-full mt-2' : ''
            }`}
          >
            <button onClick={handlePrev} className="bg-black/50 text-white px-2 py-1 rounded">❮</button>
            <button onClick={handleNext} className="bg-black/50 text-white px-2 py-1 rounded">❯</button>
          </div>

          {showIndicators && (
            <div className="flex justify-center gap-2 mt-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-gray-400'
                  }`}
                ></button>
              ))}
            </div>
          )}
        </figure>

        <div className="flex-1">
          {useP ? <BlogText>{children}</BlogText> : <div>{children}</div>}
        </div>
      </div>
    </div>
  );
}
