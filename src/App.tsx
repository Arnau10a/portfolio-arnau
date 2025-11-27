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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
