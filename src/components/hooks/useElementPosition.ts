import { useEffect, useCallback, useRef } from 'react';
import { usePosition } from '../Canvas/PositionContext';
import { debounce } from '../Canvas/utils/debounce';
import { Point } from '../Canvas/types';
import { screenToCanvasPosition } from '../Canvas/utils/position';

export function useElementPosition(ref: React.RefObject<HTMLElement>) {
  const { updatePosition } = usePosition();
  const lastPosition = useRef<Point>({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  const updateElementPosition = useCallback(() => {
    if (!ref.current) return;
    
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const elementRect = ref.current.getBoundingClientRect();
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;
    
    const newPosition = screenToCanvasPosition(centerX, centerY, canvas);

    const threshold = 1;
    if (
      Math.abs(newPosition.x - lastPosition.current.x) > threshold ||
      Math.abs(newPosition.y - lastPosition.current.y) > threshold
    ) {
      lastPosition.current = newPosition;
      updatePosition(newPosition);
    }
  }, [ref, updatePosition]);

  const debouncedUpdate = useRef(debounce(() => {
    updateElementPosition();
    setTimeout(updateElementPosition, 100);
    setTimeout(updateElementPosition, 300);
  }, 16)).current;

  useEffect(() => {
    requestAnimationFrame(updateElementPosition);
    
    const resizeObserver = new ResizeObserver(debouncedUpdate);
    const mutationObserver = new MutationObserver(debouncedUpdate);
    
    if (ref.current) {
      resizeObserver.observe(ref.current);
      mutationObserver.observe(ref.current, {
        attributes: true,
        childList: true,
        subtree: true
      });
      
      let parent = ref.current.parentElement;
      while (parent) {
        mutationObserver.observe(parent, { 
          attributes: true,
          attributeFilter: ['style', 'class']
        });
        parent = parent.parentElement;
      }
    }
    
    window.addEventListener('resize', debouncedUpdate, { passive: true });
    window.addEventListener('scroll', debouncedUpdate, { passive: true });
    
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('scroll', debouncedUpdate);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateElementPosition, debouncedUpdate]);
}