import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MessageSquare, Sparkles } from 'lucide-react';

interface FloatingNavProps {
  currentPath: string;
  onNavigateSection: (sectionId: string) => void;
  onNavigateRoute: (path: string) => void;
}

const SECTION_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const FloatingNav: React.FC<FloatingNavProps> = ({
  currentPath,
  onNavigateSection,
  onNavigateRoute,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCreative = currentPath === '/creative';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectSection = (id: string) => {
    setMenuOpen(false);
    onNavigateSection(id);
  };

  const handleSelectRoute = (path: string) => {
    setMenuOpen(false);
    onNavigateRoute(path);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-5 right-5 sm:top-7 sm:right-8 z-50 flex flex-col items-end gap-2.5"
    >
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => handleSelectRoute(isCreative ? '/' : '/creative')}
          className="inline-flex items-center gap-3 rounded-full bg-[#D9E0E3]/95 p-1.5 pl-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#0C1016] shadow-sm backdrop-blur-md transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <span>{isCreative ? 'Portfolio' : 'Creative Lab'}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0C1016]">
            {isCreative ? (
              <ArrowLeft size={13} strokeWidth={1.8} />
            ) : (
              <Sparkles size={13} strokeWidth={1.8} />
            )}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectSection('contact')}
          className="hidden sm:inline-flex items-center gap-3 rounded-full bg-[#D9E0E3]/95 p-1.5 pl-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#0C1016] shadow-sm backdrop-blur-md transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <span>Contact Arnau</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0C1016]">
            <MessageSquare size={13} strokeWidth={1.8} />
          </span>
        </button>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center gap-3 rounded-full bg-[#0C1016] p-1.5 pl-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <span>Menu</span>
          <span
            className="flex h-8 w-8 items-center justify-center gap-1 rounded-full bg-[#1E232C]"
            aria-hidden="true"
          >
            <span className="h-1 w-1 rounded-full bg-white" />
            <span className="h-1 w-1 rounded-full bg-white/65" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Primary navigation"
          className="w-52 rounded-2xl border border-white/10 bg-[#0C1016]/95 p-2 text-white shadow-xl backdrop-blur-md"
        >
          <ul className="flex flex-col gap-0.5">
            {SECTION_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSelectSection(item.id)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="mt-1 border-t border-white/10 pt-1">
              <button
                type="button"
                onClick={() => handleSelectRoute('/creative')}
                className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <span>Creative Lab</span>
                <Sparkles size={13} className="text-white/60" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
