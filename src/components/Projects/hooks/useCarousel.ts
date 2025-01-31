import { useRef, useState, useCallback, useEffect } from 'react';

export function useCarousel(containerRef: React.RefObject<HTMLElement>, itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  // Calculate slides and item width based on viewport
  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      let items = 1;
      
      if (width >= 1440) items = 4;
      else if (width >= 1024) items = 3;
      else if (width >= 768) items = 2;
      
      setItemsPerView(items);
      
      // Calculate total slides based on items per view
      const remainingItems = itemCount % items;
      const fullGroups = Math.floor(itemCount / items);
      const totalPages = remainingItems > 0 ? fullGroups + 1 : fullGroups;
      
      setTotalSlides(Math.max(1, totalPages));
      
      // Reset current index if it's beyond the new total
      setCurrentIndex(prev => Math.min(prev, totalPages - 1));
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [itemCount]);

  // Update translateX when index or layout changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const gap = 24; // 6 * 4px (gap-6)
    const itemWidth = (containerWidth - (gap * (itemsPerView - 1))) / itemsPerView;
    const offset = currentIndex * (itemWidth + gap) * itemsPerView;
    
    setTranslateX(-offset);
  }, [currentIndex, itemsPerView]);

  const scrollPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const scrollNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(totalSlides - 1, prev + 1));
  }, [totalSlides]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = touchStartX.current - e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const SWIPE_THRESHOLD = 50;
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
      if (touchDeltaX.current > 0) {
        scrollNext();
      } else {
        scrollPrev();
      }
    }
  }, [scrollNext, scrollPrev]);

  return {
    currentIndex,
    totalSlides,
    itemsPerView,
    translateX,
    canScrollPrev: currentIndex > 0,
    canScrollNext: currentIndex < totalSlides - 1,
    scrollPrev,
    scrollNext,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}