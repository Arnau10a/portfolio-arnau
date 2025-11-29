import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ProjectGrid />
    </>
  );
};

import CustomCursor from './components/CustomCursor';

import { CursorProvider } from './context/CursorContext';

import Experience from './components/Experience';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CursorProvider>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <Experience />
      <Router>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Add more routes here if needed */}
          </Route>
        </Routes>
      </Router>
      <SpeedInsights />
      <Analytics />
    </CursorProvider>
  );
}

export default App;
