import React from 'react';

import ScrollReveal from './ScrollReveal';
import { useCursor } from '../context/CursorContext';

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
            <h1 className="font-bold tracking-tighter leading-none whitespace-nowrap" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)', fontFamily: "'Syne', sans-serif" }}>ARNAU GARCIA</h1>
          </div>
        </ScrollReveal>
        <ScrollReveal width="100%" delay={0.4}>
          <p className="text-lg md:text-xl text-secondary uppercase tracking-[0.5em]">
            Creative Developer & 3D Artist
          </p>
        </ScrollReveal>
      </div>


    </section>
  );
};

export default Hero;
