import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Float } from '@react-three/drei';

interface InteractiveModelProps {
  modelUrl?: string;
}

import * as THREE from 'three';

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const [isMetallic, setIsMetallic] = React.useState(true);
  const originalMaterials = React.useRef<Map<string, THREE.Material | THREE.Material[]>>(new Map());
  const processedRef = React.useRef(false);

  React.useEffect(() => {
    // Store original materials only once
    if (!processedRef.current) {
      scene.traverse((child) => {
        if ((child as any).isMesh) {
          const mesh = child as THREE.Mesh;
          originalMaterials.current.set(mesh.uuid, mesh.material);
        }
      });
      processedRef.current = true;
    }

    // Apply materials based on state
    scene.traverse((child) => {
      if ((child as any).isMesh) {
        const mesh = child as THREE.Mesh;
        if (isMetallic) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#ffffff'),
            metalness: 1.0,
            roughness: 0.1,
            envMapIntensity: 1.0
          });
        } else {
          const original = originalMaterials.current.get(mesh.uuid);
          if (original) {
            mesh.material = original;
          }
        }
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
  }, [scene, isMetallic]);

  return (
    <primitive 
      object={scene} 
      scale={2} 
      onClick={(e: any) => {
        e.stopPropagation();
        setIsMetallic(!isMetallic);
      }}
    />
  );
};

const PlaceholderModel = () => {
  const [isMetallic, setIsMetallic] = React.useState(true);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh onClick={(e) => {
        e.stopPropagation();
        setIsMetallic(!isMetallic);
      }}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        {isMetallic ? (
          <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.1} 
            metalness={1.0} 
          />
        ) : (
          <meshStandardMaterial 
            color="#ff0055" 
            roughness={0.5} 
            metalness={0.1} 
          />
        )}
      </mesh>
    </Float>
  );
};

const InteractiveModel: React.FC<InteractiveModelProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-full min-h-[200px] cursor-move bg-[#393939] relative overflow-hidden">
      {/* Blender UI Overlay Mockup */}
      <div className="absolute top-2 right-2 flex space-x-1 pointer-events-none opacity-50">
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
      </div>
      
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <color attach="background" args={['#393939']} />
        <group position={[0, -2, 0]}>
          <gridHelper args={[20, 20, 0x444444, 0x222222]} />
          <axesHelper args={[5]} />
        </group>
        
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={false} shadows={false}>
            {modelUrl ? <Model url={modelUrl} /> : <PlaceholderModel />}
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default InteractiveModel;
