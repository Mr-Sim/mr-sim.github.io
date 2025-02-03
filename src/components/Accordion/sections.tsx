import React from 'react';
import { Section } from './types';
import { ProjectsSection } from '../Projects/ProjectsSection';
import { HomeSection } from '../Home/HomeSection';
import { BlogContent } from '../Blog/BlogContent';

export const sections: Section[] = [
  {
    title: 'Accueil',
    backgroundColor: '#1B375F',//'#1a365d',
    content: <HomeSection />,
  },
  {
    title: 'Projets',
    backgroundColor: '#204F89',//#2c5282',
    content: <ProjectsSection/>,
  },
  {
    title: 'À propos de moi',
    //backgroundColor: '#3182ce',
    backgroundColor: '#2D5DA0',
    content: <BlogContent />,
  },
];