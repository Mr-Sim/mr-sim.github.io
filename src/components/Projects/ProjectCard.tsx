import React from 'react';
import { ProjectCardProps } from './types';
import { TechChip } from './TechChip';
import { IKImage } from 'imagekitio-react';

export function ProjectCard({ project, onViewProject }: ProjectCardProps) {
  return (
    <div className="h-full bg-white/5 rounded-lg overflow-hidden flex flex-col 
      transform transition-all hover:scale-[1.02] hover:bg-white/10">
      {/* Image container with fixed aspect ratio */}
      <div 
        onClick={() => onViewProject(project)}
        className="relative aspect-video w-full overflow-hidden cursor-pointer"
      >
        <IKImage
          decoding="async"
          src={project.imageUrl} 
          width='450'
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform 
            duration-500 hover:scale-110"
          loading="lazy"
        />

      </div>

      {/* Content container */}
      <div className="flex flex-col flex-grow p-4 md:p-6">
        <div className="flex-grow">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2 line-clamp-1">
            {project.title}
          </h3>
          <div className="flex flex-wrap gar-1.5">
            <span className="text-xs text-white/75 self-center">
              {project.date} | {project.time}
            </span>
          </div>
          
          <p className="text-sm md:text-base text-white/70 mb-4 line-clamp-3">
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
          className="w-full mt-4 py-2 md:py-3 px-4 bg-white/10 hover:bg-white/20 
            text-white rounded-md transition-colors text-sm md:text-base
            transform hover:scale-[1.02] active:scale-[0.98]"
        >
          View Project
        </button>
      </div>
    </div>
  );
}