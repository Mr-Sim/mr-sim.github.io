import React from 'react';
import { AccordionProvider } from './AccordionContext';
import { AccordionSection } from './AccordionSection';
import { sections } from './sections';
import { useAccordionLogic } from './useAccordionLogic';

export function AccordionContainer() {
  const { expandedIndex, handleToggle } = useAccordionLogic(sections.length);


  
  return (
    <AccordionProvider expandedIndex = { expandedIndex }>
      <div className="h-screen flex flex-col">
        {sections.map((section, index) => (
          <AccordionSection
            key={index}
            title={section.title}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
            backgroundColor={section.backgroundColor}
            countdownTime={index*0.5+1}
          >
            {section.content}
          </AccordionSection>
        ))}
      </div>
    </AccordionProvider>
  );
}