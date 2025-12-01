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

const PlexusParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Configuration
  const particleCount = 250; // Increased from 150
  const connectionDistance = 3.5;
  const areaSize = 30;
  const mouseRepulsionRadius = 4;
  const mouseRepulsionStrength = 0.5;

  // Initialize particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 2] = (Math.random() - 0.5) * areaSize;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return [pos, vel];
  }, []);

  // Geometry for lines
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxConnections = particleCount * 10; 
    const positions = new Float32Array(maxConnections * 6); 
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
    
    // Mouse position in world space (approximate at z=0)
    const { width, height } = state.viewport;
    const mouseX = (state.mouse.x * width) / 2;
    const mouseY = (state.mouse.y * height) / 2;

    // Color Transition Logic
    const particleColor = new THREE.Color('#ffffff').lerp(new THREE.Color('#000000'), progress);
    
    // Update Particles
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];

        // Basic movement
        let vx = velocities[i * 3];
        let vy = velocities[i * 3 + 1];
        let vz = velocities[i * 3 + 2];

        // Mouse Repulsion
        const dx = px - mouseX;
        const dy = py - mouseY;
        // We ignore Z for mouse interaction to treat it as a 2D plane interaction for better feel
        const distSq = dx * dx + dy * dy; 

        if (distSq < mouseRepulsionRadius * mouseRepulsionRadius) {
          const dist = Math.sqrt(distSq);
          const force = (mouseRepulsionRadius - dist) / mouseRepulsionRadius;
          
          // Push away
          vx += (dx / dist) * force * mouseRepulsionStrength * 0.1;
          vy += (dy / dist) * force * mouseRepulsionStrength * 0.1;
        }

        // Apply velocity
        positions[i * 3] += vx;
        positions[i * 3 + 1] += vy;
        positions[i * 3 + 2] += vz;

        // Boundary check - bounce
        if (Math.abs(positions[i * 3]) > areaSize / 2) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > areaSize / 2) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > areaSize / 2) velocities[i * 3 + 2] *= -1;
      }
      
      positionsAttr.needsUpdate = true;
      
      // Update material color
      if (pointsRef.current.material instanceof THREE.PointsMaterial) {
        pointsRef.current.material.color = particleColor;
      }
    }

    // Update Lines
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
      
      if (linesRef.current.material instanceof THREE.LineBasicMaterial) {
        linesRef.current.material.color = particleColor;
        linesRef.current.material.opacity = 0.15 * (1 - progress) + 0.3 * progress;
      }
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]} 
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#ffffff"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

const ParallaxGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useThree();
  
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
      
      {/* Plexus Effect */}
      <PlexusParticles />
    </group>
  );
};

export default Experience;
