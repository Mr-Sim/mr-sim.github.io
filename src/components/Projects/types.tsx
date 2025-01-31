import React, { ReactNode } from 'react';

export interface Project {
  title: string;
  date: string;
  time: string;
  description: string;
  detailedDescription: string | (() => ReactNode)
  imageUrl: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  UrlsTitles?: string[];
  Urls?: string[];
}

export interface ProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
}