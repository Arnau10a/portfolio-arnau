import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  Asterisk,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { CONTACT } from '../../data/portfolioData';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

const DOCK_LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mx-auto max-w-[1440px] px-4 pt-12 pb-10 sm:px-8 md:px-12">
      {/* Oversized CTA Band matching sohub.digital */}
      <section
        id="contact"
        className="border-t border-black/10 px-2 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <div className="max-w-4xl">
          <h2
            className="text-6xl font-semibold tracking-[-0.04em] leading-[0.92] text-[#0C1016] sm:text-8xl lg:text-[7.5rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="block">Don&apos;t</span>
            <span className="block">be shy</span>
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#5c616b] sm:text-base">
            Open to software engineering roles in real-time 3D engines,
            high-performance C++, robotics, and local AI pipelines.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3.5 rounded-full bg-[#D9E0E3] p-1.5 pl-6 text-[11px] font-medium uppercase tracking-[0.08em] text-[#0C1016] transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <span>{copied ? 'Email copied' : 'Copy email'}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0C1016] text-white">
                {copied ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={13} />
                )}
              </span>
            </button>

            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-3.5 rounded-full bg-[#0C1016] p-1.5 pl-6 text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:scale-105"
            >
              <span>Send message</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E232C] text-white">
                <Mail size={13} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Layered Wordmark + Main Dark Card + Inset Sub-Footer Dock */}
      <div className="pt-4">
        <div className="overflow-hidden -mb-[4vw] select-none" aria-hidden="true">
          <div
            className="text-center text-[18vw] font-bold tracking-[-0.04em] leading-[0.78] text-[#0C1016] xl:text-[15rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ARNAU
          </div>
        </div>

        <div className="relative z-10 rounded-[28px] bg-[#0C1016] px-6 py-16 text-center text-white sm:rounded-[36px] sm:py-24">
          <p
            className="text-3xl font-medium tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            &copy; Arnau Garcia Parise
          </p>
          <p className="mt-2.5 text-sm text-white/50 sm:text-base">
            Computer Engineer · {CONTACT.location}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E242C] text-white transition-all duration-300 hover:scale-110 hover:bg-[#353d4d]"
            >
              <Github size={18} />
            </a>

            <Asterisk
              size={22}
              strokeWidth={1.6}
              className="text-white/35"
              aria-hidden="true"
            />

            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E242C] text-white transition-all duration-300 hover:scale-110 hover:bg-[#353d4d]"
            >
              <Linkedin size={18} />
            </a>

            <Asterisk
              size={22}
              strokeWidth={1.6}
              className="text-white/35"
              aria-hidden="true"
            />

            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="Send email"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E242C] text-white transition-all duration-300 hover:scale-110 hover:bg-[#353d4d]"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Inset Sub-Footer Dock */}
        <div className="mx-4 flex flex-wrap items-center justify-between gap-3 rounded-b-[24px] bg-[#1E232C] px-5 py-5 sm:mx-8 sm:px-9">
          <div className="flex flex-wrap items-center gap-2.5">
            {DOCK_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className="inline-flex items-center gap-3 rounded-full bg-[#D9E0E3] p-1.5 pl-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#0C1016] transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0C1016] text-white">
                  <ArrowRight size={13} />
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="inline-flex items-center gap-3 rounded-full bg-[#0C1016] p-1.5 pl-5 text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <span>Go up</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E232C] text-white">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
