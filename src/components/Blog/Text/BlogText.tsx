import React from 'react';

interface BlogTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'quote';
  children: React.ReactNode;
  className?: string;
}

export function BlogText({ variant = 'body', children, className = '' }: BlogTextProps) {
  const styles = {
    h1: 'text-4xl md:text-5xl font-bold mb-8',
    h2: 'text-3xl md:text-4xl font-bold mb-6',
    h3: 'text-2xl md:text-3xl font-bold mb-4',
    body: 'text-lg leading-relaxed mb-6',
    quote: 'text-xl italic border-l-4 border-white/20 pl-6 my-8'
  };

  // Map variants to proper HTML elements
  const elements = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    quote: 'blockquote'
  } as const;

  const Component = elements[variant];
  
  return (
    <Component className={`${styles[variant]} text-white/90 ${className}`}>
      {children}
    </Component>
  );
}