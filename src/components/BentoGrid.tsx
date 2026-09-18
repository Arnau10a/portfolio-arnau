import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Terminal, Cpu, Layers } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

interface EngineeringProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  field: string;
  year: string;
  image: string;
  accent: string;
  githubUrl?: string;
  architecture: {
    overview: string;
    coreChallenge: string;
    engineeringSolution: string;
  };
  metrics: { label: string; value: string; detail: string }[];
  stack: string[];
}

const projects: EngineeringProject[] = [
  {
    id: "nuclear-vr",
    num: "01",
    title: "NuclearVerse VR",
    subtitle: "Tokamak Fusion Reactor Maintenance & Procedure Validation System",
    field: "XR Systems & Distributed AI",
    year: "2024",
    image: "/assets/projects/fusion_reactor_vr_nano_banana.webp",
    accent: "#06b6d4",
    architecture: {
      overview: "Holographic VR twin engineered for ITER/DEMO fusion reactors. Enables operators to rehearse critical component replacement inside high-radiation plasma chambers before real-world actuation.",
      coreChallenge: "Real-time physics collisions and sub-millimeter positioning inside complex toroidal geometries with zero spatial tracking latency under head-mounted constraints.",
      engineeringSolution: "Custom 1:1 physics constraints engine in C#/Unity, integrated with a localized RAG agent that streams indexed engineering manuals via microsecond vector searches directly to the user's HUD."
    },
    metrics: [
      { label: "Spatial Scale", value: "1:1 Isometric", detail: "Micrometer precision" },
      { label: "AI Retrieval", value: "Local RAG", detail: "Zero-latency pipeline" },
      { label: "Environment", value: "ITER Standard", detail: "Physics verified" }
    ],
    stack: ["Unity", "C#", "Spatial Computing", "RAG Pipeline", "Vector Embeddings", "XR Interaction"]
  },
  {
    id: "humanoid-robotics",
    num: "02",
    title: "Humanoid Grasping",
    subtitle: "Autonomous Multi-Fingered Manipulation via Point Cloud Telemetry",
    field: "Robotics & Computer Vision",
    year: "2024",
    image: "/assets/projects/robotic_grasping_nano_banana.webp",
    accent: "#a855f7",
    githubUrl: "https://github.com/Arnau10a/Humanoid-Robots-Grasping",
    architecture: {
      overview: "Deep perception pipeline converting unstructured 3D point clouds from RGB-D sensors into feasible kinematic grasp poses for anthropomorphic robotic hands.",
      coreChallenge: "Synthesizing stable multi-contact grasp points on arbitrary non-convex geometries in real time without pre-existing CAD meshes.",
      engineeringSolution: "Implemented surface normal curvature estimation coupled with GraspIt! energy heuristics over ROS nodes, computing optimal force-closure candidates within 80ms."
    },
    metrics: [
      { label: "Inference Time", value: "< 80 ms", detail: "Real-time perception" },
      { label: "Kinematics", value: "16-DOF Hand", detail: "Force closure target" },
      { label: "Middleware", value: "ROS / C++", detail: "Zero IPC loss" }
    ],
    stack: ["ROS", "C++", "Python", "Point Cloud (PCL)", "GraspIt!", "Computer Vision"]
  },
  {
    id: "reinforcement-learning",
    num: "03",
    title: "Fantasy RL Agent",
    subtitle: "Deep Q-Network Policy Optimization in Stochastic Multi-Agent Markets",
    field: "Reinforcement Learning & Systems",
    year: "2024",
    image: "/assets/projects/fantasy_rl_nano_banana.webp",
    accent: "#22c55e",
    githubUrl: "https://github.com/Arnau10a/Fantasy_Machine_learning",
    architecture: {
      overview: "Custom Gymnasium simulation environment modelling complex weekly draft dynamics, budget constraints, and injury probabilities for predictive transfer optimization.",
      coreChallenge: "Extremely high dimensional discrete action space (>10^8 combinations) subject to non-stationary rewards and strict budget caps.",
      engineeringSolution: "Formulated a prioritized experience replay Deep Q-Network (DQN) with target network stabilization and epsilon-decay exploration schedule, yielding a 98.4% policy convergence."
    },
    metrics: [
      { label: "Convergence", value: "98.4%", detail: "Policy optimality" },
      { label: "Framework", value: "Gymnasium", detail: "Custom step physics" },
      { label: "Model Architecture", value: "DQN + PER", detail: "Deep Q-Network" }
    ],
    stack: ["Python", "PyTorch", "Gymnasium", "Deep Q-Learning", "Experience Replay", "NumPy"]
  }
];

const ProjectCase: React.FC<{ project: EngineeringProject }> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useCursor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <article
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-24 md:py-36 border-t border-white/[0.06]"
    >
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Editorial Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-gray-400">
              <span className="text-white font-semibold">{project.num}</span>
              <span className="h-px w-6 bg-white/20" />
              <span style={{ color: project.accent }} className="font-semibold uppercase">
                {project.field}
              </span>
            </div>
            <h3 
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-gray-300 font-sans max-w-2xl font-light">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-gray-400">
            <span>RELEASE // {project.year}</span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/40 text-white transition-all bg-white/[0.02]"
              >
                <Github size={13} />
                <span>Source Code</span>
                <ExternalLink size={11} className="opacity-50" />
              </a>
            )}
          </div>
        </div>

        {/* Editorial Split Layout: Interactive Viewport + Technical Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          
          {/* Left: Viewport Preview (Frameless, Cinematic) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group shadow-2xl">
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ y: imageY }}
                className="w-full h-[116%] object-cover object-center filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%), radial-gradient(circle at top right, ${project.accent}25, transparent 60%)`
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-gray-300 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                  TELEMETRY VERIFIED
                </span>
                <span className="tracking-widest opacity-60 font-mono">CASE ID: {project.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Engineering Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                  <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-1">
                    {metric.label}
                  </p>
                  <p className="text-lg md:text-xl font-bold font-mono text-white tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-[11px] text-gray-400 font-sans mt-0.5 font-light">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Architecture Dossier */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Overview */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">
                <Terminal size={13} style={{ color: project.accent }} />
                <span>Executive Architecture</span>
              </div>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans font-light">
                {project.architecture.overview}
              </p>
            </div>

            {/* Core Engineering Problem */}
            <div className="border-l-2 border-white/10 pl-5 space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
                <Cpu size={12} className="text-white/60" />
                <span>The Core Challenge</span>
              </div>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {project.architecture.coreChallenge}
              </p>
            </div>

            {/* Engineering Solution */}
            <div className="border-l-2 pl-5 space-y-2" style={{ borderColor: `${project.accent}80` }}>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase" style={{ color: project.accent }}>
                <Layers size={12} />
                <span>Technical Implementation</span>
              </div>
              <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans font-light">
                {project.architecture.engineeringSolution}
              </p>
            </div>

            {/* Stack Tags */}
            <div>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-3">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-3 py-1 rounded-md border border-white/10 text-gray-300 bg-white/[0.02]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </article>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="relative w-full bg-[#030303]">
      
      {/* Section Headline Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase block mb-3">
              Selected Systems Engineering
            </span>
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Featured Work
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 font-mono max-w-sm">
            Deep technical case studies spanning spatial computing, autonomous robotics kinematics, and reinforcement learning.
          </p>
        </div>
      </div>

      {/* Full-bleed scroll narrative cases */}
      <div className="w-full">
        {projects.map((project) => (
          <ProjectCase key={project.id} project={project} />
        ))}
      </div>

    </section>
  );
};

export default BentoGrid;
