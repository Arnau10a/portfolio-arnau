import React, { useState } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { setCursorVariant } = useCursor();
  const [copied, setCopied] = useState(false);

  const email = "parise.garcia@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="w-full py-24 px-6 sm:px-12 md:px-20 border-t border-neutral-900 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16 border-b border-neutral-900">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block">
            Contact
          </span>
          <h2 
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Let's build together.
          </h2>
          <p className="text-base text-neutral-400 font-light leading-relaxed">
            Open to software engineering roles in real-time systems, spatial computing, robotics, and reinforcement learning.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="btn-linear"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Email copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-neutral-400" />
                  <span>Copy email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="btn-linear !bg-transparent border-neutral-800 text-neutral-300 hover:text-white"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <Mail size={13} />
              <span>Send message</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <a
            href="https://github.com/Arnau10a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Github size={15} />
            <span>GitHub</span>
            <ArrowUpRight size={12} className="opacity-60" />
          </a>

          <a
            href="https://linkedin.com/in/arnau-garcia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Linkedin size={15} />
            <span>LinkedIn</span>
            <ArrowUpRight size={12} className="opacity-60" />
          </a>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
        <span>&copy; {currentYear} Arnau Garcia</span>
        <span>Barcelona, Spain</span>
      </div>
    </footer>
  );
};

export default Footer;
