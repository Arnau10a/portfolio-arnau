import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Global target color references for cross-component WebGL color sync
const globalColors = {
  primary: new THREE.Color("#06b6d4"),
  secondary: new THREE.Color("#c084fc"),
};

const AbstractShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Lightweight standard material with custom vertex displacement wave running on GPU
  const customMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: globalColors.primary,
      roughness: 0.25,
      metalness: 0.8,
      wireframe: false,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      mat.userData.shader = shader;

      shader.vertexShader = `
        uniform float uTime;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float wave = sin(position.x * 2.2 + uTime * 1.0) * 0.07 +
                     cos(position.y * 2.8 + uTime * 0.8) * 0.07 +
                     sin(position.z * 3.0 + uTime * 1.2) * 0.07;
        transformed += normal * wave;
        `
      );
    };

    return mat;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    // Smooth color interpolation
    customMaterial.color.lerp(globalColors.primary, 0.05);

    if (customMaterial.userData.shader) {
      customMaterial.userData.shader.uniforms.uTime.value = t;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.04 + mouseY * 0.08;
      meshRef.current.rotation.y = t * 0.06 + mouseX * 0.08;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX * 0.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY * 0.4, 0.05);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <primitive object={customMaterial} ref={materialRef} attach="material" />
      </mesh>
      
      {/* Subtle outer geometric wireframe cage */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1.2, 10, 10]} />
        <meshBasicMaterial 
          color={globalColors.secondary} 
          wireframe 
          transparent 
          opacity={0.04} 
        />
      </mesh>
    </group>
  );
};

// GPU-friendly starfield particles without O(N^2) CPU calculations
const AmbientParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 70;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      spd[i] = 0.002 + Math.random() * 0.004;
    }
    return [pos, spd];
  }, [particleCount]);

  useFrame(() => {
    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] -= speeds[i];
        if (posArray[i * 3 + 1] < -8) {
          posArray[i * 3 + 1] = 8;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.color.lerp(globalColors.primary, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={globalColors.primary} transparent opacity={0.4} />
    </points>
  );
};

const ExperienceLights = () => {
  const lightRef1 = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (lightRef1.current) {
      lightRef1.current.color.lerp(globalColors.secondary, 0.05);
    }
    if (lightRef2.current) {
      lightRef2.current.color.lerp(globalColors.primary, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight ref={lightRef1} position={[-8, -8, -6]} intensity={1.5} color={globalColors.secondary} />
      <pointLight ref={lightRef2} position={[6, -4, 4]} intensity={1.5} color={globalColors.primary} />
    </>
  );
};

const Experience: React.FC = () => {
  useEffect(() => {
    const handleProjectChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.primary) {
          globalColors.primary.set(customEvent.detail.primary);
        }
        if (customEvent.detail.secondary) {
          globalColors.secondary.set(customEvent.detail.secondary);
        }
      }
    };

    window.addEventListener('project-change', handleProjectChange);
    return () => window.removeEventListener('project-change', handleProjectChange);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas 
        gl={{ 
          antialias: true, 
          stencil: false, 
          depth: true, 
          powerPreference: "high-performance" 
        }} 
        dpr={1}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={45} />
        <Suspense fallback={null}>
          <color attach="background" args={['#030303']} />
          <ExperienceLights />
          <AbstractShape />
          <AmbientParticles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Experience;
