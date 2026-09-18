import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowDown } from 'lucide-react';

interface MagneticLetterProps {
  letter: string;
  letterVariants: any;
}

const MagneticLetter: React.FC<MagneticLetterProps> = ({ letter, letterVariants }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    let mouseX = -1000;
    let mouseY = -1000;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateMagnetism = () => {
      if (spanRef.current && window.scrollY < window.innerHeight * 0.8) {
        const rect = spanRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.hypot(dx, dy);

        // Attraction threshold radius
        const magnetRadius = 150;
        if (distance < magnetRadius && distance > 0) {
          const power = Math.pow((magnetRadius - distance) / magnetRadius, 1.5);
          // Magnetic pull force toward mouse cursor
          const pullX = (dx / distance) * power * 38;
          const pullY = (dy / distance) * power * 38;

          setOffset((prev) => ({
            x: prev.x + (pullX - prev.x) * 0.22,
            y: prev.y + (pullY - prev.y) * 0.22,
          }));
        } else {
          // Elastic recovery to rest position
          setOffset((prev) => {
            if (Math.abs(prev.x) < 0.05 && Math.abs(prev.y) < 0.05) return { x: 0, y: 0 };
            return {
              x: prev.x * 0.82,
              y: prev.y * 0.82,
            };
          });
        }
      } else {
        setOffset({ x: 0, y: 0 });
      }

      animId = requestAnimationFrame(updateMagnetism);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(updateMagnetism);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <motion.span
      ref={spanRef}
      variants={letterVariants}
      className="inline-block origin-bottom transform-gpu will-change-transform"
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.04s ease-out',
      }}
    >
      {letter}
    </motion.span>
  );
};

const Hero: React.FC = () => {
  const { setCursorVariant } = useCursor();

  const name = "ARNAU GARCIA";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6">
      {/* Subtle Ambient Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />

      {/* Editorial Top Status */}
      <div className="absolute top-28 left-6 md:left-12 font-mono text-[11px] text-gray-500 tracking-[0.2em] uppercase hidden md:flex items-center gap-3 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>BARCELONA, ES / OPEN TO SELECTIVE ROLES</span>
      </div>
      
      <div className="absolute top-28 right-6 md:right-12 font-mono text-[11px] text-gray-500 tracking-[0.2em] uppercase hidden md:flex items-center gap-2 pointer-events-none">
        <span>SOFTWARE & XR SYSTEMS</span>
      </div>

      {/* Hero Body Content */}
      <div className="z-10 text-center w-full max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
          className="perspective-[1000px] inline-block select-none"
        >
          <h1 
            className="font-black tracking-tight leading-[0.8] text-white flex flex-wrap justify-center gap-x-6 sm:gap-x-10 cursor-default"
            style={{ 
              fontSize: 'clamp(3.5rem, 11vw, 9rem)', 
              fontFamily: 'var(--font-syne)',
            }}
          >
            {name.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex overflow-visible py-3">
                {word.split("").map((letter, letterIndex) => (
                  <MagneticLetter
                    key={letterIndex}
                    letter={letter}
                    letterVariants={letterVariants}
                  />
                ))}
              </span>
            ))}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center gap-5 mt-8"
        >
          <p className="text-xs md:text-sm text-gray-300 uppercase tracking-[0.4em] font-mono font-medium">
            Creative Technologist & Software Systems Engineer
          </p>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.25em] text-gray-400 font-mono">
            <span className="text-gray-300">Spatial Computing</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">Robotics Vision</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">Reinforcement Learning</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer"
        onMouseEnter={() => setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant('default')}
        onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-mono font-medium">
          Case Studies
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:border-white/40 transition-colors"
        >
          <ArrowDown size={11} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
