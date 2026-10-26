import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { 
  Cpu, 
  Terminal, 
  Layers, 
  Activity, 
  Zap, 
  Database, 
  Boxes, 
  Radio, 
  GitBranch, 
  Workflow, 
  Gauge, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  brandColor: string;
  runtime: string;
  role: string;
  benchmark: string;
  projectRelation: string;
  iconType: 'cpp' | 'unity' | 'glsl' | 'lod' | 'blender' | 'profiler' | 'llama' | 'usearch' | 'rag' | 'python' | 'claude' | 'ble' | 'android' | 'linux' | 'git' | 'rest' | 'docker';
}

interface DomainGroup {
  title: string;
  badge: string;
  description: string;
  items: TechItem[];
}

const techCatalog: Record<string, TechItem> = {
  cpp: {
    id: 'cpp',
    name: 'C++ (C++17/20)',
    shortName: 'C++',
    category: 'Real-Time 3D & Graphics',
    brandColor: '#00599C',
    runtime: 'Native x86_64 / ARM64',
    role: 'LOD polygon decimation, PCL point cloud filtering & deterministic memory allocation',
    benchmark: 'Zero-overhead execution & sub-millisecond loops',
    projectRelation: 'Fusion Reactor Digital Twin & Point Cloud Robotics',
    iconType: 'cpp'
  },
  unity: {
    id: 'unity',
    name: 'C# / Unity XR',
    shortName: 'Unity',
    category: 'Real-Time 3D & Graphics',
    brandColor: '#22D3EE',
    runtime: 'Unity Engine (IL2CPP) / Meta Quest Android',
    role: 'Stereoscopic VR spatial rendering, custom physics colliders & UPM packages',
    benchmark: 'Locked 72/90 FPS production frame budget',
    projectRelation: 'Tokamak Simulation & Biometric VR Streaming',
    iconType: 'unity'
  },
  glsl: {
    id: 'glsl',
    name: 'GLSL Shaders',
    shortName: 'GLSL',
    category: 'Real-Time 3D & Graphics',
    brandColor: '#10B981',
    runtime: 'GPU Vertex / Fragment Stages',
    role: 'Hardware-accelerated viewport lighting, procedural grids and depth passes',
    benchmark: '< 2.5 ms GPU frame render pass',
    projectRelation: 'Tokamak Isometric Visualization & 3D WebGL Labs',
    iconType: 'glsl'
  },
  lod: {
    id: 'lod',
    name: '3D Asset Pipelines & LOD',
    shortName: 'CAD / LOD',
    category: 'Real-Time 3D & Graphics',
    brandColor: '#F59E0B',
    runtime: 'Pre-computation & Dynamic Runtime Switching',
    role: 'Polycount decimation from raw industrial CAD (+5M polys) into real-time meshes',
    benchmark: '85% vertex reduction with zero topology distortion',
    projectRelation: 'IDOM ITER Torus Geometry Pipeline',
    iconType: 'lod'
  },
  blender: {
    id: 'blender',
    name: 'Blender & Mesh Optimization',
    shortName: 'Blender',
    category: 'Real-Time 3D & Graphics',
    brandColor: '#F97316',
    runtime: 'Python Scripted Asset Pipeline',
    role: 'Procedural mesh cleaning, UV packing, and normal map baking for XR assets',
    benchmark: 'Automated batch geometry decimation',
    projectRelation: 'Fusion Reactor Toroidal Simulation',
    iconType: 'blender'
  },
  profiler: {
    id: 'profiler',
    name: 'Real-Time Profiling',
    shortName: 'Profiling',
    category: 'Real-Time 3D & Graphics',
    brandColor: '#EC4899',
    runtime: 'Unity Profiler / RenderDoc / Tracy',
    role: 'GC allocation tracking, draw call batching and frame-timing bottleneck isolation',
    benchmark: 'Zero garbage-collection spikes per update cycle',
    projectRelation: 'Biometric Wearable VR Pipeline',
    iconType: 'profiler'
  },
  llama: {
    id: 'llama',
    name: 'Local LLMs (llama.cpp)',
    shortName: 'llama.cpp',
    category: 'Applied AI & Systems',
    brandColor: '#8B5CF6',
    runtime: 'C++ Quantized GGUF Engine (CPU/VRAM)',
    role: 'Offline technical manual retrieval without external internet or third-party APIs',
    benchmark: 'Sub-second token generation on local hardware',
    projectRelation: 'Fusion Reactor Digital Twin (Local RAG)',
    iconType: 'llama'
  },
  usearch: {
    id: 'usearch',
    name: 'Vector Search (USearch)',
    shortName: 'USearch',
    category: 'Applied AI & Systems',
    brandColor: '#06B6D4',
    runtime: 'In-Memory SIMD C++ / Python Engine',
    role: 'High-speed Approximate Nearest Neighbor (ANN) cosine similarity indexing',
    benchmark: '< 0.8 ms vector retrieval latency across 50k nodes',
    projectRelation: 'Embedded Technical Documentation Engine',
    iconType: 'usearch'
  },
  rag: {
    id: 'rag',
    name: 'RAG Architectures',
    shortName: 'Local RAG',
    category: 'Applied AI & Systems',
    brandColor: '#38BDF8',
    runtime: 'Deterministic In-Process Context Injection',
    role: 'Grounding LLM reasoning in verified nuclear facility manuals and CAD specs',
    benchmark: 'Zero hallucination on safety-critical tolerances',
    projectRelation: 'ITER Technical Maintenance Assistant',
    iconType: 'rag'
  },
  python: {
    id: 'python',
    name: 'Python (NumPy / SciPy)',
    shortName: 'Python',
    category: 'Applied AI & Systems',
    brandColor: '#3776AB',
    runtime: 'CPython 3.11+ / C-Extension Bindings',
    role: 'Vectorized mathematical modelling, embeddings generation and benchmarking suites',
    benchmark: 'Vectorized array processing with minimal memory copies',
    projectRelation: 'Point Cloud Robotics & Vector Indexing Benchmarks',
    iconType: 'python'
  },
  claude: {
    id: 'claude',
    name: 'AI Workflows (Claude Code)',
    shortName: 'Claude Code',
    category: 'Applied AI & Systems',
    brandColor: '#D97706',
    runtime: 'Agentic Terminal Tooling & CI Validation',
    role: 'Automated test harness generation, architectural verification & rapid prototyping',
    benchmark: 'Continuous codebase rigor & typed refactoring',
    projectRelation: 'Core Portfolio Architecture & Toolchains',
    iconType: 'claude'
  },
  ble: {
    id: 'ble',
    name: 'Bluetooth Low Energy (BLE)',
    shortName: 'BLE',
    category: 'Hardware & Infrastructure',
    brandColor: '#3B82F6',
    runtime: 'GATT Protocol / Native Bluetooth Stack',
    role: 'Real-time telemetry packet streaming (Heart Rate, IMU 6-DOF, Barometer)',
    benchmark: '< 15 ms transmission latency over 2.4 GHz RF',
    projectRelation: 'WearOS Biometric VR Telemetry Pipeline',
    iconType: 'ble'
  },
  android: {
    id: 'android',
    name: 'WearOS / Android SDK',
    shortName: 'Android / WearOS',
    category: 'Hardware & Infrastructure',
    brandColor: '#34A853',
    runtime: 'Android 14+ / WearOS Runtime & Meta Horizon OS',
    role: 'Companion background telemetry service with JNI zero-overhead C# bindings',
    benchmark: 'Zero battery throttle during continuous sensor collection',
    projectRelation: 'CRV-UPC Biofeedback XR System',
    iconType: 'android'
  },
  linux: {
    id: 'linux',
    name: 'Linux / Unix',
    shortName: 'Linux',
    category: 'Hardware & Infrastructure',
    brandColor: '#FCC624',
    runtime: 'POSIX / Ubuntu LTS / Debian',
    role: 'Robotics middleware runtime, headless build servers and deterministic toolchains',
    benchmark: 'Real-time kernel scheduling & low-jitter loops',
    projectRelation: 'ROS Robotics & HPC Coursework at UPC/CTU',
    iconType: 'linux'
  },
  git: {
    id: 'git',
    name: 'Git & CI/CD',
    shortName: 'Git / CI',
    category: 'Hardware & Infrastructure',
    brandColor: '#F05032',
    runtime: 'Git / GitHub Actions / UPM Package Manager',
    role: 'Version control, automated build verification and package distribution',
    benchmark: 'Automated semantic versioning and reproducible builds',
    projectRelation: 'UPM Unity Packages & Open Source Repositories',
    iconType: 'git'
  },
  rest: {
    id: 'rest',
    name: 'WebSockets & REST',
    shortName: 'Sockets / REST',
    category: 'Hardware & Infrastructure',
    brandColor: '#A855F7',
    runtime: 'TCP/IP Event Streaming & HTTP/2',
    role: 'Low-latency telemetry broadcasting and distributed inter-process coordination',
    benchmark: 'Bi-directional frame synchronization',
    projectRelation: 'Distributed Multi-Node Telemetry',
    iconType: 'rest'
  },
  docker: {
    id: 'docker',
    name: 'Docker',
    shortName: 'Docker',
    category: 'Hardware & Infrastructure',
    brandColor: '#2496ED',
    runtime: 'Linux Containers (Containerd / Docker Engine)',
    role: 'Reproducible builds for ROS environments and isolated AI benchmark workers',
    benchmark: 'Deterministic environment parity across host OS',
    projectRelation: 'Robotics Perception & Offline Vector Indexing',
    iconType: 'docker'
  }
};

