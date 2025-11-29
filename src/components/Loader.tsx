import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';

interface LoaderProps {
  onFinished?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinished }) => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smoothly interpolate progress
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // If real progress is higher, catch up. If real progress is lower (unlikely but possible), wait.
        // We also want to ensure it always moves a bit to feel alive, but not past real progress too much unless it's done.
        // Actually, for a smoother feel, let's just move towards the target 'progress'.
        const diff = progress - prev;
        const step = Math.max(1, diff / 5); // Move 1/5th of the way or at least 1%
        return Math.min(100, prev + step);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (displayProgress === 100) {
      // Small delay before finishing to let user see 100%
      const timeout = setTimeout(() => {
        if (onFinished) onFinished();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayProgress, onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative overflow-hidden">
        <motion.h1 
          className="text-9xl font-bold tracking-tighter"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {Math.floor(displayProgress)}%
        </motion.h1>
      </div>
      <motion.div 
        className="mt-4 h-1 w-64 bg-white/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-white"
          style={{ width: `${displayProgress}%` }}
        />
      </motion.div>
      <motion.p
        className="absolute bottom-10 text-xs uppercase tracking-widest text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Loading Experience
      </motion.p>
    </motion.div>
  );
};

export default Loader;
