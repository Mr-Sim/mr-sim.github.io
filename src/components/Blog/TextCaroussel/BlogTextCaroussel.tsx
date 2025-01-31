import React from 'react';
import { BlogText } from '../Text/BlogText';
import { EnhancedCarousel } from '../Carousel/EnhancedCarousel';
import { CarouselSlide } from '../Carousel/types';

interface BlogTextCarousselProps {
  slides: CarouselSlide[];
    autoplay?: boolean;
    interval?: number;
  imagePosition?: 'left' | 'right';
  useP?: boolean;
  children: React.ReactNode;
  className?: string;
  matchHeight?: boolean;
}

export function BlogTextCaroussel({
  slides, 
  autoplay = false, 
  interval = 5000,
  imagePosition = 'right',
  useP = true,
  children,
  className = '',
  matchHeight = false
}: BlogTextCarousselProps) {

  return (
    <div className={`my-12 ${className}`}>
      <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
        <div className="flex-1">
          {useP && <BlogText>{children}</BlogText>}
          {!useP && <div>{children}</div>}       
        </div>
        <figure className="w-full md:w-1/2">
          <EnhancedCarousel slides={slides} autoplay={autoplay} interval={interval} matchHeight={true}/>
        </figure>
      </div>
    </div>
  );
}