const domains: DomainGroup[] = [
  {
    title: "Real-Time 3D & Graphics Engineering",
    badge: "Graphics & Runtimes",
    description: "Ultra-low latency rendering, deterministic physics boundaries, and industrial CAD decimation.",
    items: [
      techCatalog.cpp,
      techCatalog.unity,
      techCatalog.glsl,
      techCatalog.lod,
      techCatalog.blender,
      techCatalog.profiler
    ]
  },
  {
    title: "Applied AI & Systems Programming",
    badge: "Embedded & Vector AI",
    description: "Local, zero-cloud machine intelligence, high-dimensional vector search, and offline RAG pipelines.",
    items: [
      techCatalog.llama,
      techCatalog.usearch,
      techCatalog.rag,
      techCatalog.python,
      techCatalog.claude
    ]
  },
  {
    title: "Hardware, Telemetry & Infrastructure",
    badge: "Protocols & Systems",
    description: "Sensor bus integration, low-jitter wireless telemetry, and containerized native runtimes.",
    items: [
      techCatalog.ble,
      techCatalog.android,
      techCatalog.linux,
      techCatalog.git,
      techCatalog.rest,
      techCatalog.docker
    ]
  }
];

// Vector SVG Icon Renderer
const TechIcon: React.FC<{ type: TechItem['iconType']; color: string; isHovered: boolean }> = ({ type, color, isHovered }) => {
  const iconColor = isHovered ? color : '#9CA3AF';
  
  switch (type) {
    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 transition-colors duration-300">
          <path d="M4 12C4 7.58172 7.58172 4 12 4C14.7 4 17.07 5.33 18.5 7.4L16.2 9C15.2 7.8 13.7 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C13.7 17 15.2 16.2 16.2 15L18.5 16.6C17.07 18.67 14.7 20 12 20C7.58172 20 4 16.4183 4 12Z" fill={iconColor} />
          <path d="M19 11H21V13H19V15H17V13H15V11H17V9H19V11Z" fill={iconColor} />
        </svg>
      );
    case 'unity':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 transition-colors duration-300">
          <path d="M12 2L3 7.5V16.5L12 22L21 16.5V7.5L12 2ZM12 4.4L18.6 8.5L14.7 10.7L12 7.6L9.3 10.7L5.4 8.5L12 4.4ZM5 10.3L8.9 12.5V17L5 14.8V10.3ZM12 19.6L10.3 15.2H13.7L12 19.6ZM19 14.8L15.1 17V12.5L19 10.3V14.8Z" fill={iconColor} />
        </svg>
      );
    case 'glsl':
      return <Zap size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'lod':
      return <Layers size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'blender':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 transition-colors duration-300">
          <circle cx="12" cy="14" r="5" stroke={iconColor} strokeWidth="2" />
          <circle cx="12" cy="14" r="2" fill={iconColor} />
          <path d="M12 4V9M18 7L14 11M6 7L10 11" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'profiler':
      return <Activity size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'llama':
      return <Cpu size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'usearch':
      return <Database size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'rag':
      return <Sparkles size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 transition-colors duration-300">
          <path d="M11.9 2C8.3 2 8.5 3.6 8.5 3.6L8.5 5.2H12.1V5.7H5.2C5.2 5.7 2 5.3 2 9C2 12.7 4.8 12.5 4.8 12.5H6.2V10.7C6.2 9.2 7.4 8 8.9 8H12.7C13.9 8 14.8 7.1 14.8 5.9V3.8C14.8 2.6 13.7 2 11.9 2ZM10.3 3.6C10.7 3.6 11.1 4 11.1 4.4C11.1 4.8 10.7 5.2 10.3 5.2C9.9 5.2 9.5 4.8 9.5 4.4C9.5 4 9.9 3.6 10.3 3.6Z" fill={iconColor} />
          <path d="M12.1 22C15.7 22 15.5 20.4 15.5 20.4L15.5 18.8H11.9V18.3H18.8C18.8 18.3 22 18.7 22 15C22 11.3 19.2 11.5 19.2 11.5H17.8V13.3C17.8 14.8 16.6 16 15.1 16H11.3C10.1 16 9.2 16.9 9.2 18.1V20.2C9.2 21.4 10.3 22 12.1 22ZM13.7 20.4C13.3 20.4 12.9 20 12.9 19.6C12.9 19.2 13.3 18.8 13.7 18.8C14.1 18.8 14.5 19.2 14.5 19.6C14.5 20 14.1 20.4 13.7 20.4Z" fill={iconColor} />
        </svg>
      );
    case 'claude':
      return <Terminal size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'ble':
      return <Radio size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'android':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 transition-colors duration-300">
          <path d="M6 18C6 19.1 6.9 20 8 20H9V22C9 22.6 9.4 23 10 23C10.6 23 11 22.6 11 22V20H13V22C13 22.6 13.4 23 14 23C14.6 23 15 22.6 15 22V20H16C17.1 20 18 19.1 18 18V10H6V18ZM4 10C3.4 10 3 10.4 3 11V17C3 17.6 3.4 18 4 18C4.6 18 5 17.6 5 17V11C5 10.4 4.6 10 4 10ZM20 10C19.4 10 19 10.4 19 11V17C19 17.6 19.4 18 20 18C20.6 18 21 17.6 21 17V11C21 10.4 20.6 10 20 10ZM16.5 4.7L17.8 2.5C17.9 2.2 17.8 1.9 17.6 1.8C17.3 1.7 17 1.8 16.9 2L15.5 4.3C14.5 3.8 13.3 3.5 12 3.5C10.7 3.5 9.5 3.8 8.5 4.3L7.1 2C7 1.8 6.7 1.7 6.4 1.8C6.2 1.9 6.1 2.2 6.2 2.5L7.5 4.7C4.8 5.9 3 8.5 3 9.5H21C21 8.5 19.2 5.9 16.5 4.7ZM9 7.5C8.4 7.5 8 7.1 8 6.5C8 5.9 8.4 5.5 9 5.5C9.6 5.5 10 5.9 10 6.5C10 7.1 9.6 7.5 9 7.5ZM15 7.5C14.4 7.5 14 7.1 14 6.5C14 5.9 14.4 5.5 15 5.5C15.6 5.5 16 5.9 16 6.5C16 7.1 15.6 7.5 15 7.5Z" fill={iconColor} />
        </svg>
      );
    case 'linux':
      return <Terminal size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'git':
      return <GitBranch size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'rest':
      return <Workflow size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    case 'docker':
      return <Boxes size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
    default:
      return <Gauge size={20} style={{ color: iconColor }} className="transition-colors duration-300" />;
  }
};

