import React from 'react';
import { motion } from 'framer-motion';

// --- AUTO-LOAD LOGIC ---
const images = import.meta.glob('../assets/renders/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  isPlaceholder?: boolean;
}

// 2. Generate project data from the loaded images
const loadedProjects: Project[] = Object.entries(images).map(([path, url], index) => {
  // Clean up filename to use as title
  const filename = path.split('/').pop()?.split('.')[0] || 'Untitled';
  const title = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    id: index,
    title: title,
    category: '3D Render',
    image: url as string,
  };
});

// Fallback placeholders
const placeholders: Project[] = [
  { id: 101, title: 'Add Your Renders', category: 'To src/assets/renders', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', isPlaceholder: true },
  { id: 102, title: 'Auto Discovery', category: 'Feature Enabled', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop', isPlaceholder: true },
  { id: 103, title: 'Just Drop Files', category: 'No Imports Needed', image: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=2670&auto=format&fit=crop', isPlaceholder: true },
  { id: 104, title: 'Vertical Test', category: 'Aspect Ratio', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', isPlaceholder: true },
];

const displayProjects = loadedProjects.length > 0 ? loadedProjects : placeholders;

const ProjectGrid: React.FC = () => {
  return (
    <section id="work" className="w-full py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-16 tracking-tighter"
        >
          {loadedProjects.length > 0 ? 'SELECTED WORK' : 'WAITING FOR RENDERS'}
        </motion.h2>

        {/* Masonry Layout using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className="relative group break-inside-avoid rounded-2xl overflow-hidden border border-white/5 bg-zinc-900"
            >
              {/* Image - Relative so it defines height */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-xl font-bold mb-1 text-white">{project.title}</h3>
                <p className="text-xs text-gray-300 uppercase tracking-wider">{project.category}</p>
              </div>

              {/* Subtle border overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
