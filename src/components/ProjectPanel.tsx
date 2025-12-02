import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveModel from './InteractiveModel';

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  image: string;
  images?: string[]; // Array of images for the slider
  year: string;
  description: string;
  techStack: ('react' | 'three' | 'blender' | 'webgl')[];
  visualHook?: string; // URL for the small bottom-left image
  modelUrl?: string; // Path to .glb/.gltf model in public folder
}

interface ProjectPanelProps {
  project: ProjectData;
  index: number;
}

const ProjectPanel: React.FC<ProjectPanelProps> = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use provided images array or fallback to single image
  const projectImages = project.images && project.images.length > 0 ? project.images : [project.image];

  useEffect(() => {
    if (projectImages.length <= 1) return;
    const timer = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentImageIndex, projectImages.length]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };



  // Map tech stack to icons


  return (
    <div className="w-full mb-24 relative">
      <div className="relative bg-black/50 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden">
        {/* Background Gradient Blob for depth */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* LEFT COLUMN - INFO */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Header Section */}
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-widest border-white/20">
                PROJECT:
              </h3>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                {project.title}
              </h2>
              <div className="pt-2 flex items-center space-x-2 text-sm md:text-base text-gray-400 tracking-wider">
                <span className="font-bold text-white/80">CATEGORY:</span>
                <span>{project.category}</span>
              </div>
            </div>

            {/* Description */}
            <div className="py-4 space-y-4">
              <p className="text-xl text-gray-100 leading-relaxed font-light">
                {project.description}
              </p>
              <div className="h-px w-12 bg-white/30" />
              <p className="text-base text-gray-200">
                Built with custom GLSL shaders and React Three Fiber for high performance.
              </p>
            </div>

            {/* Visual Hook (Interactive 3D Model) */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/20 group">
               <InteractiveModel modelUrl={project.modelUrl} />
               
               {/* Overlay Grid Effect */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>

          {/* RIGHT COLUMN - MAIN IMAGE SLIDER */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 group"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Slider */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={projectImages[currentImageIndex]} 
                  alt={`${project.title} - View ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              {/* Glass Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/60 pointer-events-none" />
              
              {/* Navigation Controls (Visible on Hover) */}
              {projectImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>


                </>
              )}

              {/* Number */}
              <div className="absolute top-6 left-8 text-6xl md:text-8xl font-light text-white/90 font-mono pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Year & Progress */}
              <div className="absolute bottom-6 right-8 flex flex-col items-end pointer-events-none gap-2 z-20">
                <div className="text-6xl md:text-8xl font-light text-white/90 font-mono tracking-tighter leading-none">
                  '{project.year.slice(-2)}
                </div>
                {projectImages.length > 1 && (
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                )}
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
