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
    <div className="min-h-screen w-full text-slate-100 relative bg-[#050505]">
      {/* Top scroll progress indicator bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#e5a93c] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-14 py-4 flex justify-between items-center bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div 
          className="flex items-center gap-3"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <Link to="/" className="text-base font-bold tracking-tight text-white flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-[11px] font-mono tracking-widest uppercase rounded-[2px]">AG</span>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono hidden sm:inline">Arnau Garcia</span>
          </Link>
        </div>

        <div 
          className="flex items-center gap-5 sm:gap-7 text-[11px] uppercase tracking-[0.2em] font-mono text-slate-400"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {isHome ? (
            <>
              <a href="#tech-stack" className="hover:text-white transition-colors">Stack</a>
              <a href="#projects" className="hover:text-white transition-colors">Sistemas</a>
              <Link to="/laboratory" className="text-[#e5a93c] hover:text-amber-200 transition-colors flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] animate-pulse" />
                Laboratorio
              </Link>
              <a href="#contact" className="hover:text-white transition-colors hidden sm:inline">Contacto</a>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">← Inicio</Link>
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
