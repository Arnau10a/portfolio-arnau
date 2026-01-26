import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Center, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing';
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
    <group>
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
    </group>
  );
};

const PlexusParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Configuration
  const particleCount = 100;
  const connectionDistance = 3.5;
  const areaSize = 25;

  // Initialize particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 2] = (Math.random() - 0.5) * areaSize;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxConnections = particleCount * 6; // Reduced for performance
    const positions = new Float32Array(maxConnections * 6); 
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
    
    if (pointsRef.current) {
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(positions[i * 3]) > areaSize / 2) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > areaSize / 2) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > areaSize / 2) velocities[i * 3 + 2] *= -1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      const particleColor = new THREE.Color('#00f2ff').lerp(new THREE.Color('#ffffff'), progress);
      (pointsRef.current.material as THREE.PointsMaterial).color = particleColor;
    }

    if (linesRef.current) {
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionDistance * connectionDistance) {
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            linePositions[lineIndex++] = positions[j * 3];
            linePositions[lineIndex++] = positions[j * 3 + 1];
            linePositions[lineIndex++] = positions[j * 3 + 2];
          }
        }
      }
      linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      (linesRef.current.material as THREE.LineBasicMaterial).opacity = 0.1 * (1-progress) + 0.05 * progress;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00f2ff" transparent opacity={0.6} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#00f2ff" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
};

const Experience: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas gl={{ antialias: false, stencil: false, depth: true }} dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <Suspense fallback={null}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#00f2ff" />
          
          <Center>
            <AbstractShape />
          </Center>
          
          <PlexusParticles />
          
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
            <Noise opacity={0.05} />
            <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experience;
