import React from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: 'full' | 'mid';
  className?: string;
}

export function BlogImage({ 
  src, 
  alt, 
  caption, 
  width = 'full',
  className = '' 
}: BlogImageProps) {
  return (
    <figure className={`my-8 ${width === 'full' ? 'w-full' : 'w-3/4 mx-auto'} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-auto rounded-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-white/60 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}