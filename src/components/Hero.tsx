import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen h-[100dvh] w-full flex flex-col justify-between items-center px-6 md:px-12 pt-20 sm:pt-24 pb-6 md:pb-8 overflow-hidden select-none"
    >
      {/* Subtle organic light accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[800px] h-[350px] bg-gradient-to-r from-amber-200/10 via-white/5 to-orange-200/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top minimal status */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono z-10 shrink-0"
      >
        <span>BARCELONA, ES</span>
        <span className="text-neutral-500 hidden sm:inline">//</span>
        <span>SOFTWARE & AI SYSTEMS</span>
      </motion.div>

      {/* Hero Core: Big AAA Typography */}
      <motion.div 
        style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
        className="my-auto text-center w-full z-10 flex flex-col items-center justify-center"
      >
        {/* Name in HUGE cinematic luxury scale */}
        <div 
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
          className="overflow-hidden py-1 sm:py-2"
        >
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1
            }}
            className="font-black tracking-[-0.04em] leading-[0.85] text-white"
            style={{ 
              fontSize: 'clamp(3.5rem, 13.5vw, 11rem)',
              fontFamily: 'var(--font-syne)'
            }}
          >
            ARNAU GARCIA
          </motion.h1>
        </div>

        {/* Philosophical Statement on Artificial Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mt-4 sm:mt-6 px-4"
        >
          <p className="text-sm sm:text-lg md:text-xl text-neutral-300 font-light italic tracking-tight leading-snug">
            “Intelligence is not about imitating human thought, but giving matter the ability to reason.”
          </p>
          <span className="block mt-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-mono">
            Software Engineer · Autonomous Systems & Real-Time Computing
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom Minimal Essential Controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full flex items-center justify-between text-xs font-mono z-10 pt-3 border-t border-white/[0.06] shrink-0"
      >
        <div className="flex items-center gap-3">
          <a
            href="mailto:parise.garcia@gmail.com"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
            className="text-neutral-400 hover:text-white transition-colors tracking-widest uppercase text-[10px] sm:text-[11px]"
          >
            parise.garcia@gmail.com
          </a>
        </div>

        <button
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-[11px] group"
        >
          <span>Selected Work</span>
          <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
