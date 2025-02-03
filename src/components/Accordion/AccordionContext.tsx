import React, { createContext, useContext, useEffect, useState } from 'react';

// Contexte pour le chronomètre global
const AccordionContext = createContext<{
  globalTrigger: boolean;
}>({ globalTrigger: false });

// Hook pour utiliser le contexte
export function useAccordionContext() {
  return useContext(AccordionContext);
}

// Fournisseur de contexte
export function AccordionProvider({ children }: { children: React.ReactNode }) {
  const [globalTrigger, setGlobalTrigger] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTrigger(prev => !prev); // Déclenchement global toutes les 10s
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AccordionContext.Provider value={{ globalTrigger }}>
      {children}
    </AccordionContext.Provider>
  );
}