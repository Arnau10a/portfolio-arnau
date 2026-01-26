import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();
  
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Cinematic Content */}
      <div className="z-10 text-center mix-blend-difference w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <h1 
            className="font-extrabold tracking-tighter leading-[0.8] mb-4" 
            style={{ 
              fontSize: 'clamp(4rem, 15vw, 16rem)', 
              fontFamily: "'Syne', sans-serif",
              textTransform: 'uppercase'
            }}
          >
            ARNAU<br />GARCIA
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-sm md:text-base text-gray-400 uppercase tracking-[0.6em] font-sans">
            Creative Technologist & XR Engineer
          </p>
          
          <div className="flex gap-8 mt-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <span>Engineering</span>
            <span>Design</span>
            <span>Art</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} className="text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
