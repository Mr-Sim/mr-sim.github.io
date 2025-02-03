import React from 'react';
import { Section } from './types';
import { ProjectsSection } from '../Projects/ProjectsSection';
import { HomeSection } from '../Home/HomeSection';
import { BlogContent } from '../Blog/BlogContent';

export const sections: Section[] = [
  {
    title: 'Accueil',
    backgroundColor: '#162E50',//'#1a365d',
    content: <HomeSection />,
  },
  {
    title: 'Projets',
    backgroundColor: '#1F4D84',//#2c5282',
    content: <ProjectsSection/>,
  },
  {
    title: 'À propos de moi',
    //backgroundColor: '#3182ce',
    backgroundColor: '#2D5DA0',
    content: <BlogContent />,
  },
];