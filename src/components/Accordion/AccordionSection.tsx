import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionSectionProps } from './types';
import { adjustColor } from './utils';
import { useAccordionContext } from './AccordionContext';

export function AccordionSection({
  title,
  isExpanded,
  onToggle,
  backgroundColor,
  children,
  countdownTime = 10 // Valeur par défaut de 10 secondes pour le compte à rebours
}: AccordionSectionProps) {

  const collapsedHeight = '4rem';
  const [countdown, setCountdown] = useState(countdownTime); // Compte à rebours avec décimales possibles
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      // Déclencher l'animation lorsque le compte à rebours atteint zéro
      setIsAnimating(true);

      // Lancer les animations : gonfler, puis revenir à la taille initiale
      setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Durée de l'animation (doit correspondre à l'animation CSS)
    }
  }, [countdown]);

  // Décrémenter le compte à rebours toutes les secondes
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 0.1); // Décrémenter de 0.1 pour garder la précision
      }, 100); // Mise à jour toutes les 100 ms pour gérer les fractions de seconde
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <div 
      className="transition-all duration-300 ease-in-out relative"
      style={{ 
        height: isExpanded ? '0' : collapsedHeight,
        flexGrow: isExpanded ? 1 : 0,
        flexShrink: 0,
        flexBasis: isExpanded ? 'auto' : collapsedHeight,
        minHeight: collapsedHeight
      }}
    >
      {/* Gradient de fond statique */}
      <div 
        className="absolute inset-0 min-h-[100vh]"
        style={{ 
          background: `linear-gradient(45deg, ${backgroundColor}, ${adjustColor(backgroundColor, -20)})` 
        }}
      />

      {/* Conteneur de contenu qui commence du haut */}
      <div className={`transition-all duration-300 absolute inset-0 overflow-hidden`}>
        <div className={`h-full overflow-x-hidden`}>
          {children}
        </div>
      </div>

      {/* Bouton d'en-tête avec flou de fond et animation */}
      <button
        onClick={onToggle}
        className={`w-full px-6 flex items-center justify-between text-white absolute top-0 left-0 right-0 z-10 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'header-animate' : ''}`}
        style={{ minHeight: collapsedHeight }}
      >
        <h2 className="ml-5 text-xl font-bold">{title}</h2>
        <ChevronDown 
          className={`transform transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>
    </div>
  );
}
