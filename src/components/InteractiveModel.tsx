import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Float } from '@react-three/drei';

interface InteractiveModelProps {
  modelUrl?: string;
}



const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);

  return (
    <primitive 
      object={scene} 
      scale={2} 
    />
  );
};

const PlaceholderModel = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshStandardMaterial 
          color="#ff0055" 
          roughness={0.5} 
          metalness={0.1} 
        />
      </mesh>
    </Float>
  );
};

const InteractiveModel: React.FC<InteractiveModelProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-full min-h-[200px] cursor-move bg-[#393939] relative overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <color attach="background" args={['#4e4e4e']} />
        
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={0.6} adjustCamera={false} shadows={false}>
            {modelUrl ? <Model url={modelUrl} /> : <PlaceholderModel />}
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
      </Canvas>
    </div>
  );  
};

export default InteractiveModel;
