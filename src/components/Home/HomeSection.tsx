import React, { useState } from 'react';
import { ProfilePicture } from './ProfilePicture';
import { SocialLinks } from './SocialLinks';
import { CanvasCarousel } from '../Canvas/carousel/CanvasCarousel';
import { EmailModal } from './EmailModal';

const EMAIL = 'simoncatanese.pro@gmail.com';
const PHONE = '+33 7 68 05 68 62';

export function HomeSection() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <div className="relative h-full">
      {/* Canvas background with proper z-index */}
      <div className="absolute inset-0 z-0">
        <CanvasCarousel backgroundColor="#1a365d" />
      </div>
      
      {/* Content with higher z-index and pointer-events-none */}
      <div className="relative z-10 h-full pointer-events-none">
        <div className="h-full flex flex-col items-center justify-center space-y-4 p-6">
          <ProfilePicture />
          
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Simon Catanese</h1>
            <p className="text-xl md:text-2xl text-white/80">Développeur de jeux vidéo</p>
          </div>

          <SocialLinks onEmailClick={() => setIsEmailModalOpen(true)} />
        </div>
      </div>

      {/* Modal outside of pointer-events-none container */}
      <EmailModal
        email={EMAIL}
        phone={PHONE}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}