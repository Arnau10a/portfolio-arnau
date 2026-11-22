import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroOverlayProps {
  hasMoved: boolean;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ hasMoved }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end items-center pb-8 select-none">
      <div className="grain-overlay absolute inset-0" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-2">
        <p
          className={`text-[11px] uppercase tracking-[0.32em] text-zinc-800/55 transition-opacity duration-700 ${
            hasMoved ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Move cursor to cast light
        </p>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] text-zinc-800/50">
          <span>Scroll to explore</span>
          <ArrowDown size={11} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
};
