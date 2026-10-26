import React from 'react';
import { GraduationCap, Building2, Anchor } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

const Background: React.FC = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section id="background" className="w-full py-24 px-6 sm:px-12 md:px-20 border-t border-neutral-900 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
            Background & Credentials
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Academic & Industrial Track
          </h2>
        </div>
        <p className="text-sm text-neutral-400 font-light max-w-md">
          Rigorous engineering background combining top European technical institutions with mission-critical industry projects and operational leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Column 1: Academic Excellence */}
        <div 
          className="card-linear p-7 sm:p-8 space-y-6 flex flex-col justify-between"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <GraduationCap size={18} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Education
              </span>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                Academic Excellence
              </h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-400 font-light leading-relaxed pt-2">
              <div className="border-l border-neutral-800 pl-3 space-y-1">
                <div className="text-white font-medium">Bachelor's in Computer Engineering</div>
                <div className="text-neutral-500 text-xs">Universitat Politècnica de Catalunya (UPC)</div>
                <p className="text-xs text-neutral-400 pt-1">
                  Focus on High-Performance Computing (HPC), computer graphics, advanced algorithms, and artificial intelligence.
                </p>
              </div>

              <div className="border-l border-neutral-800 pl-3 space-y-1 pt-2">
                <div className="text-white font-medium">Erasmus Academic Program</div>
                <div className="text-neutral-500 text-xs">Czech Technical University in Prague (CTU)</div>
                <p className="text-xs text-neutral-400 pt-1">
                  Advanced coursework in systems architecture, embedded computing, and distributed networks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Industrial Experience */}
        <div 
          className="card-linear p-7 sm:p-8 space-y-6 flex flex-col justify-between"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <Building2 size={18} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Industry
              </span>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                Industrial Experience
              </h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-400 font-light leading-relaxed pt-2">
              <div className="border-l border-neutral-800 pl-3 space-y-1">
                <div className="text-white font-medium">Software Engineer Intern</div>
                <div className="text-neutral-500 text-xs">IDOM Consulting, Engineering, Architecture</div>
                <p className="text-xs text-neutral-400 pt-1">
                  Nuclear fusion engineering for ITER / IFMIF-DONES. Built real-time VR digital twins, CAD polygon optimization pipelines, and embedded offline RAG retrieval.
                </p>
              </div>

              <div className="border-l border-neutral-800 pl-3 space-y-1 pt-2">
                <div className="text-white font-medium">R&D Software Engineering Intern</div>
                <div className="text-neutral-500 text-xs">Centre de Realitat Virtual de Barcelona (CRV - UPC)</div>
                <p className="text-xs text-neutral-400 pt-1">
                  Engineered zero-allocation BLE physiological telemetry streaming pipelines from WearOS wearables directly into Meta Quest VR engines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Leadership & High-Pressure Operations */}
        <div 
          className="card-linear p-7 sm:p-8 space-y-6 flex flex-col justify-between"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <Anchor size={18} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Operations
              </span>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                Leadership & High-Pressure
              </h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-400 font-light leading-relaxed pt-2">
              <div className="border-l border-neutral-800 pl-3 space-y-1">
                <div className="text-white font-medium">Head Instructor & Sailing Coordinator</div>
                <div className="text-neutral-500 text-xs">Institut de Nàutica de Barcelona</div>
                <p className="text-xs text-neutral-400 pt-1">
                  Fleet coordination, operational risk mitigation, emergency safety protocols, and concise team communication under demanding maritime conditions.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-900 text-xs text-neutral-400 mt-2">
                <span className="text-neutral-300 font-medium block mb-1">Transferable Engineering Principles:</span>
                Calm execution under pressure, deterministic safety redundancies, and clear cross-team communication.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Background;