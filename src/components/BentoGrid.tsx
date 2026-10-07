import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Package, Check, Copy } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { projectsData, type EngineeringProject } from '../data/projectsData';

const ProjectCard: React.FC<{ project: EngineeringProject }> = ({ project }) => {
  const { setCursorVariant } = useCursor();
  const [copied, setCopied] = useState(false);

  const copyUrl = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link
      to={`/project/${project.id}`}
      className="card-linear p-7 sm:p-9 flex flex-col justify-between group block"
      onMouseEnter={() => setCursorVariant('button')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      <div>
        <div className="flex items-center justify-between pb-6 text-xs text-neutral-500 font-mono">
          <span>{project.num} · {project.year}</span>
          <span className="text-neutral-400">{project.field}</span>
        </div>

        <h3 
          className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-neutral-200 transition-colors"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {project.title}
        </h3>

        <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
          {project.subtitle}
        </p>

        {/* Highlighted metrics */}
        <div className="grid grid-cols-3 gap-3 py-4 my-2 border-y border-neutral-900">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                {m.label}
              </div>
              <div className="text-sm sm:text-base font-semibold text-neutral-200 font-mono">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((st) => (
            <span key={st} className="tag-pill text-[11px]">
              {st}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {project.packageUrl && (
            <button
              onClick={(e) => copyUrl(e, project.packageUrl!)}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 font-mono py-1 px-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
              title="Copy Unity Package Manager URL"
            >
              <Package size={12} />
              <span>{copied ? 'Copied' : 'UPM Git'}</span>
              {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-400 hover:text-white transition-colors p-1"
              title="GitHub Repository"
            >
              <Github size={15} />
            </a>
          )}

          <div className="text-xs text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1">
            <span>Details</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="w-full py-24 px-6 sm:px-12 md:px-20 border-t border-neutral-900 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
            Selected Work
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Engineering Systems
          </h2>
        </div>
        <p className="text-sm text-neutral-400 font-light max-w-md">
          Production packages, hardware sensor telemetry, and reinforcement learning environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
