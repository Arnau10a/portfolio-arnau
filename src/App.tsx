import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Context & Visual Layers
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import Experience from './components/Experience';

// Components & Sections
import Layout from './components/Layout';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import BentoGrid from './components/BentoGrid';
import Footer from './components/Footer';

// Pages
import Laboratory from './pages/Laboratory';
import ProjectDetail from './pages/ProjectDetail';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TechStack />
      <BentoGrid />
      <Footer />
    </>
  );
};

function App() {
  return (
    <CursorProvider>
      <Experience />
      <Router>
        <CustomCursor />
        <Routes>
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="project/:id" element={<ProjectDetail />} />
          </Route>
        </Routes>
      </Router>
      <SpeedInsights />
      <Analytics />
    </CursorProvider>
  );
}

export default App;
