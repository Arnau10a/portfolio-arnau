import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background text-primary relative overflow-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter">AG</div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#work" className="hover:opacity-70 transition-opacity">WORK</a>
          <a href="#about" className="hover:opacity-70 transition-opacity">ABOUT</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">CONTACT</a>
        </div>
      </nav>
      
      <main className="w-full">
        <Outlet />
      </main>

      <footer className="w-full py-12 px-6 flex justify-between items-end border-t border-white/10 mt-20">
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
