import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  element: HTMLElement;
}

interface ChapterNavigationProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export function ChapterNavigation({ contentRef }: ChapterNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<string>('');
  const panelRef = useRef<HTMLDivElement>(null);

  // Get all chapters from content
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll('h1, h2');
    const newChapters: Chapter[] = Array.from(headings).map((heading) => ({
      id: heading.id || `chapter-${Math.random().toString(36).substr(2, 9)}`,
      title: heading.textContent || '',
      element: heading as HTMLElement
    }));

    // Set IDs if they don't exist
    newChapters.forEach((chapter) => {
      if (!chapter.element.id) {
        chapter.element.id = chapter.id;
      }
    });

    setChapters(newChapters);
  }, [contentRef]);

  // Handle scroll to update active chapter
  useEffect(() => {
    if (!contentRef.current) return;

    const handleScroll = () => {
      const scrollPosition = contentRef.current?.scrollTop || 0;
      
      // Find the current chapter based on scroll position
      for (let i = chapters.length - 1; i >= 0; i--) {
        const chapter = chapters[i];
        if (chapter.element.offsetTop <= scrollPosition + 100) {
          setActiveChapter(chapter.id);
          break;
        }
      }
    };

    const contentElement = contentRef.current;
    contentElement.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => contentElement.removeEventListener('scroll', handleScroll);
  }, [chapters, contentRef]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToChapter = (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter && contentRef.current) {
      contentRef.current.scrollTo({
        top: chapter.element.offsetTop - 80, // Account for header
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="absolute inset-x-0 top-14 bottom-0 pointer-events-none">
      <div className="relative h-full max-w-10xl mx-auto px-4">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute pointer-events-auto p-3 rounded-full bg-white/10 
            hover:bg-white/20 text-white transition-all transform hover:scale-105 
            active:scale-95 backdrop-blur-sm md:top-4 md:left-4
            bottom-4 right-4 md:bottom-auto md:right-auto"
          aria-label="Toggle chapters menu"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Chapters panel */}
        <div
          ref={panelRef}
          className={`absolute pointer-events-auto bg-gray-900/95 backdrop-blur-sm 
            rounded-lg shadow-xl transition-all duration-300 transform
            md:top-16 md:left-4 bottom-20 right-4 md:bottom-auto md:right-auto
            w-64 overflow-hidden ${
            isOpen 
              ? 'opacity-100  pointer-events-auto translate-y-0' 
              : 'hidden opacity-0   pointer-events-none translate-y-2'
          }`}
        >
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3">Chapitres</h3>
            <nav className="space-y-1">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => scrollToChapter(chapter.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm 
                    transition-colors ${
                    activeChapter === chapter.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {chapter.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}