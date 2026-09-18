import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { setCursorVariant } = useCursor();

  return (
    <footer className="w-full py-24 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-white uppercase"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              LET'S BUILD THE<br />FUTURE TOGETHER
            </motion.h2>
            
            <div className="flex flex-wrap gap-6">
              <a 
                href="mailto:parise.garcia@gmail.com"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 text-lg font-medium hover:text-cyan-400 transition-colors"
              >
                <Mail size={20} />
                Email
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </a>
              <a 
                href="https://www.linkedin.com/in/arnau-garcia-parise/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 text-lg font-medium hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </a>
              <a 
                href="https://github.com/Arnau10a"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group flex items-center gap-2 text-lg font-medium hover:text-cyan-400 transition-colors"
              >
                <Github size={20} />
                GitHub
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-4 text-gray-500 text-sm uppercase tracking-widest font-bold">
            <p>© {currentYear} ARNAU GARCIA</p>
            <p>BASED IN SPAIN // REMOTE WORLDWIDE</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

