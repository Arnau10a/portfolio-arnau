import React from 'react';
import { Outlet } from 'react-router-dom';
import { useCursor } from '../context/CursorContext';

const Layout: React.FC = () => {
  const { setCursorVariant } = useCursor();
  return (
    <div className="min-h-screen w-full text-primary relative overflow-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter">AG</div>
        <div className="flex gap-6 text-sm font-medium">
          <a 
            href="#work" 
            className="hover:opacity-70 transition-opacity"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            WORK
          </a>
          <a 
            href="#about" 
            className="hover:opacity-70 transition-opacity"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            ABOUT
          </a>
          <a 
            href="#contact" 
            className="hover:opacity-70 transition-opacity"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            CONTACT
          </a>
        </div>
      </nav>
      
      <main className="w-full">
        <Outlet />
      </main>

      <footer className="w-full py-12 px-6 flex justify-between items-end border-t border-white/20 mt-20 mix-blend-difference text-white">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter mb-2">Let's create together</h2>
          <p className="text-secondary">hello@arnaugarcia.com</p>
        </div>
        <div className="text-sm text-secondary">
          © {new Date().getFullYear()} Arnau Garcia
        </div>
      </footer>
    </div>
  );
};

export default Layout;
