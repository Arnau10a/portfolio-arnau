import React from 'react';
import { Outlet } from 'react-router-dom';


import SparklingBackground from './SparklingBackground';

const Layout: React.FC = () => {
  return (
    <div className="h-screen w-full text-primary relative overflow-hidden">
      <SparklingBackground />
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter">AG</div>
      </nav>
      
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
