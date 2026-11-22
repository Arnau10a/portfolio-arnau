import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createCarvedSlabGeometries } from './letterPaths';

interface HeroSceneProps {
  active?: boolean;
  onFirstMove?: () => void;
}

interface PointerState {
  nx: number;
  ny: number;
  active: boolean;
}

const INITIAL_LIGHT_POS = new THREE.Vector3(-3.8, 2.0, 2.9);

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, -0.1, -0.15);
  }, [camera]);

  return null;
}

function MouseLightRig({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<PointerState>;
}) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetPos = useRef(INITIAL_LIGHT_POS.clone());
  const prevLightPos = useRef(new THREE.Vector3(Infinity, Infinity, Infinity));

  const lightTarget = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(0, -0.2, -0.15);
    return obj;
  }, []);

  useFrame((state, delta) => {
    const light = lightRef.current;
    if (!light) return;

    const { nx, ny, active } = pointerRef.current;

    if (active) {
      const distFromCenter = Math.hypot(nx, ny);
      const targetX = nx * 6.5;
      const targetZ = ny * 4.5 + 0.35;
      const targetY = 2.45 - Math.min(distFromCenter, 1.2) * 0.5;
      targetPos.current.set(targetX, targetY, targetZ);
    } else {
      const t = state.clock.getElapsedTime();
      targetPos.current.set(
        INITIAL_LIGHT_POS.x + Math.sin(t * 0.45) * 0.45,
        INITIAL_LIGHT_POS.y + Math.cos(t * 0.35) * 0.08,
        INITIAL_LIGHT_POS.z + Math.cos(t * 0.4) * 0.25
      );
    }

    const damping = 1 - Math.exp(-6.5 * Math.min(delta, 0.1));
    light.position.lerp(targetPos.current, damping);

    if (light.position.distanceToSquared(prevLightPos.current) > 1e-6) {
      prevLightPos.current.copy(light.position);
      state.gl.shadowMap.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#aab6c8" />
      <hemisphereLight args={['#f2f2ee', '#1d232c', 0.32]} />
      <primitive object={lightTarget} />
      <spotLight
        ref={lightRef}
        target={lightTarget}
        position={[INITIAL_LIGHT_POS.x, INITIAL_LIGHT_POS.y, INITIAL_LIGHT_POS.z]}
        angle={Math.PI / 2.15}
        penumbra={0.9}
        intensity={32}
        distance={28}
        decay={1.55}
        color="#fffcf5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.6}
        shadow-camera-far={20}
        shadow-bias={-0.00015}
        shadow-normalBias={0.002}
        shadow-radius={2.5}
      />
    </>
  );
}

function CarvedStudioSlab() {
  const { viewport } = useThree();

  const { topCapGeometry, slabGeometry, islandGeometries } = useMemo(
    () =>
      createCarvedSlabGeometries({
        mainWord: 'ARNAU',
        mainScale: 1.35,
        mainLetterSpacing: 0.28,
        mainZ: 0.35,
        subWord: 'PORTFOLIO',
        subScale: 0.4,
        subLetterSpacing: 0.42,
        subZ: -1.05,
        depth: 0.62,
        slabSize: 80,
      }),
    []
  );

  const slabMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e4e4e0',
        roughness: 0.68,
        metalness: 0.06,
      }),
    []
  );

  const shadowCasterMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        colorWrite: false,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    return () => {
      topCapGeometry.dispose();
      slabGeometry.dispose();
      islandGeometries.forEach((geom) => geom.dispose());
      slabMaterial.dispose();
      shadowCasterMaterial.dispose();
    };
  }, [topCapGeometry, slabGeometry, islandGeometries, slabMaterial, shadowCasterMaterial]);

  const responsiveScale = useMemo(() => {
    const targetWidth = 8.4;
    const fit = (viewport.width * 0.84) / targetWidth;
    return THREE.MathUtils.clamp(fit, 0.36, 1.05);
  }, [viewport.width]);

  return (
    <group scale={responsiveScale}>
      <mesh
        geometry={topCapGeometry}
        material={shadowCasterMaterial}
        castShadow
        receiveShadow={false}
      />

      <mesh
        geometry={slabGeometry}
        material={slabMaterial}
        castShadow={false}
        receiveShadow
      />

      {islandGeometries.map((geom, idx) => (
        <mesh
          key={`island-${idx}`}
          geometry={geom}
          material={slabMaterial}
          castShadow={false}
          receiveShadow
        />
      ))}

      {/* Deep recessed floor visible inside the carved ARNAU cutouts */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0.35]} receiveShadow>
        <planeGeometry args={[10.5, 2.8]} />
        <meshStandardMaterial color="#d6d6d2" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* Shallow engraved floor for PORTFOLIO */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.11, -1.05]} receiveShadow>
        <planeGeometry args={[12, 0.72]} />
        <meshStandardMaterial color="#c8c9cc" roughness={0.95} metalness={0.02} />
      </mesh>
    </group>
  );
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  active = true,
  onFirstMove,
}) => {
  const pointerRef = useRef<PointerState>({
    nx: -0.58,
    ny: 0.58,
    active: false,
  });
  const notifiedRef = useRef(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.shadowMap.autoUpdate = true;
      }
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const handlePointerMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointerRef.current.nx = (e.clientX / w) * 2 - 1;
      pointerRef.current.ny = (e.clientY / h) * 2 - 1;
      pointerRef.current.active = true;

      if (!notifiedRef.current) {
        notifiedRef.current = true;
        onFirstMove?.();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [active, onFirstMove]);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      shadows="soft"
      dpr={[1, 1.5]}
      camera={{ position: [0, 9.2, 5.2], fov: 34, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={({ gl }) => {
        rendererRef.current = gl;
        gl.shadowMap.autoUpdate = false;
        gl.shadowMap.needsUpdate = true;
      }}
      className="h-full w-full block touch-pan-y"
    >
      <color attach="background" args={['#262b33']} />
      <CameraRig />
      <MouseLightRig pointerRef={pointerRef} />
      <CarvedStudioSlab />
    </Canvas>
  );
};
