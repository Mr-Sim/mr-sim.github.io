import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionSectionProps } from './types';
import { adjustColor } from './utils';

export function AccordionSection({
  title,
  isExpanded,
  onToggle,
  backgroundColor,
  children,
  countdownTime = 10
}: AccordionSectionProps) {

  const collapsedHeight = '4rem';
  const [countdown, setCountdown] = useState(countdownTime);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTitleAnimating, setIsTitleAnimating] = useState(false);
  const [hasCooldownEnded, setHasCooldownEnded] = useState(false);

  useEffect(() => {
    if (countdown <= 0 && !hasCooldownEnded) {
      setIsAnimating(true);
      setIsTitleAnimating(true);
      setHasCooldownEnded(true); // Marquer la fin du cooldown

      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  }, [countdown, hasCooldownEnded]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // 🔄 Nouvelle gestion de la répétition après le cooldown
  useEffect(() => {
    if (hasCooldownEnded) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 600);
      }, 10000); // Répéter toutes les 10s après le cooldown

      return () => clearInterval(interval);
    }
  }, [hasCooldownEnded]);

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
      {/* Gradient de fond */}
      <div 
        className="absolute inset-0 min-h-[100vh]"
        style={{ 
          background: `linear-gradient(45deg, ${backgroundColor}, ${adjustColor(backgroundColor, -20)})` 
        }}
      />

      {/* Contenu */}
      <div className={`transition-all duration-300 absolute inset-0 overflow-hidden`}>
        <div className={`h-full overflow-x-hidden`}>
          {children}
        </div>
      </div>

      {/* Header avec animations */}
      <button
        onClick={onToggle}
        className={`w-full px-6 flex items-center justify-between text-white absolute top-0 left-0 right-0 z-10 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'animate-highlight' : ''}`}
        style={{ minHeight: collapsedHeight }}
      >
        {/* Titre animé */}
        <h2 
          className={`text-xl font-bold transition-opacity duration-300 opacity-0 ${
            isTitleAnimating ? 'animate-slide-in' : ''
          }`}
        >
          {title}
        </h2>

        <ChevronDown 
          className={`transform transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>
    </div>
  );
}
