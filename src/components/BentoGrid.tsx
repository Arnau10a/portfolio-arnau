import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Github, 
  Package, 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Layers, 
  Radio
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { projectsData, type EngineeringProject } from '../data/projectsData';

const MasterProjectFeature: React.FC<{ project: EngineeringProject }> = ({ project }) => {
  const { setCursorVariant } = useCursor();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-tech p-6 sm:p-10 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] font-mono text-[11px] font-bold tracking-widest uppercase rounded-[2px]">
            MASTER RELEASE // {project.num}
          </span>
          <span className="text-slate-500 font-mono text-xs">// {project.year}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest hidden sm:inline">UPM PROD</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.packageUrl && (
            <button
              onClick={() => copyToClipboard(project.packageUrl!)}
              className="btn-tech"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              title="Copiar URL de Git para Unity Package Manager"
            >
              <Package size={13} className="text-[#e5a93c]" />
              <span>{copied ? 'UPM URL Copiada!' : 'Copiar URL UPM Git'}</span>
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="opacity-60" />}
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tech !bg-transparent border-white/20 hover:border-slate-300"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <Github size={13} />
              <span>Repositorio</span>
              <ArrowUpRight size={12} className="opacity-60" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h3 
              className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          <div className="p-4 bg-black/60 border border-white/[0.08] rounded-[2px] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#e5a93c] font-mono font-semibold uppercase tracking-wider">
              <Terminal size={12} />
              <span>Problema de Ingeniería & Solución</span>
            </div>
            <p className="text-slate-300 font-light leading-relaxed">
              {project.architecture.overview}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 bg-black/40 border border-white/[0.06] rounded-[2px]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{m.label}</div>
                <div className="text-sm sm:text-base font-mono font-bold text-white mt-0.5">{m.value}</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">{m.detail}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.stack.map(st => (
              <span key={st} className="tag-tech">{st}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between">
          {project.codeSnippets && project.codeSnippets.length > 0 && (
            <div className="border border-white/[0.1] bg-[#07090e] rounded-[2px] overflow-hidden flex flex-col h-full">
              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] border-b border-white/[0.08] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Code2 size={13} className="text-[#e5a93c]" />
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">CÓDIGO FUENTE:</span>
                  {project.codeSnippets.map((snip, idx) => (
                    <button
                      key={snip.label}
                      onClick={() => setActiveTab(idx)}
                      className={`px-2 py-0.5 rounded-[2px] text-[11px] transition-colors ${
                        activeTab === idx 
                          ? 'bg-white/10 text-white font-semibold border border-white/20' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {snip.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => copyToClipboard(project.codeSnippets![activeTab].code)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  title="Copiar código"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>

              <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed flex-1 bg-black/70">
                <code>{project.codeSnippets[activeTab].code}</code>
              </pre>

              <div className="p-3 bg-white/[0.015] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Radio size={11} className="text-emerald-400" />
                  <span>PREFAB: Biofeedback_UI_System.prefab</span>
                </span>
                <Link 
                  to={`/project/${project.id}`}
                  className="text-[#e5a93c] hover:underline flex items-center gap-1"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span>Dossier Completo</span>
                  <ArrowUpRight size={11} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectSecondaryCard: React.FC<{ project: EngineeringProject }> = ({ project }) => {
  const { setCursorVariant } = useCursor();

  return (
    <div 
      className="card-tech p-6 sm:p-7 flex flex-col justify-between"
      onMouseEnter={() => setCursorVariant('button')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-xs font-mono">
          <span className="text-[#e5a93c] font-semibold">{project.num} // {project.year}</span>
          <span className="tag-tech">{project.field}</span>
        </div>

        <h3 
          className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-5 mb-2"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {project.title}
        </h3>

        <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed mb-5">
          {project.subtitle}
        </p>

        <div className="p-3.5 bg-black/50 border border-white/[0.05] rounded-[2px] mb-5 space-y-1.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">RETOS DEL SISTEMA</div>
          <p className="text-[11px] text-slate-300 font-light leading-relaxed">
            {project.architecture.coreChallenge}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="p-2.5 bg-black/30 border border-white/[0.04] rounded-[2px]">
              <div className="text-[9px] font-mono text-slate-400 uppercase">{m.label}</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-white">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex flex-wrap gap-1 max-w-[65%]">
          {project.stack.slice(0, 3).map(st => (
            <span key={st} className="tag-tech !text-[9px]">{st}</span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white rounded-[2px] transition-colors"
              title="Repositorio"
            >
              <Github size={13} />
            </a>
          )}

          <Link
            to={`/project/${project.id}`}
            className="btn-tech !py-1 !px-2.5 !text-[10px]"
          >
            <span>Ver Specs</span>
            <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const masterProject = projectsData[0];
  const secondaryProjects = projectsData.slice(1);

  return (
    <section id="projects" className="relative w-full py-28 px-6 md:px-14 bg-[#050505] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#e5a93c] tracking-[0.25em] uppercase mb-2 font-semibold">
              <Layers size={13} />
              <span>Production Systems Dossier</span>
            </div>
            <h2 
              className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Casos de Ingeniería
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-md leading-relaxed">
            Software de producción sin mocks genéricos. Repositorios auditables, paquetes de Unity instalables y pipelines de visión y aprendizaje por refuerzo.
          </p>
        </div>

        <div className="pt-12">
          {/* Master Highlight: Biofeedback VR Core */}
          <MasterProjectFeature project={masterProject} />

          {/* Secondary Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryProjects.map((proj) => (
              <ProjectSecondaryCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
