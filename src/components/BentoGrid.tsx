import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { projectsData, type EngineeringProject } from '../data/projectsData';

const PhysicsCard: React.FC<{ project: EngineeringProject; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useCursor();

  // Motion physics values for 3D tilt and floating response
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics config
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative w-full rounded-2xl p-[1px] bg-gradient-to-b from-white/10 via-white/[0.04] to-transparent hover:from-white/20 transition-all duration-500"
    >
      <div 
        className="relative h-full w-full rounded-2xl bg-[#080808]/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-white/[0.04]"
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Subtle hover glow accent matching project accent */}
        <div 
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-[90px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: project.accent }}
        />

        {/* Top bar: Number & Field */}
        <div>
          <div className="flex items-center justify-between pb-6 text-xs font-mono">
            <span className="text-neutral-500 tracking-widest">{project.num} // {project.year}</span>
            <span 
              className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]"
              style={{ color: project.accent }}
            >
              {project.field}
            </span>
          </div>

          {/* Minimal cinematic image preview */}
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-neutral-900 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            
            {/* Quick metric tag over image */}
            <div className="absolute bottom-3 left-3 text-[11px] font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
              <span className="text-white font-semibold">{project.metrics[0].label}:</span> {project.metrics[0].value}
            </div>
          </div>

          {/* Project Title & Short Subtitle */}
          <h3 
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 group-hover:text-amber-100 transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 font-light line-clamp-2 leading-relaxed mb-6">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Actions: Deep Dive Link & Source Code */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 max-w-[65%]">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-neutral-400">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="p-2 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                title="View Source Code"
              >
                <Github size={14} />
              </a>
            )}

            {/* Click to open full subpage */}
            <Link
              to={`/project/${project.id}`}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-white px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black transition-all group/link"
            >
              <span>Explore</span>
              <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="relative w-full py-28 px-6 md:px-12 bg-[#030303] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Minimal Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-3">
              Case Studies & Artifacts
            </span>
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Featured Work
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 font-mono max-w-sm">
            Interactive physical cards. Hover to tilt; select any system for complete technical specifications.
          </p>
        </div>

        {/* Floating Physics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {projectsData.map((project, index) => (
            <PhysicsCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
