import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const CustomCursor: React.FC = () => {
  const { cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
      scale: 1,
      backgroundColor: "#ffffff",
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0, // Hide the dot on text hover
      scale: 0,
      backgroundColor: "#ffffff",
    },
    button: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
      scale: 1.5, // Slightly larger for buttons
      backgroundColor: "#ffffff", // Or maybe a different color/style
    }
  };

  // Optional: Add a ring or follower if desired, but for now focusing on the "dot"
  // If the user previously had a ring, I might be missing it. 
  // But since the file was empty, I'll start with just the dot and ensure it hides on text.

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default CustomCursor;
