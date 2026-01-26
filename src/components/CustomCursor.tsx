import React, { useEffect } from 'react';
import { useCursor } from '../context/CursorContext';

const CustomCursor: React.FC = () => {
  const { cursorVariant } = useCursor();
  const cursorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white transition-opacity duration-200 will-change-transform ${
        cursorVariant === 'text' ? 'opacity-0' : 'opacity-100'
      }`}
    />
  );
};

export default CustomCursor;
