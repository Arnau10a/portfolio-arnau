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
    <div className="min-h-screen w-full text-white relative bg-[#030303]">
      
      {/* Top scroll progress indicator bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-stone-400 via-amber-200 to-stone-300 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-[#030303]/10 backdrop-blur-md border-b border-white/[0.03]">
        <div 
          className="flex items-center gap-3"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <Link to="/" className="text-xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-xs tracking-widest uppercase rounded">AG</span>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-mono hidden sm:inline">// Portfolio</span>
          </Link>
        </div>

        <div 
          className="flex items-center gap-6 md:gap-8 text-[11px] uppercase tracking-[0.2em] font-mono text-gray-400"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {isHome ? (
            <>
              <a href="#tech-stack" className="hover:text-white transition-colors">Stack</a>
              <a href="#projects" className="hover:text-white transition-colors">Systems</a>
              <Link to="/laboratory" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Laboratory
              </Link>
              <a href="#contact" className="hover:text-white transition-colors hidden sm:inline">Contact</a>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
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

