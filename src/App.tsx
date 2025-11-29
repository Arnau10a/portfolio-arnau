import React from 'react';
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

function App() {
  return (
    <CursorProvider>
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
    </CursorProvider>
  );
}

export default App;
