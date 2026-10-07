import React, { useState } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check, Terminal } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { setCursorVariant } = useCursor();
  const [copied, setCopied] = useState(false);

  const email = "parise.garcia@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="w-full py-24 px-6 md:px-14 border-t border-white/[0.08] bg-[#040608] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e5a93c] tracking-[0.25em] uppercase font-semibold">
              <Terminal size={12} />
              <span>Direct Communication Channel</span>
            </div>
            
            <h2 
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              HABLEMOS DE<br />INGENIERÍA
            </h2>

            <p className="text-sm md:text-base text-slate-300 font-sans font-light max-w-xl leading-relaxed">
              Disponible para roles de Software Engineer en sistemas de alto rendimiento, computación espacial, robótica y modelos de aprendizaje por refuerzo.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="btn-tech"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Email Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#e5a93c]" />
                    <span>Copiar: parise.garcia@gmail.com</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="btn-tech !bg-transparent border-white/20 hover:border-slate-300"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Mail size={13} />
                <span>Enviar Email</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 pt-4 lg:pt-0">
            <div className="p-5 bg-black/60 border border-white/[0.06] rounded-[2px] font-mono text-xs space-y-3">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">REGISTRO DE TELEMETRÍA DEL SITIO</div>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex justify-between">
                  <span>FRAMEWORK:</span>
                  <span className="text-slate-200">React 19 + TypeScript (Strict)</span>
                </div>
                <div className="flex justify-between">
                  <span>GRAPHICS ENGINE:</span>
                  <span className="text-slate-200">Three.js / WebGL / Canvas</span>
                </div>
                <div className="flex justify-between">
                  <span>HOSTING INFRASTRUCTURE:</span>
                  <span className="text-slate-200">Vercel Edge Global Network</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURITY POLICY:</span>
                  <span className="text-emerald-400">HSTS + CSP Validated</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://github.com/Arnau10a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Github size={13} />
                <span>GitHub</span>
                <ArrowUpRight size={10} className="opacity-50" />
              </a>

              <a
                href="https://linkedin.com/in/arnau-garcia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Linkedin size={13} />
                <span>LinkedIn</span>
                <ArrowUpRight size={10} className="opacity-50" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <span>&copy; {currentYear} ARNAU GARCIA — SOFTWARE ENGINEER</span>
          <span>BARCELONA // LOCAL TIME: UTC+1</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
