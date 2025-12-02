import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useCursor } from '../context/CursorContext';
import LiquidHover from './LiquidHover';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* 3D Background */}
      {/* 3D Background - Moved to App.tsx for global parallax */}

      {/* Overlay Content */}
      <div className="z-10 text-center mix-blend-difference w-full">
        <ScrollReveal width="100%" delay={0.2}>
          <div 
             className="relative cursor-default w-full"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
             <LiquidHover />
          </div>
        </ScrollReveal>
        <ScrollReveal width="100%" delay={0.4}>
          <p className="text-lg md:text-xl text-secondary uppercase tracking-[0.5em]">
            Creative Developer & 3D Artist
          </p>
        </ScrollReveal>
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
