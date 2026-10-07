import React from 'react';
import { useCursor } from '../context/CursorContext';
import { Terminal, Activity } from 'lucide-react';

interface TechItem {
  name: string;
  detail: string;
  level: string;
}

interface DomainSection {
  code: string;
  title: string;
  description: string;
  items: TechItem[];
}

const domains: DomainSection[] = [
  {
    code: "DOM-01",
    title: "Sistemas Nativos & Gráficos 3D en Tiempo Real",
    description: "Desarrollo de bajo nivel enfocado en presupuestos de frame cerrados (<11ms para VR a 90 FPS), gestión de memoria y cómputo espacial.",
    items: [
      { name: "C++ (Modern / STL)", detail: "Concurrencia, punteros inteligentes y optimización de memoria", level: "Core" },
      { name: "C# / Unity XR Engine", detail: "Plugins nativos Android/Quest, SDK de telemetría y física 1:1", level: "Production" },
      { name: "Three.js / WebGL / GLSL", detail: "Shaders personalizados, renderizado diferido y matrices de transformación", level: "Advanced" },
      { name: "Point Cloud Library (PCL)", detail: "Filtrado RANSAC y análisis de normales en superficies 3D", level: "Applied" }
    ]
  },
  {
    code: "DOM-02",
    title: "Robótica Autónoma & Aprendizaje por Refuerzo",
    description: "Interconexión entre sensores de percepción en tiempo real y redes neuronales para toma de decisiones y cinemática de agarre.",
    items: [
      { name: "Python / PyTorch", detail: "Modelado de redes convolucionales y optimizadores de políticas", level: "Production" },
      { name: "Deep RL (DQN + PER)", detail: "Sum-Trees, exploración épsilon adaptativa y estabilización target", level: "Specialist" },
      { name: "ROS / ROS 2", detail: "Nodos asíncronos C++, Action Servers e IPC sin serialización pesada", level: "Applied" },
      { name: "Gymnasium", detail: "Entornos estocásticos a medida y funciones de recompensa no lineales", level: "Core" }
    ]
  },
  {
    code: "DOM-03",
    title: "Arquitectura de Software & Protocolos Hardware",
    description: "Sistemas distribuidos fiables, protocolos inalámbricos de sensores periféricos y persistencia de series temporales.",
    items: [
      { name: "Bluetooth Low Energy (BLE)", detail: "GATT Services, sincronización de relojes y paquetes de telemetría", level: "Embedded XR" },
      { name: "TypeScript & React 19", detail: "Arquitecturas reactivas deterministas, herramientas de monitorización", level: "Advanced" },
      { name: "Linux / POSIX Shell", detail: "Entornos de compilación cruzada, depuración gdb y automatización CLI", level: "Daily" },
      { name: "Git Workflows & CI/CD", detail: "Módulos de paquetes UPM, despliegue continuo y validación estricta", level: "Standard" }
    ]
  }
];

const TechStack: React.FC = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section id="tech-stack" className="relative w-full py-28 px-6 md:px-14 bg-[#050505] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#e5a93c] tracking-[0.25em] uppercase mb-2 font-semibold">
              <Activity size={13} />
              <span>Technical Capabilities</span>
            </div>
            <h2 
              className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Matriz de Ingeniería
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-md leading-relaxed">
            Sin librerías infladas ni frameworks de adorno. Tecnologías aplicadas a cálculo físico determinista, IPC en robótica y telemetría de sensores periféricos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            {domains.slice(0, 2).map((dom) => (
              <div 
                key={dom.code} 
                className="card-tech p-6 sm:p-8"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-xs font-mono">
                  <span className="text-[#e5a93c] font-semibold">{dom.code}</span>
                  <span className="text-slate-500 uppercase tracking-widest font-mono">STACK DOMAIN</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-4 mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  {dom.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {dom.description}
                </p>

                <div className="space-y-3">
                  {dom.items.map((item) => (
                    <div 
                      key={item.name} 
                      className="p-3 bg-black/40 border border-white/[0.05] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-colors hover:border-white/20"
                    >
                      <div>
                        <span className="text-xs font-mono font-semibold text-slate-200 block sm:inline mr-2">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-sans font-light">
                          {item.detail}
                        </span>
                      </div>
                      <span className="tag-tech shrink-0 self-start sm:self-auto">
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div 
              className="card-tech p-6 sm:p-8"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-xs font-mono">
                <span className="text-[#e5a93c] font-semibold">{domains[2].code}</span>
                <span className="text-slate-500 uppercase tracking-widest font-mono">STACK DOMAIN</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-4 mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                {domains[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                {domains[2].description}
              </p>

              <div className="space-y-3">
                {domains[2].items.map((item) => (
                  <div 
                    key={item.name} 
                    className="p-3 bg-black/40 border border-white/[0.05] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-colors hover:border-white/20"
                  >
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-200 block sm:inline mr-2">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans font-light">
                        {item.detail}
                      </span>
                    </div>
                    <span className="tag-tech shrink-0 self-start sm:self-auto">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 border border-white/10 bg-[#080a0f] rounded-[2px] font-mono text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Terminal size={13} className="text-[#e5a93c]" />
                <span className="font-semibold uppercase tracking-wider">HARDWARE TARGETS</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Meta Quest 3 (Snapdragon XR2 Gen 2), Nvidia Jetson AGX Orin, WearOS (Samsung Galaxy Watch 4/5/6) y sensores Bluetooth LE 5.0 estándar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
