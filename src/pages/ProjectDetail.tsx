import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Cpu, Terminal, Layers, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { useCursor } from '../context/CursorContext';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCursorVariant } = useCursor();

  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="text-amber-200 underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#030303] text-white pt-24 pb-28 px-6 sm:px-10 md:px-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to overview</span>
          </button>
        </motion.div>

        {/* Header dossier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="border-b border-white/[0.08] pb-12"
        >
          <div className="flex items-center gap-4 text-xs font-mono mb-4">
            <span className="text-neutral-500">SPECIFICATION // {project.num}</span>
            <span className="h-px w-6 bg-white/20" />
            <span style={{ color: project.accent }} className="uppercase tracking-widest font-semibold">
              {project.field}
            </span>
            <span className="text-neutral-500 ml-auto">{project.year}</span>
          </div>

          <h1 
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.03] hover:border-white/50 text-xs font-mono text-white transition-all"
              >
                <Github size={14} />
                <span>Source Repository</span>
                <ExternalLink size={12} className="opacity-60" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-amber-100 text-xs font-mono font-medium transition-all"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Media Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-12 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl relative"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-[16/9] object-cover object-center"
          />
        </motion.div>

        {/* Quantitative Metrics Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          {project.metrics.map((metric, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.015]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-2">
                {metric.label}
              </span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
                {metric.value}
              </p>
              <span className="text-xs text-neutral-400 font-light">
                {metric.detail}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Deep Dive Architecture Dossier */}
        <div className="space-y-12">
          
          {/* Executive Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Terminal size={14} style={{ color: project.accent }} />
              <span>System Architecture & Purpose</span>
            </div>
            <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
              {project.architecture.overview}
            </p>
          </div>

          {/* The Challenge */}
          <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.01] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300">
              <Cpu size={14} className="text-amber-200" />
              <span>The Engineering Challenge</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {project.architecture.coreChallenge}
            </p>
          </div>

          {/* The Implementation */}
          <div className="p-6 sm:p-8 rounded-2xl border space-y-3" style={{ borderColor: `${project.accent}40`, backgroundColor: `${project.accent}08` }}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: project.accent }}>
              <Layers size={14} />
              <span>Technical Solution & Implementation</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
              {project.architecture.engineeringSolution}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-mono uppercase tracking-widest text-neutral-300">
              Key Engineering Accomplishments
            </h3>
            <div className="space-y-3">
              {project.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300 font-light">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack Tags */}
          <div className="pt-8 border-t border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-4">
              Technologies & Frameworks Deployed
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
