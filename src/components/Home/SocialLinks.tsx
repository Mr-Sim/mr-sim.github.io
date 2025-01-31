import React from 'react';
import { Download, Github, Gamepad2, Linkedin, Mail } from 'lucide-react';
import { SocialChip } from './SocialChip';

const CV_URL = 'https://drive.google.com/uc?export=download&id=1zJqBkTYHvVCFMJrnkiLGYyZCWAXLQolu';

interface SocialLinksProps {
  onEmailClick: () => void;
}

export function SocialLinks({ onEmailClick }: SocialLinksProps) {
  const handleDownloadCV = () => {
    window.open(CV_URL, '_blank');
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 pointer-events-auto">
      <SocialChip
        icon={Download}
        text="Télécharger mon CV"
        onClick={handleDownloadCV}
        className="bg-blue-500/50 hover:bg-blue-500/80"
      />
      <SocialChip
        icon={Linkedin}
        text="LinkedIn"
        href="https://www.linkedin.com/in/simon-catanese-0a6069235/"
        className="bg-[#0077b5]/50 hover:bg-[#0077b5]/80"
      />
      <SocialChip
        icon={Github}
        text="GitHub"
        href="https://github.com/Mr-Sim"
        className="bg-gray-500/50 hover:bg-gray-500/80"
      />
      <SocialChip
        icon={Gamepad2}
        text="Itch.io"
        href="https://mr-sim.itch.io/"
        className="bg-[#fa5c5c]/50 hover:bg-[#fa5c5c]/80"
      />
      <SocialChip
        icon={Mail}
        text="Contact"
        onClick={onEmailClick}
        className="bg-emerald-500/50 hover:bg-emerald-500/80"
      />
    </div>
  );
}