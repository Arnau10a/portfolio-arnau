import React from 'react';
import { useCursor } from '../context/CursorContext';

interface StackGroup {
  title: string;
  skills: string[];
}

const groups: StackGroup[] = [
  {
    title: "Real-Time & Spatial Computing",
    skills: ["C++", "C# / Unity", "Spatial Audio / XR", "Three.js / WebGL", "GLSL Shaders", "Point Cloud (PCL)"]
  },
  {
    title: "AI, Vision & Robotics",
    skills: ["Python", "PyTorch", "ROS / ROS 2", "Deep Q-Learning (DQN/PER)", "Gymnasium", "Computer Vision"]
  },
  {
    title: "Software Architecture & Protocols",
    skills: ["TypeScript", "React / Vite", "Bluetooth Low Energy (BLE)", "Android SDK", "REST & WebSockets", "Git & CI/CD"]
  }
];

const TechStack: React.FC = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section id="tech-stack" className="w-full py-24 px-6 sm:px-12 md:px-20 border-t border-neutral-900 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
            Technical Stack
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Engineering Foundation
          </h2>
        </div>
        <p className="text-sm text-neutral-400 font-light max-w-md">
          Technologies and environments used across spatial applications, robotics kinematics, and reinforcement learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {groups.map((group) => (
          <div 
            key={group.title}
            className="card-linear p-6 sm:p-7 space-y-5"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <h3 className="text-base font-semibold text-white tracking-tight">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="tag-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
