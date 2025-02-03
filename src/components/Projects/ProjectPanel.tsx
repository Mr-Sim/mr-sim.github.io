import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Project } from './types';
import { IKImage } from 'imagekitio-react';

interface ProjectPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectPanel({ project, isOpen, onClose }: ProjectPanelProps) {

  useEffect(() => {
    const handleBackButton = () => {
      if (isOpen) {
        onClose();
        return;
      }
    };
  
    if (isOpen) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handleBackButton);
    }
  
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-500 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-screen overflow-y-auto bg-gray-900 transform 
          transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
          ${project ? 'visible' : 'invisible'}
          md:w-2/3 w-full`}
      >
        {project && (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="h-full pt-16">
              <div 
                className={`p-8 transition-all duration-500 transform
                  ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                style={{
                  transitionDelay: isOpen ? '150ms' : '0ms'
                }}
              >
                <IKImage
                  decoding="async"
                  loading="lazy"
                  src={project.imageUrl} 
                  width='1000'
                  alt={project.title}
                  className="w-full h-80 object-cover rounded-lg mb-8"
                />
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  {project.title}&nbsp;&nbsp;
                  <span className="text-xs text-white/50 self-center">
                    {project.date} | {project.time}
                  </span>
                </h2> 
                
                {/* Render detailed description as HTML with proper styling */}
                <div className="rich-content mb-8 text-white/90">
                  {project.detailedDescription && project.detailedDescription()}
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies?.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-white/10 rounded-full text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-4">Liens</h3>
                    <div className="flex gap-4">
                      {project.UrlsTitles.map((title, index) => (
                        <a
                          key={index}
                          href={project.Urls[index]}
                          target="_blank"
                          rel="external noreferrer"
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                        >
                          {title}
                        </a>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}