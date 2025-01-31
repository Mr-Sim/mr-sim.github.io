import React, { useState } from 'react';
import { BlogText } from '../Text/BlogText';

interface BlogTextImageProps {
  src: string;
  alt: string;
  caption?: string;
  imagePosition?: 'left' | 'right';
  imageWidth?: '1/2' | '1/3' | '1/4';
  useP?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BlogTextImage({
  src,
  alt,
  caption,
  imagePosition = 'right',
  imageWidth = '1/2', // Défaut : l'image prend la moitié de l'espace
  useP = true,
  children,
  className = '',
}: BlogTextImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Génération de la classe de largeur selon la valeur de imageWidth
  const imageWidthClass = {
    '1/2': 'md:w-1/2',
    '1/3': 'md:w-1/3',
    '1/4': 'md:w-1/4',
  }[imageWidth];

  return (
    <div className={`my-12 ${className}`}>
      <div
        className={`flex flex-col ${
          imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
        } gap-8 items-center`}
      >
        <div className="flex-1">
          {useP && <BlogText>{children}</BlogText>}
          {!useP && <div>{children}</div>}
        </div>
        <figure className={`w-full ${imageWidthClass}`}>
          <div className="relative w-full h-auto rounded-lg overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
            )}
            <img
              decoding="async"
              src={src}
              alt={alt}
              loading="lazy"
              className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-white/60 text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  );
}
