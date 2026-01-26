import React from 'react';
import { Outlet } from 'react-router-dom';


import SparklingBackground from './SparklingBackground';


const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-primary relative">
      <SparklingBackground />
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-xl font-bold tracking-tighter pointer-events-auto cursor-pointer">AG</div>
        <div className="flex gap-8 pointer-events-auto">
          {/* Add navigation links if needed */}
        </div>
      </nav>
      
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
