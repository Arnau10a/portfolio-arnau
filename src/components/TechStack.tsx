import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Network, Layers, Sparkles, Binary } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

interface CapabilityGroup {
  icon: React.ReactNode;
  category: string;
  badge: string;
  description: string;
  technologies: { name: string; tag: string }[];
}

const capabilities: CapabilityGroup[] = [
  {
    icon: <Cpu className="w-5 h-5 text-amber-200" />,
    category: "Systems & Low-Latency 3D",
    badge: "Core Engineering",
    description: "Real-time physics calculation, memory-efficient spatial computation, and GPU shaders for interactive simulations.",
    technologies: [
      { name: "C++", tag: "Native / Performance" },
      { name: "C# / Unity", tag: "Simulation Engines" },
      { name: "Three.js / WebGL", tag: "Custom Shaders / GLSL" },
      { name: "Point Cloud (PCL)", tag: "3D Spatial Telemetry" },
      { name: "Multi-threading", tag: "Concurrency" }
    ]
  },
  {
    icon: <Network className="w-5 h-5 text-stone-300" />,
    category: "AI, RL & Robotics Vision",
    badge: "Intelligent Systems",
    description: "Designing neural policies, autonomous manipulation kinematics, and low-latency inference pipelines.",
    technologies: [
      { name: "Python / PyTorch", tag: "Deep Learning" },
      { name: "Deep RL (DQN / PER)", tag: "Policy Optimization" },
      { name: "ROS (Robot OS)", tag: "IPC & Kinematics" },
      { name: "Gymnasium", tag: "Environment Physics" },
      { name: "RAG & Vector Search", tag: "Context Pipelines" },
      { name: "OpenCV", tag: "Perception" }
    ]
  },
  {
    icon: <Layers className="w-5 h-5 text-emerald-300" />,
    category: "Modern Software & Architecture",
    badge: "Full Production",
    description: "Production-grade software craftsmanship, reactive interfaces, deterministic states, and developer tooling.",
    technologies: [
      { name: "TypeScript", tag: "Strict Typing" },
      { name: "React 19 / Vite", tag: "Modern Web Frontends" },
      { name: "REST & WebSockets", tag: "Real-Time Comms" },
      { name: "Linux / Shell", tag: "DevOps & CLI" },
      { name: "Git / CI Workflows", tag: "Version Control" },
      { name: "Framer Motion", tag: "Fluid UI Physics" }
    ]
  }
];

const TechStack: React.FC = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section id="tech-stack" className="relative w-full py-28 px-6 md:px-12 bg-[#030303] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3">
              <Binary size={14} />
              <span>Engineering Competencies</span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Core Architecture & Stack
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 font-mono max-w-md">
            Bridging native low-level systems engineering with modern artificial intelligence architectures and interactive 3D computing.
          </p>
        </div>

        {/* 3 Pillar Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
          {capabilities.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10 text-gray-400 bg-black/40">
                    {item.badge}
                  </span>
                </div>

                <h3 
                  className="text-xl md:text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {item.category}
                </h3>
                
                <p className="text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed mb-8">
                  {item.description}
                </p>
              </div>

              {/* Technologies List */}
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                {item.technologies.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center justify-between text-xs font-mono py-1.5 px-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-gray-200 font-medium">{tech.name}</span>
                    <span className="text-[10px] text-gray-500 tracking-wider uppercase">{tech.tag}</span>
                  </div>
                ))}
              </div>

              {/* Glow Accent */}
              <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Engineering Principles Strip */}
        <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-black/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sparkles className="text-cyan-400 w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-mono text-gray-300">
              <strong className="text-white font-semibold">Engineering Philosophy:</strong> Clean architectural abstractions, deterministic data pipelines, and low latency over premature complexity.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono text-gray-400 uppercase tracking-widest whitespace-nowrap">
            <span>// 60+ FPS Realtime</span>
            <span>// Type-Safe</span>
            <span>// Modular</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;
