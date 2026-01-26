import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Box, Cpu, Palette } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoItemProps {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  tags?: string[];
  link?: string;
  image?: string;
}

const BentoItem = ({ title, description, className, icon, tags, link, image, variant = 'default' }: BentoItemProps & { variant?: 'default' | 'laboratory' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between",
        variant === 'laboratory' ? "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]" : "hover:bg-white/10",
        className,
        (image || variant === 'laboratory') ? "p-0" : "p-6"
      )}
    >
      {/* Standard Background Image Logic */}
      {(image && variant !== 'laboratory') && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      {/* Laboratory Variant Specific Logic */}
      {variant === 'laboratory' && image && (
        <div className="absolute inset-0 z-0 bg-black">
          {/* Main Image - Grayscale by default, Color on Hover */}
          <div className="absolute inset-0 z-0">
             <img 
              src={image} 
              alt="LABORATORY_START" 
              className="w-full h-full object-cover transition-all duration-500 filter grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100" 
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
           
           {/* Overlay Lines */}
           <div className="absolute inset-0 z-30 opacity-20 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)]" />
        </div>
      )}

      <div className={cn("relative z-20 flex flex-col justify-between h-full", (image || variant === 'laboratory') ? "p-6" : "")}>
        <div>
          <div className={cn(
            "mb-4 inline-flex items-center justify-center p-3 rounded-2xl border transition-all duration-500 backdrop-blur-md",
            variant === 'laboratory' 
              ? "bg-black/50 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:shadow-[0_0_20px_cyan]" 
              : "bg-white/10 border-white/10 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50"
          )}>
            {icon}
          </div>
          <h3 className={cn("text-xl font-bold mb-2", variant === 'laboratory' ? "font-mono tracking-widest text-cyan-50" : "text-white")}>
            {variant === 'laboratory' ? "[ GENERATIVE_FLORA ]" : title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed font-sans">{description}</p>
          
          {tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className={cn(
                  "px-2 py-1 text-[10px] uppercase tracking-widest rounded-md backdrop-blur-sm border",
                  variant === 'laboratory'
                    ? "bg-black/80 border-cyan-900/50 text-cyan-400"
                    : "bg-white/10 border-white/10 text-gray-300"
                )}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          {(link || variant === 'laboratory') && (
            <a
              href={link || "/laboratory"} 
              target={variant === 'laboratory' ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
                variant === 'laboratory' ? "text-cyan-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_cyan]" : "text-cyan-400 hover:text-cyan-300"
              )}
            >
              {variant === 'laboratory' ? "INITIALIZE_SCAN" : "Explore"} <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Decorative background element - only show if no image */}
      {!image && (
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all duration-500" />
      )}
    </motion.div>
  );
};

const BentoGrid = () => {
  const items = [
    {
        title: "The Laboratory",
        description: "Experimental synthetic biology visualization using WebGL and generative algorithms.",
        className: "md:col-span-2 md:row-span-2",
        icon: <Cpu className="w-6 h-6" />,
        tags: ["WebGL", "Shaders", "Generative", "React Three Fiber"],
        image: "/assets/laboratory/start.png",
        variant: "laboratory" as const, // Explicit literal type
        link: "/laboratory"
    },
    {
      title: "NuclearVerse - Bachelor's Thesis",
      description: "Comprehensive VR solution for fusion reactor maintenance (ITER/DEMO). Features 1:1 scale simulation, physics-based validations, and an offline AI Assistant (RAG+LLM).",
      className: "md:col-span-2 md:row-span-1", // Adjusted to standard
      icon: <Box className="text-cyan-400" />,
      tags: ["Unity", "VR", "LLM", "RAG", "C#", "Nuclear Fusion", "Simulation"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670"
    },
    { 
      title: "Humanoid Grasping",
      description: "Robotic perception pipeline combining GraspIt! and GPD for optimal scene understanding.",
      className: "md:col-span-1 md:row-span-1",
      icon: <Cpu className="text-purple-400" />,
      tags: ["Robotics", "Computer Vision", "Python"],
      link: "https://github.com/Arnau10a/Humanoid-Robots-Grasping"
    },
    {
      title: "AI Agents",
      description: "Reinforcement Learning models trained for complex decision making in financial markets.",
      className: "md:col-span-1 md:row-span-2",
      icon: <Code className="text-emerald-400" />,
      tags: ["Reinforcement Learning", "Python", "AI"],
      link: "https://github.com/Arnau10a/Bitcoin-Trading-Reinforcement-Learning-Agent"
    },
    {
      title: "Automation & ML",
      description: "Scripts for social media automation and fantasy sports prediction.",
      className: "md:col-span-1 md:row-span-1",
      icon: <Cpu className="text-orange-400" />,
      tags: ["Python", "APIs", "Data"]
    },
    {
      title: "CS Fundamentals",
      description: "Algorithmic problem solving and data structures implementation.",
      className: "md:col-span-1 md:row-span-1",
      icon: <Code className="text-white" />,
      tags: ["C++", "Algorithms", "Optimization"],
      link: "https://github.com/Arnau10a/PRO2-jutge-FIB"
    },
    {
      title: "Creative Engineering",
      description: "Intersection of User Interface Design and Natural Language Processing.",
      className: "md:col-span-2 md:row-span-1",
      icon: <Palette className="text-pink-400" />,
      tags: ["UI/UX", "NLP", "Design"],
      link: "https://github.com/Arnau10a/BIE-TUR"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          THE LABORATORY
        </h2>
        <p className="text-gray-400 max-w-2xl font-sans">
          A collection of experiments and projects exploring the intersection of human interaction and spatial computing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {items.map((item, index) => (
          <BentoItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
