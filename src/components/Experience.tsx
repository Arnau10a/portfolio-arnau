import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
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
        {/* Background color is now handled in ParallaxGroup */}
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
  const starsRef = useRef<THREE.Points>(null);
  const { scene } = useThree();

  // Generate star positions
  const starPositions = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for(let i = 0; i < count; i++) {
      positions[i*3] = (Math.random() - 0.5) * 200;
      positions[i*3+1] = (Math.random() - 0.5) * 200;
      positions[i*3+2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;

      // Enhanced Parallax based on scroll
      groupRef.current.position.y = scrollY * 0.005; 
      groupRef.current.rotation.z = scrollY * 0.0002;
      groupRef.current.position.z = -scrollY * 0.002;

      // Subtle rotation based on mouse
      groupRef.current.rotation.y = mouseX * 0.05 + scrollY * 0.0001;
      groupRef.current.rotation.x = mouseY * 0.05;

      // Color Transition Logic
      // Calculate progress: 0 at top, 1 when scrolled past hero (100vh)
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      
      // Background Color Transition (Dark -> White)
      const bgColor = new THREE.Color('#050505').lerp(new THREE.Color('#ffffff'), progress);
      scene.background = bgColor;

      // Stars Color Transition (White -> Black)
      if (starsRef.current && starsRef.current.material instanceof THREE.PointsMaterial) {
        const starColor = new THREE.Color('#ffffff').lerp(new THREE.Color('#000000'), progress);
        starsRef.current.material.color = starColor;
        
        // Optional: Rotate stars slightly
        starsRef.current.rotation.y += 0.0002;
      }
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
      
      {/* Custom Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
        <bufferAttribute 
            attach="attributes-position" 
            args={[starPositions, 3]} 
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.35} 
          color="#ffffff" 
          transparent 
          opacity={0.8} 
          sizeAttenuation={true} 
        />
      </points>
    </group>
  );
};

export default Experience;
