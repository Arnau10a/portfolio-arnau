import { useEffect, useRef } from 'react';
// @ts-ignore
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js';

const SparklingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Logic to toggle visibility based on #work section
    let observer: IntersectionObserver | null = null;
    const checkForWorkSection = () => {
      const workSection = document.getElementById('work');
      if (workSection && canvasRef.current) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (canvasRef.current) {
                // If work section is visible (intersecting), hide the background
                // We use a transition for smooth effect
                canvasRef.current.style.transition = 'opacity 0.5s ease-in-out';
                canvasRef.current.style.opacity = entry.isIntersecting ? '0' : '1';
              }
            });
          },
          { threshold: 0.1 } // Trigger when 10% of the work section is visible
        );
        observer.observe(workSection);
        return true;
      }
      return false;
    };

    // Try to find the section immediately, or poll for it
    if (!checkForWorkSection()) {
      const intervalId = setInterval(() => {
        if (checkForWorkSection()) {
          clearInterval(intervalId);
        }
      }, 500);
      
      // Clear interval on cleanup if it's still running
      return () => {
        clearInterval(intervalId);
        observer?.disconnect();
        // app.destroy?.();
      };
    }

    return () => {
      observer?.disconnect();
      // app.destroy?.(); 
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
        zIndex: -1, // Behind everything
        mixBlendMode: 'lighten', // Ensure black background is transparent-ish
        opacity: 1, // Start visible
      }}
    />
  );
};

export default SparklingBackground;
