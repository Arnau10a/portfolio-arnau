import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  image: string; // Placeholder for now
}

const projects: Project[] = [
  { id: 1, title: 'Neon Genesis', category: 'WebGL Experience', size: 'large', image: 'bg-zinc-800' },
  { id: 2, title: 'Void Walker', category: 'Interactive 3D', size: 'medium', image: 'bg-zinc-900' },
  { id: 3, title: 'Cyber Punk', category: 'Motion Graphics', size: 'small', image: 'bg-neutral-800' },
  { id: 4, title: 'Ethereal', category: 'Creative Coding', size: 'medium', image: 'bg-stone-900' },
  { id: 5, title: 'Flux', category: 'Generative Art', size: 'small', image: 'bg-slate-900' },
];

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
          SELECTED WORK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className={`relative group overflow-hidden rounded-2xl border border-white/5 ${
                project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                project.size === 'medium' ? 'md:col-span-2 md:row-span-1' :
                'md:col-span-1 md:row-span-1'
              } ${project.image}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                <p className="text-sm text-secondary uppercase tracking-wider">{project.category}</p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
