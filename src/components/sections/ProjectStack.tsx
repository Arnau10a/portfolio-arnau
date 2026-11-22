import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import { PROJECTS, type ProjectCardData } from '../../data/portfolioData';

interface StickyProjectCardProps {
  project: ProjectCardData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({
  project,
  index,
  total,
  progress,
}) => {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const startRange = index / total;
  const scale = useTransform(progress, [startRange, 1], [1, targetScale]);

  return (
    <motion.article
      style={{
        top: `calc(4.5rem + ${index * 1.15}rem)`,
        backgroundColor: project.bg,
        scale,
      }}
      className="group sticky mb-[24vh] last:mb-0 flex min-h-[64vh] sm:min-h-[70vh] origin-top flex-col justify-between rounded-[32px] p-7 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.16)] sm:p-11 md:p-14 lg:rounded-[48px] will-change-transform"
    >
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-7">
          <h3
            className="text-4xl font-medium tracking-[-0.03em] leading-[1.02] sm:text-6xl lg:text-[4.25rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="block text-white">{project.titleLine1}</span>
            <span className="block text-white/45">{project.titleLine2}</span>
          </h3>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs font-medium tracking-wide text-white/55 sm:text-sm">
              {project.context} · {project.year}
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              >
                <span>GitHub</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className={`aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl ${
              project.imageFit === 'contain' ? 'bg-[#0b101d] p-2' : 'bg-black/25'
            }`}
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-black/20 px-4 py-1.5 text-xs font-medium text-white/85 sm:text-[13px]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/75"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>

        <div className="my-5 border-t border-white/15 sm:my-6" />

        <div className="flex items-start gap-3.5 sm:gap-4">
          <Asterisk
            size={20}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-white/85"
            aria-hidden="true"
          />
          <p className="max-w-2xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
            {project.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      aria-label="Selected engineering projects"
      className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-8 sm:pb-24 md:px-12"
    >
      <div ref={containerRef} className="relative">
        {PROJECTS.map((project, index) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
