import React, { memo } from 'react';
import { CanvasBackground } from '../CanvasBackground';
import { AnimationType } from '../types';

interface CanvasSlideProps {
  type: AnimationType;
  backgroundColor: string;
  className?: string;
}

export const CanvasSlide = memo(function CanvasSlide({
  type,
  backgroundColor,
  className = ''
}: CanvasSlideProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <CanvasBackground
        key={`${type}-${backgroundColor}`}
        type={type}
        backgroundColor={backgroundColor}
      />
    </div>
  );
});