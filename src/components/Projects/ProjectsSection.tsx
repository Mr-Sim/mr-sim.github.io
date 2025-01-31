import React, { useState } from 'react';
import { ProjectGrid } from './ProjectGrid';
import { projects } from './projectsData';
import { Project } from './types';
import { ProjectPanel } from './ProjectPanel';


export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="relative h-full">
      {/* Content */}
      <div className="h-full p-4 md:p-6 overflow-y-auto">
        <ProjectGrid projects={projects} onViewProject={handleViewProject}/>
      </div>

      {/* Project details panel */}
      <ProjectPanel 
        project={selectedProject}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
}