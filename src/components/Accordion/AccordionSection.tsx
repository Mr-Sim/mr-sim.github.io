import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAccordionContext } from './AccordionContext';
import { adjustColor } from './utils';

export function AccordionSection({
  title,
  isExpanded,
  onToggle,
  backgroundColor,
  children,
  countdownTime = 5
}) {
  const { globalTrigger } = useAccordionContext();
  const collapsedHeight = '4rem';
  const [countdown, setCountdown] = useState(countdownTime);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTitleAnimating, setIsTitleAnimating] = useState(false);

  // Déclenchement des animations après le compte à rebours
  const triggerAnimation = () => {
    setTimeout(() => {
      setIsAnimating(true);
      setIsTitleAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }, countdown * 1000); // Attendre la fin du compte à rebours
  };

  // Animation au chargement de la page
  useEffect(() => {
    triggerAnimation();
  }, []);

  // Animation déclenchée par le chronomètre global
  useEffect(() => {
    if (globalTrigger) {
      triggerAnimation();
    }
  }, [globalTrigger]);

  return (
    <div 
      className={`transition-all duration-300 ease-in-out relative`}
      style={{ 
        height: isExpanded ? '0' : collapsedHeight,
        flexGrow: isExpanded ? 1 : 0,
        flexShrink: 0,
        flexBasis: isExpanded ? 'auto' : collapsedHeight,
        minHeight: collapsedHeight
      }}
    >
      <div 
        className="absolute inset-0 min-h-[100vh]"
        style={{ background: `linear-gradient(45deg, ${backgroundColor}, ${adjustColor(backgroundColor, -20)})` }}
      />

      <div className={`transition-all duration-300 absolute inset-0 overflow-hidden`}>
        <div className={`h-full overflow-x-hidden`}>{children}</div>
      </div>

      <button
        onClick={onToggle}
        className={`w-full px-6 flex items-center justify-between text-white absolute top-0 left-0 right-0 z-10 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'animate-highlight' : ''}`}
        style={{ minHeight: collapsedHeight }}
      >
        <h2 
          className={`text-xl font-bold transition-opacity duration-300 opacity-0 ${isTitleAnimating ? 'animate-slide-in' : ''}`}
        >
          {title}
        </h2>
        <ChevronDown 
          className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
    </div>
  );
}