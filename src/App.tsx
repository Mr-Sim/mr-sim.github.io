import React from 'react';
import { AccordionContainer } from './components/Accordion/AccordionContainer';
import { PositionProvider } from './components/Canvas/PositionContext';
import { MouseProvider } from './components/Canvas/MouseContext';
import { LagProvider } from './components/Canvas/debug/LagContext';

function App() {
  return (
    <PositionProvider>
      <MouseProvider>
        <LagProvider>
          <div className="h-screen overflow-hidden">
            <AccordionContainer />
          </div>
        </LagProvider>
      </MouseProvider>
    </PositionProvider>
  );
}

export default App;