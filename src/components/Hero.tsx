import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useCursor } from '../context/CursorContext';
import DecryptedText from './DecryptedText';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* 3D Background */}
      {/* 3D Background - Moved to App.tsx for global parallax */}

      {/* Overlay Content */}
      <div className="z-10 text-center mix-blend-difference px-4">
        <ScrollReveal width="100%" delay={0.2}>
          <div 
            className="relative cursor-default"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
             <DecryptedText 
              text="ARNAU GARCIA"
              speed={30}
              className="text-8xl md:text-[12rem] font-[100] tracking-tighter mb-4 text-white leading-none hover:font-[900] transition-all duration-700"
              characters="ARNAUGARCIA1234567890"
            />
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
