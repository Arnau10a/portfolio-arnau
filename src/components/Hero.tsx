import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* 3D Background */}
      {/* 3D Background - Moved to App.tsx for global parallax */}

      {/* Overlay Content */}
      <div className="z-10 text-center mix-blend-difference px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-none"
          style={{ fontSize: '15vw', WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          ARNAU GARCIA
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-secondary uppercase tracking-[0.5em]"
        >
          Creative Developer & 3D Artist
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-secondary tracking-widest"
      >
        SCROLL TO EXPLORE
      </motion.div>
    </section>
  );
};

export default Hero;
