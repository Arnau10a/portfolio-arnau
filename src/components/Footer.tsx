import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check, FileText } from 'lucide-react';
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
    <footer id="contact" className="w-full py-28 px-6 md:px-12 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          <div className="lg:col-span-7">
            <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase block mb-4">
              Direct Contact & Collaboration
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-8 text-white uppercase leading-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              ENGINEERING<br />THE NEXT WAVE
            </motion.h2>

            <p className="text-sm md:text-base text-gray-300 font-sans font-light max-w-xl mb-10 leading-relaxed">
              Open to technical discussions, high-impact Software Engineering roles, and cutting-edge collaborations in AI Systems, Autonomous Robotics, and Real-Time Graphics.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.03] hover:border-cyan-400 text-sm font-mono text-white transition-all hover:bg-cyan-400/10"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-cyan-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a 
                href={`mailto:${email}`}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 text-sm md:text-base font-mono font-medium hover:text-cyan-400 transition-colors py-2"
              >
                <Mail size={18} />
                Send Message
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
              </a>

              <a 
                href="https://www.linkedin.com/in/arnau-garcia-parise/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 text-sm md:text-base font-mono font-medium hover:text-cyan-400 transition-colors py-2"
              >
                <Linkedin size={18} />
                LinkedIn
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
              </a>

              <a 
                href="https://github.com/Arnau10a"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 text-sm md:text-base font-mono font-medium hover:text-cyan-400 transition-colors py-2"
              >
                <Github size={18} />
                GitHub
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end gap-5 text-gray-400 text-xs font-mono tracking-widest uppercase">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] w-full max-w-sm space-y-3">
              <div className="flex items-center justify-between text-gray-300">
                <span>Location</span>
                <span className="text-white font-medium">Barcelona, Spain</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Work Modality</span>
                <span className="text-emerald-400 font-medium">Remote / Hybrid</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Domain</span>
                <span className="text-white font-medium">AI · Robotics · 3D Systems</span>
              </div>
            </div>

            <p>© {currentYear} ARNAU GARCIA // SOFTWARE ENGINEER</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

