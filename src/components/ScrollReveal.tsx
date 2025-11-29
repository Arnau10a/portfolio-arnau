import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Variants, type Easing } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  width = 'fit-content',
  delay = 0,
  className = "" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 75, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] as Easing, // Custom cubic-bezier for smooth "premium" feel
        delay: delay 
      }
    },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
