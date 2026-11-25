import React from 'react';
import { ArrowLeft, ArrowUpRight, Asterisk, Box, Film, Mail, Shirt } from 'lucide-react';
import { CONTACT } from '../data/portfolioData';

interface CreativeLabProps {
  onBackHome: () => void;
}

const CREATIVE_ROLES = [
  'VJ & Stage Visuals',
  '3D Motion & Tour Promos',
  'Cover & Merch Art Direction',
  'Real-Time Shaders & WebGL',
];

const LOGO_ALPHA_LOOPS = [
  {
    name: 'Dymension',
    video: '/assets/creative/logos/01_logo_M.webm',
    poster: '/assets/creative/logos/01_logo_M.webp',
  },
  {
    name: 'FURY',
    video: '/assets/creative/logos/02_logo_FURY.webm',
    poster: '/assets/creative/logos/02_logo_FURY.webp',
  },
  {
    name: 'DELREVES',
    video: '/assets/creative/logos/03_logo_DELREVES.webm',
    poster: '/assets/creative/logos/03_logo_DELREVES.webp',
  },
  {
    name: 'SLVL',
    video: '/assets/creative/logos/04_logo_SLVL.webm',
    poster: '/assets/creative/logos/04_logo_SLVL.webp',
  },
];

const FLORA_SERIES = [
  { src: '/assets/laboratory/GENERATIVE_FLORA.webp', label: 'Visual Study 01 — Bloom' },
  { src: '/assets/laboratory/GENERATIVE_FLORA (3).webp', label: 'Visual Study 02 — Pulse' },
  { src: '/assets/laboratory/GENERATIVE_FLORA (8).webp', label: 'Visual Study 03 — Canopy' },
];

