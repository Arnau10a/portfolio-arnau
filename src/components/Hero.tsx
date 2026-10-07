import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

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
      <div className="my-auto py-12 space-y-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Arnau Garcia
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl text-neutral-400 font-light leading-relaxed max-w-2xl"
        >
          Software engineer focused on real-time systems, XR computing, autonomous robotics perception, and reinforcement learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <a
            href="#projects"
            className="btn-linear"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>View selected work</span>
            <ArrowDown size={13} className="text-neutral-400" />
          </a>
          <a
            href="#contact"
            className="btn-linear !bg-transparent border-neutral-800 text-neutral-300 hover:text-white"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Get in touch</span>
            <ArrowUpRight size={13} className="text-neutral-500" />
          </a>
        </motion.div>
      </div>

      {/* Subtle bottom footer bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-6 border-t border-neutral-900">
        <span>C++ · Unity XR · ROS · PyTorch</span>
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
