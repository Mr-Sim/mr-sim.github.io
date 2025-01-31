import React from 'react';
import { Section } from './types';
import { ProjectsSection } from '../Projects/ProjectsSection';
import { HomeSection } from '../Home/HomeSection';
import { BlogContent } from '../Blog/BlogContent';

export const sections: Section[] = [
  {
    title: 'Home',
    backgroundColor: '#1a365d',
    content: <HomeSection />,
  },
  {
    title: 'Projects',
    backgroundColor: '#2c5282',
    content: <ProjectsSection/>,
  },
  {
    title: 'Bio',
    backgroundColor: '#3182ce',
    content: <BlogContent />,
  },
];