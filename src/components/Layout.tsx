import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const Layout: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { setCursorVariant } = useCursor();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen w-full text-neutral-200 relative bg-black">
      {/* Top subtle scroll progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-white origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 md:px-20 py-5 flex justify-between items-center bg-black/70 backdrop-blur-md border-b border-neutral-900">
        <Link 
          to="/" 
          className="text-sm font-semibold tracking-tight text-white hover:text-neutral-300 transition-colors"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          Arnau Garcia
        </Link>

        <div 
          className="flex items-center gap-6 sm:gap-8 text-xs text-neutral-400 font-mono"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {isHome ? (
            <>
              <a href="#projects" className="hover:text-white transition-colors">Work</a>
              <a href="#tech-stack" className="hover:text-white transition-colors">Stack</a>
              <Link to="/laboratory" className="text-neutral-300 hover:text-white transition-colors">
                Lab
              </Link>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">← Overview</Link>
          )}
        </div>
      </nav>
      
      <main className="w-full pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