export const CreativeLab: React.FC<CreativeLabProps> = ({ onBackHome }) => {
  return (
    <div className="min-h-screen bg-[#F3F5F6] text-[#0C1016]">
      <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-20 sm:px-10 sm:pt-36 md:px-14">
        <button
          type="button"
          onClick={onBackHome}
          className="mb-10 inline-flex items-center gap-3 rounded-full bg-[#D9E0E3] p-1.5 pr-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#0C1016] transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0C1016] text-white">
            <ArrowLeft size={13} />
          </span>
          <span>Back to Portfolio</span>
        </button>

        <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[#707580]">
          VJ · 3D Motion · Visual Direction · {CONTACT.location}
        </p>
        <h1
          className="max-w-5xl text-4xl font-medium tracking-[-0.03em] leading-[1.04] text-[#0C1016] sm:text-6xl lg:text-[4.5rem]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          High-impact <span className="text-[#8d929c]">3D visuals</span>, stage
          loops, and chrome art direction for live shows &amp; music releases.
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {CREATIVE_ROLES.map((role) => (
            <span
              key={role}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#0C1016] shadow-2xs"
            >
              {role}
            </span>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          {/* Showcase 1: Club Stage LED & Liquid Prism (9:16 Cycles + Real Blender Viewport) */}
          <article className="rounded-[32px] bg-[#0C1016] p-7 text-white sm:p-11 md:p-14 lg:rounded-[48px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/50">
                  <Film size={13} />
                  <span>Stage LED Mockup · Liquid Prism · Blender 5.3 Viewport</span>
                </span>
                <h2
                  className="mt-2 text-4xl font-medium tracking-[-0.03em] leading-[1.02] sm:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-white">Club Stage LED </span>
                  <span className="text-white/45">&amp; Liquid Prism</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'LED Stage Booth',
                  'Obsidian Prism Shader',
                  'Blender 5.3 Viewport',
                  '9:16 Club Loops',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/stage/club_led_booth_9x16.mp4"
                  poster="/assets/creative/stage/club_led_booth_9x16.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-xs">
                  Stage LED · Final
                </span>
              </div>

              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/stage/club_led_booth_blender_9x16_solid.mp4"
                  poster="/assets/creative/stage/club_led_booth_blender_9x16_solid.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-xs">
                  Blender · Solid
                </span>
              </div>

              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/stage/bolt_liquid_prism_9x16.mp4"
                  poster="/assets/creative/stage/bolt_liquid_prism_9x16.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-xs">
                  Liquid Prism · Final
                </span>
              </div>

              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/stage/bolt_liquid_prism_blender_9x16_material.mp4"
                  poster="/assets/creative/stage/bolt_liquid_prism_blender_9x16_material.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-xs">
                  Blender · Material
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6 flex items-start gap-3.5">
              <Asterisk
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-white/85"
                aria-hidden="true"
              />
              <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
                360° obsidian liquid-prism emblem and full 3D club booth LED wall
                mockup built in Blender 5.3 Cycles, paired with direct vertical
                Blender viewport captures in Solid and Material Preview modes.
              </p>
            </div>
          </article>

          {/* Showcase 2: KRONIK — Oil-Slick Techno Sigil (9:16 Final + Horizontal Blender Wireframe) */}
          <article className="rounded-[32px] bg-[#161B22] p-7 text-white sm:p-11 md:p-14 lg:rounded-[48px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/50">
                  <Box size={13} />
                  <span>Techno Sigil · Thin-Film Iridescence · Blender Wireframe</span>
                </span>
                <h2
                  className="mt-2 text-4xl font-medium tracking-[-0.03em] leading-[1.02] sm:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-white">KRONIK </span>
                  <span className="text-white/45">Oil-Slick Sigil</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'Thin-Film Oil-Slick',
                  '9:16 Orbital Loop',
                  'Blender 5.3 Wireframe',
                  'Cycles OptiX',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[9fr_24fr] lg:items-stretch">
              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/stage/kronik_oil_slick_9x16.mp4"
                  poster="/assets/creative/stage/kronik_oil_slick_9x16.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-xs">
                  Oil-Slick · Final
                </span>
              </div>

              <div className="group relative aspect-video lg:aspect-auto overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/stage/kronik_oil_slick_blender_wireframe.mp4"
                  poster="/assets/creative/stage/kronik_oil_slick_blender_wireframe.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-xs">
                  Blender 5.3 · Wireframe Layout
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6 flex items-start gap-3.5">
              <Asterisk
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-white/85"
                aria-hidden="true"
              />
              <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
                Custom brutalist techno sigil and counter-rotating orbital ring
                shaded with Blender 5.3 native Thin-Film interference (4D-driven
                oil-slick chrome), showcased alongside its live horizontal Blender
                wireframe viewport pass.
              </p>
            </div>
          </article>

          {/* Unified Showcase: Cyber Chrome & Star Spiral (9:16 vertical motion + 1:1 2K Totem) */}
          <article className="rounded-[32px] bg-[#0C1016] p-7 text-white sm:p-11 md:p-14 lg:rounded-[48px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/50">
                  <Film size={13} />
                  <span>9:16 Stage &amp; Reel Loops · 2K Key Art · Breakdown</span>
                </span>
                <h2
                  className="mt-2 text-4xl font-medium tracking-[-0.03em] leading-[1.02] sm:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-white">Cyber Chrome </span>
                  <span className="text-white/45">&amp; Star Spiral</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  '9:16 Reels / Spotify Canvas',
                  'VJ Stage Loops',
                  '2K Cover & Merch',
                  'Blender Cycles',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 9fr : 9fr : 16fr aligns two 9:16 vertical frames and one 1:1 square frame to identical height */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[9fr_9fr_16fr] lg:items-stretch">
              <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/chrome_star_cv_breakdown.mp4"
                  poster="/assets/creative/chrome_star_poster.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/chrome_star_5s_loop_lorem.mp4"
                  poster="/assets/creative/chrome_star_poster.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:col-span-2 sm:rounded-3xl lg:col-span-1">
                <img
                  src="/assets/creative/cyber_chrome_totem.webp"
                  alt="Cyber Chrome Totem 2K Blender render"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6 flex items-start gap-3.5">
              <Asterisk
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-white/85"
                aria-hidden="true"
              />
              <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
                Cohesive chrome sculpture and motion system rendered in Blender
                Cycles: vertical 9:16 spiral loops and wireframe/clay breakdown
                passes for Spotify Canvas, Reels, and LED totems, paired with a 2K
                liquid-metal totem centerpiece for cover art and capsule merch.
              </p>
            </div>
          </article>

          {/* Showcase 2: NOT HOUSE CLUB — Merch Design, 3D Cloth Sim & Drop Platform */}
          <article className="rounded-[32px] bg-[#23272D] p-7 text-white sm:p-11 md:p-14 lg:rounded-[48px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/50">
                  <Shirt size={13} />
                  <span>Merchandise · 3D Cloth Sim · Drop Web Platform</span>
                </span>
                <h2
                  className="mt-2 text-4xl font-medium tracking-[-0.03em] leading-[1.02] sm:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-white">NOT HOUSE CLUB </span>
                  <span className="text-white/45">Drop 01</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'Blender / CLO3D Cloth Sim',
                  '300 DPI Print Specs',
                  'Next.js + GSAP',
                  'Supabase Waitlist',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black/25 px-3.5 py-1.5 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              <div className="aspect-[6/7] overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/merch/wind-loop.mp4"
                  poster="/assets/creative/merch/back.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-[6/7] overflow-hidden rounded-2xl border border-white/10 bg-black/25 sm:rounded-3xl">
                <img
                  src="/assets/creative/merch/front.webp"
                  alt="NOT HOUSE CLUB front garment 3D render"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-[6/7] overflow-hidden rounded-2xl border border-white/10 bg-black/25 sm:rounded-3xl">
                <img
                  src="/assets/creative/merch/back.webp"
                  alt="NOT HOUSE CLUB back garment 3D render"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-[6/7] overflow-hidden rounded-2xl border border-white/10 bg-black/25 sm:rounded-3xl">
                <img
                  src="/assets/creative/merch/detail.webp"
                  alt="NOT HOUSE CLUB back print detail render"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6 flex items-start gap-3.5">
              <Asterisk
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-white/85"
                aria-hidden="true"
              />
              <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
                End-to-end merchandise capsule &amp; limited-drop web architecture:
                300 DPI print-ready graphics, Blender/CLO3D wind-simulated garment
                loops, photorealistic product renders, and a brutalist Next.js +
                GSAP + Supabase waitlist platform.
              </p>
            </div>
          </article>

          {/* Showcase 3: 3D Logo Systems & VJ Alpha Loops */}
          <article className="rounded-[32px] bg-[#3A3E44] p-7 text-white sm:p-11 md:p-14 lg:rounded-[48px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  <Box size={13} />
                  <span>Artist Identity · Transparent Alpha Loops · Showreel</span>
                </span>
                <h2
                  className="mt-2 text-4xl font-medium tracking-[-0.03em] leading-[1.02] sm:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-white">3D Logo Systems </span>
                  <span className="text-white/45">&amp; VJ Alpha Loops</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Alpha WebM Loops', 'SVG-to-OBJ Pipeline', 'Blender Python', 'Wireframe + Clay'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/20 px-3.5 py-1.5 text-xs font-medium text-white/85"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl">
                <video
                  src="/assets/creative/logos/logos_showreel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="aspect-video w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                {LOGO_ALPHA_LOOPS.map((logo) => (
                  <div
                    key={logo.name}
                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0C1016] sm:rounded-3xl"
                  >
                    <video
                      src={logo.video}
                      poster={logo.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 backdrop-blur-xs">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6 flex items-start gap-3.5">
              <Asterisk
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-white/85"
                aria-hidden="true"
              />
              <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
                Automated SVG-to-3D geometry &amp; Blender Cycles pipeline turning flat
                artist and label wordmarks into transparent 4:5 alpha VJ loops,
                stage screen overlays, and wireframe/clay process reels.
              </p>
            </div>
          </article>

          {/* Showcase 4: Generative Flora — Live Visual & Lighting Moods */}
          <section className="pt-4">
            <p className="mb-3 text-xs font-medium tracking-wide text-[#707580]">
              Live Visuals &amp; Atmospheric Moods
            </p>
            <h2
              className="mb-8 text-3xl font-medium tracking-[-0.03em] text-[#0C1016] sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Generative Flora
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {FLORA_SERIES.map((item) => (
                <div
                  key={item.label}
                  className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-3 shadow-xs"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-[#0C1016]">
                    <img
                      src={item.src}
                      alt={item.label}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                  <p className="px-2 pt-3 pb-1 text-xs font-medium tracking-wide text-[#5c616b]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Direct Creative Booking CTA */}
          <section className="rounded-[32px] border border-black/10 bg-white p-8 sm:p-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#707580]">
                Available for Tours, Releases &amp; Visual Direction
              </p>
              <h3
                className="text-2xl font-medium tracking-tight text-[#0C1016] sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Need custom 3D loops, VJ visuals, or key art?
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=Creative%20%2F%20VJ%20%26%203D%20Visuals%20Inquiry`}
                className="inline-flex items-center gap-3 rounded-full bg-[#0C1016] p-1.5 pl-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:scale-105"
              >
                <span>Book Creative Work</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E232C] text-white">
                  <Mail size={13} />
                </span>
              </a>

              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#0C1016] transition-colors hover:bg-[#F3F5F6]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
