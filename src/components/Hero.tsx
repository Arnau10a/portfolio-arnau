import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-32 pb-12 select-none max-w-7xl mx-auto">
      {/* Top minimal metadata */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
        <span className="flex items-center gap-2 text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Available for software engineering roles
        </span>
        <span className="hidden sm:inline">Barcelona, Spain</span>
      </div>

      {/* Main headline and focus statement */}
      <div className="my-auto py-12 space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
          className="space-y-3"
        >
          <h1 
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Arnau Garcia Parise
          </h1>
          <p className="text-lg sm:text-2xl font-mono text-neutral-300 font-medium tracking-tight">
            Computer Engineer <span className="text-neutral-500 font-normal">| Real-Time 3D, High-Performance C++ & Applied AI</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-neutral-400 font-light leading-relaxed max-w-3xl"
        >
          Specialized in real-time engine systems, industrial 3D optimization, and local embedded AI pipelines. Based in Barcelona, Spain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 pt-3"
        >
          <a
            href="/cv.pdf"
            download="Arnau_Garcia_Parise_CV.pdf"
            className="btn-linear"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Download CV (PDF)</span>
            <Download size={13} className="text-neutral-300" />
          </a>
          <a
            href="#projects"
            className="btn-linear !bg-transparent border-neutral-800 text-neutral-300 hover:text-white"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Selected work</span>
            <ArrowDown size={13} className="text-neutral-400" />
          </a>
          <a
            href="#contact"
            className="btn-linear !bg-transparent border-neutral-800 text-neutral-300 hover:text-white"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Contact</span>
            <ArrowUpRight size={13} className="text-neutral-500" />
          </a>
        </motion.div>
      </div>

      {/* Subtle bottom footer bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-6 border-t border-neutral-900 font-mono">
        <span>C++ · Unity · llama.cpp · USearch · ROS 2</span>
        <a 
          href="#projects" 
          aria-label="Scroll to projects"
          className="hover:text-neutral-300 transition-colors hidden sm:inline"
        >
          Scroll to explore ↓
        </a>
      </div>
    </section>
  );
};

export default Hero;
