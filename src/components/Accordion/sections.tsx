import React from 'react';
import { Section } from './types';
import { ProjectsSection } from '../Projects/ProjectsSection';
import { HomeSection } from '../Home/HomeSection';
import { BlogContent } from '../Blog/BlogContent';

export const sections: Section[] = [
  {
    title: 'Accueil',
    backgroundColor: '#1a365d',
    content: <HomeSection />,
  },
  {
    title: 'Projets',
    backgroundColor: '#2c5282',
    content: <ProjectsSection/>,
  },
  {
    title: 'À propos de moi',
    //backgroundColor: '#3182ce',
    backgroundColor: '#2D5C9F',
    content: <BlogContent />,
  },
];