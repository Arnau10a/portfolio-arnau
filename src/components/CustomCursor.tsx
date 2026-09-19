import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../context/CursorContext';

const CustomCursor: React.FC = () => {
  const { cursorVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [inHero, setInHero] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // In hero section when scroll is near top
      setInHero(window.scrollY < window.innerHeight * 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if device supports fine hover cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const trailLength = 12;
    const trailPoints: { x: number; y: number }[] = Array.from({ length: trailLength }, () => ({
      x: -100,
      y: -100,
    }));

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = [];

    const canvas = canvasRef.current;
    let ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Direct transform for the dot (zero delay)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Spawn subtle warm ambient sparks if in Hero
      if (window.scrollY < window.innerHeight * 0.85 && Math.random() < 0.35) {
        const colors = ['#f5efe6', '#d4b896', '#e7d7c1', '#a8a29e'];
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 8,
          y: mouseY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          life: 1,
          maxLife: 20 + Math.random() * 15,
          size: 1.2 + Math.random() * 1.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth lerp loop for the outer ring & canvas trail
    const render = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      // Update trail points
      trailPoints[0].x += (mouseX - trailPoints[0].x) * 0.4;
      trailPoints[0].y += (mouseY - trailPoints[0].y) * 0.4;
      for (let i = 1; i < trailPoints.length; i++) {
        trailPoints[i].x += (trailPoints[i - 1].x - trailPoints[i].x) * 0.35;
        trailPoints[i].y += (trailPoints[i - 1].y - trailPoints[i].y) * 0.35;
      }

      // Draw canvas trail & particles if in Hero
      const isHeroActive = window.scrollY < window.innerHeight * 0.85;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isHeroActive && mouseX > 0 && mouseY > 0) {
          // Draw smooth ribbon trail
          for (let i = 0; i < trailPoints.length - 1; i++) {
            const p1 = trailPoints[i];
            const p2 = trailPoints[i + 1];
            const ratio = 1 - i / trailPoints.length;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${ratio * 0.35})`;
            ctx.lineWidth = ratio * 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Inner cyan/purple glow
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${ratio * 0.4})`;
            ctx.lineWidth = ratio * 2;
            ctx.stroke();
          }

          // Render & update particles
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 1;

            const alpha = Math.max(0, p.life / p.maxLife);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha * 0.7;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            ctx.fill();

            if (p.life <= 0) {
              particles.splice(i, 1);
            }
          }
          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible || cursorVariant === 'hidden') return null;

  const isButton = cursorVariant === 'button';
  const isText = cursorVariant === 'text';
  const isProject = cursorVariant === 'project';

  return (
    <>
      {/* Dynamic Trail & Stardust Canvas (active only in Hero) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9990] transition-opacity duration-500"
        style={{ opacity: inHero ? 1 : 0 }}
      />

      {/* Fast hardware-accelerated Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform transition-[width,height,background-color] duration-150 ${
          isProject
            ? 'w-3 h-3 bg-purple-400'
            : isText
            ? 'w-5 h-5 bg-cyan-400/40 blur-[0.5px]'
            : isButton
            ? 'w-2.5 h-2.5 bg-cyan-300'
            : inHero
            ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
            : 'w-2 h-2 bg-cyan-400'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />

      {/* Smooth outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border will-change-transform flex items-center justify-center transition-[width,height,border-color,background-color] duration-200 ${
          isProject
            ? 'w-16 h-16 border-purple-400 bg-purple-500/10'
            : isButton
            ? 'w-12 h-12 border-purple-400 bg-purple-500/5'
            : isText
            ? 'w-10 h-10 border-cyan-400/30'
            : inHero
            ? 'w-8 h-8 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
            : 'w-6 h-6 border-cyan-400/50'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        {isProject && (
          <span className="text-[7px] tracking-widest font-black uppercase font-mono text-purple-300">
            VIEW
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;

