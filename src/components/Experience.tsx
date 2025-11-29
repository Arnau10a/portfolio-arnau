import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;

      // Base rotation
      meshRef.current.rotation.x = Math.cos(t / 4) / 2 + mouseY * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2 + mouseX * 0.2;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
      
      // Subtle movement following mouse
      meshRef.current.position.x = mouseX * 0.5;
      meshRef.current.position.y = Math.sin(t / 1.5) / 10 + mouseY * 0.5;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.1} 
          metalness={0.8}
          wireframe
        />
      </mesh>
      <mesh scale={1.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
    </Float>
  );
};

const Experience: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <ParallaxGroup />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};

const ParallaxGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;

      // Enhanced Parallax based on scroll
      // Move up faster
      groupRef.current.position.y = scrollY * 0.005; 
      // Rotate slightly as we scroll
      groupRef.current.rotation.z = scrollY * 0.0002;
      // Push back slightly for depth
      groupRef.current.position.z = -scrollY * 0.002;

      // Subtle rotation based on mouse
      groupRef.current.rotation.y = mouseX * 0.05 + scrollY * 0.0001;
      groupRef.current.rotation.x = mouseY * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <AbstractShape />
      {/* Add some floating particles/shapes for depth */}
      <mesh position={[-4, 2, -5]} scale={0.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#333" wireframe />
      </mesh>
      <mesh position={[4, -3, -2]} scale={0.3}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#444" wireframe />
      </mesh>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

export default Experience;
