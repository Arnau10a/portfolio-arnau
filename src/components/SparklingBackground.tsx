import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js';

const SparklingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide cursor effect if scrolled down more than 50px
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Use the imported TubesCursor which should now be version 0.0.19
    TubesCursor(canvasRef.current, {
      renderer: { alpha: true },
      alpha: true,
      tubes: {
        colors: ["#777777", "#a2a2a2", "#ffffff"], // Tubos oscuros/negros
        lights: {
          intensity: 30, // Intensidad baja para que sea sutil
          colors: ["#ffffff", "#f0f0f0", "#e0e0e0", "#d0d0d0"] // Todos blanco
        }
      }
    });

    return () => {
      // Cleanup logic if supported by the library, otherwise it just unmounts
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Allow clicks to pass through
        zIndex: 51, 
        mixBlendMode: 'lighten', 
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
};

export default SparklingBackground;
