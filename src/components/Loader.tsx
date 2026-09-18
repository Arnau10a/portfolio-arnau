import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';

interface LoaderProps {
  onFinished?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinished }) => {
  const { active, progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Determine real target progress (if 3D scene finished loading, target 100)
    const target = !active && progress === 100 ? 100 : Math.max(progress, 20);

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Rapid and smooth catch-up to the real target
        const diff = target - prev;
        const step = Math.max(4, Math.ceil(diff * 0.35));
        const next = prev + step;
        return next >= 100 ? 100 : next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [active, progress]);

  useEffect(() => {
    if (displayProgress >= 100) {
      const timeout = setTimeout(() => {
        if (onFinished) onFinished();
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [displayProgress, onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] text-white select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%', 
        opacity: 0.9,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="relative overflow-hidden">
        <motion.h1 
          className="text-8xl md:text-9xl font-bold tracking-tighter"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {Math.floor(displayProgress)}%
        </motion.h1>
      </div>
      <motion.div 
        className="mt-4 h-1 w-52 bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="h-full bg-white transition-all duration-75 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </motion.div>
      <motion.p
        className="absolute bottom-10 text-[10px] tracking-[0.25em] uppercase text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Loading Experience
      </motion.p>
    </motion.div>
  );
};

export default Loader;
