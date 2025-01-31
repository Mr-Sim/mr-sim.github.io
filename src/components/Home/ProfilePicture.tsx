import React, { useRef } from 'react';
import { useElementPosition } from '../hooks/useElementPosition';

export function ProfilePicture() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useElementPosition(containerRef);

  return (
    <div 
      ref={containerRef}
      className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
    >
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20">
        <img 
          decoding="async" 
          src="https://drive.google.com/thumbnail?id=1mFSBJb0CLOB8VPY0MyrcimiArHbQIUvj"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}