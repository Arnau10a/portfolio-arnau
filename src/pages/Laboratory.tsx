
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const specimens = [
  { id: 1, name: 'GENESIS_CORE', epoch: 400, image: '/assets/laboratory/start.webp', type: 'ORIGIN' },
  { id: 2, name: 'FLORA_ALPHA', epoch: 415, image: '/assets/laboratory/GENERATIVE_FLORA.webp', type: 'ORGANIC' },
  { id: 3, name: 'NEURAL_STEM', epoch: 430, image: '/assets/laboratory/GENERATIVE_FLORA (2).webp', type: 'SYNTHETIC' },
  { id: 4, name: 'CORTEX_BLOOM', epoch: 445, image: '/assets/laboratory/GENERATIVE_FLORA (3).webp', type: 'HYBRID' },
  { id: 5, name: 'SYNAPSE_LEAF', epoch: 460, image: '/assets/laboratory/GENERATIVE_FLORA (4).webp', type: 'ORGANIC' },
  { id: 6, name: 'VOID_PETAL', epoch: 490, image: '/assets/laboratory/GENERATIVE_FLORA (6).webp', type: 'SYNTHETIC' },
  { id: 7, name: 'DATA_SPORE', epoch: 505, image: '/assets/laboratory/GENERATIVE_FLORA (7).webp', type: 'HYBRID' },
  { id: 8, name: 'CYBER_ROOT', epoch: 520, image: '/assets/laboratory/GENERATIVE_FLORA (8).webp', type: 'ORGANIC' },
  { id: 9, name: 'LOGIC_FERN', epoch: 535, image: '/assets/laboratory/GENERATIVE_FLORA (9).webp', type: 'SYNTHETIC' },
  { id: 10, name: 'MATRIX_MOSS', epoch: 550, image: '/assets/laboratory/GENERATIVE_FLORA (10).webp', type: 'HYBRID' },
  { id: 11, name: 'QUANTUM_VINE', epoch: 565, image: '/assets/laboratory/GENERATIVE_FLORA (11).webp', type: 'ORGANIC' },
  { id: 12, name: 'BINARY_BUD', epoch: 580, image: '/assets/laboratory/GENERATIVE_FLORA (12).webp', type: 'SYNTHETIC' },
];

const Laboratory = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
    
    // Parallax Text
    const textX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Track active item index roughly based on scroll progress
    const [activeIndex, setActiveIndex] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.floor(latest * specimens.length * 1.1), // 1.1 multiplier helps reach end
            specimens.length - 1
        );
        setActiveIndex(index);
    });

    const activeSpecimen = specimens[activeIndex];

    // Preload images
    useEffect(() => {
        specimens.forEach((specimen) => {
            const img = new Image();
            img.src = specimen.image;
        });
    }, []);

    return (
        <div className="bg-[#030303] min-h-screen w-full text-white font-sans selection:bg-cyan-500/30">
            {/* Header / Nav */}
            <header className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                <Link to="/" className="pointer-events-auto flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] font-mono text-cyan-400 group hover:text-white transition-colors uppercase">
                    <div className="w-8 h-px bg-cyan-400 group-hover:w-12 transition-all duration-300" />
                    <ArrowLeft size={14} /> 
                    Back to Base
                </Link>
                <div className="text-right hidden md:block">
                    <div className="flex items-center gap-2 justify-end mb-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[10px] tracking-widest font-mono text-cyan-500">LIVE FEED</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono">SECURE CONNECTION // PROTOCOL v.9</p>
                </div>
            </header>

            {/* THE VIEWPORT - FIXED LAYER */}
            <div className="fixed inset-0 overflow-hidden z-10">
                {/* Fixed Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Giant Parallax Title */}
                    <motion.div 
                        style={{ x: textX }}
                        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] select-none"
                    >
                        <h1 className="text-[40vh] font-black tracking-tighter leading-none font-syne stroke-text">
                            LABORATORY
                        </h1>
                    </motion.div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
                </div>

                {/* Horizontal Gallery */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center">
                    <motion.div 
                        style={{ x }} 
                        className="flex gap-12 md:gap-32 pl-[10vw] pr-[10vw] items-center"
                    >
                        {specimens.map((specimen, index) => {
                           return <GalleryItem key={specimen.id} specimen={specimen} active={activeIndex === index} />;
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Fixed Info Panel (Bottom Left) -- z-40 to sit above gallery */}
            <div className="fixed bottom-0 left-0 p-8 z-40 w-full md:w-96 hidden md:block pointer-events-none">
                <div className="bg-black/40 backdrop-blur-xl border-l-2 border-cyan-500/50 p-6 rounded-r-2xl transform transition-all duration-500 hover:border-cyan-400">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl font-bold font-syne text-white">
                                0{activeSpecimen.id < 10 ? `0${activeSpecimen.id}` : activeSpecimen.id}
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                            <span className="text-xs font-mono text-cyan-400">{activeSpecimen.type}</span>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-2 tracking-tight">{activeSpecimen.name}</h2>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6 text-[10px] font-mono text-gray-400">
                            <div>
                                <span className="block text-cyan-500/50 mb-1">EPOCH</span>
                                {activeSpecimen.epoch}
                            </div>
                            <div>
                                <span className="block text-cyan-500/50 mb-1">INTEGRITY</span>
                                98.4%
                            </div>
                            <div>
                                <span className="block text-cyan-500/50 mb-1">STATUS</span>
                                <span className="text-emerald-400/80">STABLE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-50">
                <motion.div 
                    style={{ scaleX: scrollYProgress }} 
                    className="h-full bg-cyan-500 origin-left"
                />
            </div>
            
            {/* Mobile Scroll Hint */}
            <div className="fixed bottom-8 right-8 z-40 md:hidden animate-bounce text-cyan-500">
                <Activity size={24} />
            </div>

            {/* GHOST SCROLL SPACER - The only thing that actually scrolls */}
            <div ref={targetRef} className="relative h-[600vh] w-full pointer-events-none" />
        </div>
    );
};

const GalleryItem = ({ specimen, active }: { specimen: typeof specimens[0], active: boolean }) => {
    return (
        <div className={`relative shrink-0 w-[80vw] md:w-[45vh] aspect-[2/3] flex flex-col justify-center transition-all duration-700 ${active ? 'scale-110 opacity-100 z-10' : 'scale-90 opacity-40 grayscale blur-[1px]'}`}>
            {/* Image Frame */}
            <div className="relative w-full h-full overflow-hidden bg-white/5 group rounded-3xl">
                <img 
                    src={specimen.image}
                    alt={specimen.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Tech Overlays */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500 rounded-3xl" />
                
                {/* Corner Markers */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/30" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30" />
                
                {/* Active Indicator Overlay */}
                {active && <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />}
            </div>

            {/* Mobile Info (Visible only on mobile inside the card flow) */}
            <div className="md:hidden mt-4 text-center">
                <h3 className="text-xl font-bold font-syne">{specimen.name}</h3>
                <p className="text-xs font-mono text-cyan-500">{specimen.type} // {specimen.epoch}</p>
            </div>
        </div>
    );
}

export default Laboratory;
