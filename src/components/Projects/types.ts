export interface Project {
  title: string;
  date: string;
  time: string;
  description: string;
  detailedDescription: string; // HTML content for detailed view
  embedUrl: string;
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