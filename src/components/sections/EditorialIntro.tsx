import React from 'react';

export const EditorialIntro: React.FC = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] px-5 pt-24 pb-14 sm:px-10 sm:pt-32 sm:pb-20 md:px-14"
    >
      <p className="mb-5 text-xs font-medium tracking-wide text-[#707580]">
        Engineering Focus
      </p>
      <h2
        className="max-w-5xl text-4xl font-medium tracking-[-0.03em] leading-[1.06] text-[#0C1016] sm:text-6xl lg:text-[4.25rem]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Computer Engineer building{' '}
        <span className="text-[#8d929c]">real-time</span> 3D systems, local AI
        pipelines, and autonomous robotics.
      </h2>
    </section>
  );
};