// Bento Card with Magnetic Spotlight
const SpotlightDomainCard: React.FC<{
  group: DomainGroup;
  activeId: string;
  onHoverTech: (tech: TechItem) => void;
}> = ({ group, activeId, onHoverTech }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl border border-neutral-800/80 bg-[#070707] p-7 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-neutral-700"
      style={{
        backgroundImage: mousePos
          ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.045), transparent 80%)`
          : undefined
      }}
    >
      {/* Top Header */}
      <div className="space-y-3 pb-6 border-b border-neutral-900">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
            {group.badge}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
          {group.title}
        </h3>
        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          {group.description}
        </p>
      </div>

      {/* Grid of Interactive Tech Items */}
      <div className="grid grid-cols-2 gap-2.5 pt-6">
        {group.items.map((item) => {
          const isSelected = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onHoverTech(item)}
              onMouseEnter={() => onHoverTech(item)}
              className={`group relative text-left p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                isSelected
                  ? 'bg-neutral-900/90 border-neutral-700 shadow-lg'
                  : 'bg-neutral-950/60 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/40'
              }`}
            >
              {/* Subtle indicator dot */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0"
                style={{
                  backgroundColor: isSelected ? `${item.brandColor}18` : '#121212',
                  border: isSelected ? `1px solid ${item.brandColor}40` : '1px solid #1e1e1e'
                }}
              >
                <TechIcon type={item.iconType} color={item.brandColor} isHovered={isSelected} />
              </div>

              <div className="min-w-0 flex-1">
                <span className={`block text-xs font-medium truncate transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                }`}>
                  {item.shortName}
                </span>
                <span className="block text-[10px] font-mono text-neutral-500 truncate">
                  {item.benchmark.split(' ')[0]} {item.benchmark.split(' ')[1] || ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TechStack: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const [selectedTech, setSelectedTech] = useState<TechItem>(techCatalog.cpp);

  return (
    <section id="tech-stack" className="w-full py-24 px-6 sm:px-12 md:px-20 border-t border-neutral-900 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Interactive Systems Architecture
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Engineering Foundation
          </h2>
        </div>
        <p className="text-sm text-neutral-400 font-light max-w-md">
          Explore the runtime environments, low-level algorithms, and deterministic constraints powering every deployed system.
        </p>
      </div>

      {/* 3-Column Bento Grid with Magnetic Spotlight */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        onMouseEnter={() => setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        {domains.map((group) => (
          <SpotlightDomainCard
            key={group.title}
            group={group}
            activeId={selectedTech.id}
            onHoverTech={setSelectedTech}
          />
        ))}
      </div>

      {/* Live Telemetry Dock / Systems Inspector */}
      <div className="mt-8 rounded-2xl border border-neutral-800 bg-[#080808] p-6 sm:p-8 relative overflow-hidden">
        {/* Glow ambient light of current tech */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: selectedTech.brandColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-900">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-md shrink-0"
              style={{
                backgroundColor: `${selectedTech.brandColor}18`,
                border: `1px solid ${selectedTech.brandColor}40`
              }}
            >
              <TechIcon type={selectedTech.iconType} color={selectedTech.brandColor} isHovered={true} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                <span>SYSTEM INSPECTOR // LIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="text-2xl font-bold text-white tracking-tight">
                {selectedTech.name}
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
              Domain: <span className="text-white font-medium">{selectedTech.category}</span>
            </span>
            <span 
              className="px-3 py-1 rounded-full text-xs font-mono font-medium"
              style={{
                backgroundColor: `${selectedTech.brandColor}15`,
                color: selectedTech.brandColor,
                border: `1px solid ${selectedTech.brandColor}35`
              }}
            >
              {selectedTech.runtime}
            </span>
          </div>
        </div>

        {/* Telemetry Data Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTech.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs font-mono"
          >
            {/* Core Architectural Role */}
            <div className="space-y-1.5 p-4 rounded-xl bg-neutral-950 border border-neutral-900">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] block">
                Architectural Role & Workload
              </span>
              <p className="text-neutral-300 font-sans text-sm font-light leading-relaxed">
                {selectedTech.role}
              </p>
            </div>

            {/* Performance Benchmark & Constraint */}
            <div className="space-y-1.5 p-4 rounded-xl bg-neutral-950 border border-neutral-900">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] block">
                Target Benchmark & Constraint
              </span>
              <p className="text-emerald-400 font-mono text-sm font-semibold">
                {selectedTech.benchmark}
              </p>
              <span className="text-[11px] text-neutral-500 font-light block pt-0.5">
                Deterministic execution target verified in hardware tests
              </span>
            </div>

            {/* Production Project Relation */}
            <div className="space-y-1.5 p-4 rounded-xl bg-neutral-950 border border-neutral-900">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] block">
                Deployed In Engineering System
              </span>
              <p className="text-white font-mono text-sm font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedTech.brandColor }} />
                {selectedTech.projectRelation}
              </p>
              <a
                href="#projects"
                className="text-[11px] text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 pt-1"
              >
                <span>Jump to case study</span>
                <ArrowUpRight size={11} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;