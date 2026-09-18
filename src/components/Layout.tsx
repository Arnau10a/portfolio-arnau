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
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-[100]"
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
          className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-mono text-gray-400"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {isHome ? (
            <>
              <a href="#projects" className="hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(0,242,255,0.3)]">Projects</a>
              <Link to="/laboratory" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Laboratory
              </Link>
            </>
          ) : (
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
          )}
        </div>
      </nav>
      
      <main className="w-full pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

