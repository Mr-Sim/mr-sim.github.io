import React, { createContext, useContext } from 'react';

// Contexte pour stocker l'index de l'accordéon étendu
const AccordionContext = createContext<{
  expandedIndex: number | null;
} | null>(null);

// Hook pour utiliser le contexte
export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within an AccordionProvider');
  }
  return context;
}

// Fournisseur de contexte
export function AccordionProvider({
  children,
  expandedIndex,
}: {
  children: React.ReactNode;
  expandedIndex: number | null;
}) {
  return (
    <AccordionContext.Provider value={{ expandedIndex }}>
      {children}
    </AccordionContext.Provider>
  );
}
