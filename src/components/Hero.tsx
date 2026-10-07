import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowDown, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between items-center px-6 md:px-14 pt-28 pb-10 select-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 border-b border-white/[0.08] pb-4 z-10 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">SYS_STATUS: ACTIVE</span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-400">BARCELONA, ES</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <Terminal size={12} className="text-[#e5a93c]" />
          <span>SPEC: C++ · UNITY XR · PYTORCH · ROS</span>
        </div>
      </div>

      <motion.div 
        style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
        className="my-auto text-left sm:text-center w-full max-w-6xl z-10 flex flex-col items-start sm:items-center justify-center py-8"
      >
        <div 
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
          className="w-full"
        >
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-[-0.035em] leading-[0.88] text-white"
            style={{ 
              fontSize: 'clamp(3.2rem, 12.5vw, 10.5rem)',
              fontFamily: 'var(--font-syne)'
            }}
          >
            ARNAU GARCIA
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-2xl text-left sm:text-center space-y-3"
        >
          <div className="inline-block text-[11px] font-mono tracking-[0.25em] text-[#e5a93c] uppercase font-semibold">
            Software & XR Systems Engineer
          </div>
          <p className="text-sm sm:text-base text-slate-300 font-sans font-light leading-relaxed">
            Construyo motores de simulación háptica, pipelines de percepción robótica en C++ y arquitecturas de telemetría biométrica en tiempo real para cascos de Realidad Extendida.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8"
        >
          <a
            href="#projects"
            className="btn-tech"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Explorar Sistemas</span>
            <span className="text-[#e5a93c]">↓</span>
          </a>
          <a
            href="#contact"
            className="btn-tech !bg-transparent border-white/20 hover:border-slate-300"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Contacto Técnico</span>
          </a>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-500 pt-4 border-t border-white/[0.06] z-10">
        <span>LOC: 41.3879° N, 2.1699° E</span>
        <a 
          href="#projects" 
          aria-label="Scroll down to projects"
          className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
        >
          <span>SCROLL MATRIX</span>
          <ArrowDown size={11} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
