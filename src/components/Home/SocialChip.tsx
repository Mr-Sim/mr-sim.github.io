import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SocialChipProps {
  icon: LucideIcon;
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SocialChip({ icon: Icon, text, href, onClick, className = '' }: SocialChipProps) {
  const Component = href ? 'a' : 'button';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <Component
      {...props}
      className={`inline-flex items-center rounded-full 
        transition-all transform hover:scale-105 active:scale-95
        text-white/90 hover:text-white pointer-events-auto
        px-3 py-1.5 md:px-4 md:py-2 ${className}`}
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
      <span className="text-xs md:text-sm font-medium">{text}</span>
    </Component>
  );
}