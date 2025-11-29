import React from 'react';
import ScrollReveal from './ScrollReveal';
import ProjectPanel, { type ProjectData } from './ProjectPanel';

// --- AUTO-LOAD LOGIC ---
const images = import.meta.glob('../assets/LogosFury/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

// Extract all image URLs
const logosFuryImages = Object.values(images) as string[];

// Create the single LogosFury project
const logosFuryProject: ProjectData = {
  id: 1,
  title: 'LOGOS FURY',
  category: 'WEBGL EXPERIENCE & 3D ART',
  image: logosFuryImages[0], // Fallback/Main image
  images: logosFuryImages,   // All images for the slider
  year: '2025',
  description: 'An interactive generative art piece exploring fluid dynamics in real-time. This project pushes the boundaries of WebGL performance.',
  techStack: ['react', 'three', 'webgl'],
  visualHook: undefined,
  modelUrl: '/fury_gold.glb'
};

const displayProjects = [logosFuryProject];

const ProjectGrid: React.FC = () => {
  return (
    <section id="work" className="w-full py-24 px-6 md:px-12">
      <div className="w-full">
        <ScrollReveal width="100%">
          <h2 className="text-4xl md:text-6xl font-bold mb-24 tracking-tighter text-center md:text-left mix-blend-difference text-white">
            {displayProjects.length > 0 ? 'SELECTED WORK' : 'FEATURED PROJECTS'}
          </h2>
        </ScrollReveal>

        <div className="flex flex-col space-y-12">
          {displayProjects.map((project, index) => (
            <ScrollReveal 
              key={project.id} 
              delay={index * 0.1} 
              width="100%"
            >
              <ProjectPanel project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
