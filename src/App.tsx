import React, { useEffect, useState } from "react";
import { AccordionContainer } from './components/Accordion/AccordionContainer';
import { PositionProvider } from './components/Canvas/PositionContext';
import { MouseProvider } from './components/Canvas/MouseContext';
import { LagProvider } from './components/Canvas/debug/LagContext';
import { IKContext } from "imagekitio-react";




function useViewportHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight(); // Fixe la bonne hauteur au chargement

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return height;
}


function App() {
  const viewportHeight = useViewportHeight();

  return (
    <div style={{ height: viewportHeight, width: "100vw", overflow: "hidden" }}>
      <PositionProvider>
        <MouseProvider>
          <LagProvider>
            <IKContext urlEndpoint="https://ik.imagekit.io/mrsim/">
              <div className="h-screen overflow-hidden">
                <AccordionContainer />
              </div>
            </IKContext>
          </LagProvider>
        </MouseProvider>
      </PositionProvider>
    </div>
  );
}

export default App;