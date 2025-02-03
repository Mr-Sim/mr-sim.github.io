import React from 'react';
import { Project } from './types';
import { TechChip } from './TechChip';
import { useAccordionContext } from '../Accordion/AccordionContext';
import { IKImage } from 'imagekitio-react';
import { isMobileDevice } from '../Canvas/utils/deviceDetection';

interface ProjectGridProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
  isExpanded: boolean;
}

export function ProjectGrid({ projects, onViewProject }: ProjectGridProps) {
  const { expandedIndex } = useAccordionContext();
  // Vérifiez si l'index étendu est 2
  const isAccordionExpanded = expandedIndex === 1;
  
  return (
    <div
    className={`grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 transition-[margin] duration-300 ease-in-out ${
      isAccordionExpanded  ? "mt-20" : "mt-n10"
    }`}
    >
      {projects.map((project, index) => (
        <div
          key={index}
          className="group bg-black/15 rounded-lg overflow-hidden flex flex-col 
            transform transition-all hover:scale-[1.02] hover:bg-white/10"
        >
          {/* Image container */}
          <div 
            onClick={() => onViewProject(project)}
            className="relative aspect-square md:aspect-video w-full overflow-hidden cursor-pointer"
          >
            <IKImage
              decoding="async"
              src={project.imageUrl} 
              alt={project.title}
              transformation={[{
                width: isMobileDevice() ? 400 : 500
              }]}
              className="absolute inset-0 w-full h-full object-cover transition-transform 
                duration-500 group-hover:scale-110 scale-[1.15] md:scale-100"
            />

            {/* Mobile overlay - Only visible on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
              opacity-60 group-hover:opacity-80 transition-opacity duration-300 md:hidden" />
            
            {/* Mobile title - Only visible on mobile */}
            <div className="absolute inset-x-0 bottom-0 p-3 md:hidden">
              <h3 className="text-white group-hover:text-white/90 transition-colors
                font-medium leading-tight break-words text-sm">
                {project.title}&nbsp;&nbsp;
                <span className="inline-block text-xs text-white/50 self-center">
                  {project.date}
                </span>
              </h3>
            </div>
          </div>

          {/* Desktop content container - Only visible on desktop */}
          <div className="hidden md:flex flex-col flex-grow p-4">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {project.title}
              </h3>
              <div className="flex flex-wrap gar-1.5">
                <span className="text-xs text-white/50 self-center">
                  {project.date} | {project.time}
                </span>
              </div>
              <p className="text-sm text-white/70 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies?.slice(0, 3).map((tech, index) => (
                  <TechChip key={index} technology={tech} />
                ))}
                {project.technologies && project.technologies.length > 3 && (
                  <span className="text-xs text-white/50 self-center">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onViewProject(project)}
              className="w-full mt-4 py-2 px-4 bg-black/15 hover:bg-black/25 
                text-white rounded-md transition-colors text-sm
                transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View Project
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}