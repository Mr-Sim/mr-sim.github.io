export interface CarouselSlide {
  image: string;
  type: 'image-only' | 'image-text';
  title?: string;
  description?: string;
  alignment?: 'left' | 'right';
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoplay?: boolean;
  interval?: number;
}