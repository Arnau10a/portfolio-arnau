import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Zap, Trophy, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

interface ObstacleData {
  id: number;
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
}

interface CollectibleData {
  id: number;
  x: number;
  z: number;
  collected: boolean;
}

// Global game coordination state
const gameContext = {
  active: false,
  roverX: 0,
  speed: 45,
  distance: 0,
  score: 0,
  multiplier: 1,
  leftPressed: false,
  rightPressed: false,
};

// Procedural Infinite Grid Tunnel with smooth horizon blend
const InfiniteGrid = () => {
  const grid1 = useRef<THREE.GridHelper>(null);
  const grid2 = useRef<THREE.GridHelper>(null);

  const GRID_SIZE = 140;

  useFrame((_, delta) => {
    if (gameContext.active) {
      const advance = gameContext.speed * delta;
      if (grid1.current) {
        grid1.current.position.z += advance;
        if (grid1.current.position.z >= GRID_SIZE) {
          grid1.current.position.z -= GRID_SIZE * 2;
        }
      }
      if (grid2.current) {
        grid2.current.position.z += advance;
        if (grid2.current.position.z >= GRID_SIZE) {
          grid2.current.position.z -= GRID_SIZE * 2;
        }
      }
    }
  });

  return (
    <group>
      {/* Two interlocking seamless grids extending into the deep horizon */}
      <gridHelper 
        ref={grid1} 
        args={[GRID_SIZE, 35, '#d4b896', '#1a1a1a']} 
        position={[0, -0.6, 0]} 
      />
      <gridHelper 
        ref={grid2} 
        args={[GRID_SIZE, 35, '#d4b896', '#1a1a1a']} 
        position={[0, -0.6, -GRID_SIZE]} 
      />

      {/* Left and Right Laser Boundary Fences */}
      <mesh position={[-10.2, 0.4, -100]}>
        <boxGeometry args={[0.08, 1.2, 360]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
      </mesh>
      <mesh position={[10.2, 0.4, -100]}>
        <boxGeometry args={[0.08, 1.2, 360]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
      </mesh>

      {/* Boundary support posts along track */}
      {[-80, -40, 0, 40, -120, -160, -200].map((zPos) => (
        <group key={zPos}>
          <mesh position={[-10.2, 0.6, zPos]}>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[10.2, 0.6, zPos]}>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
        </group>
      ))}

      {/* Dark ground plane absorbing reflections into pure dark */}
      <mesh position={[0, -0.62, -100]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 360]} />
        <meshBasicMaterial color="#030303" />
      </mesh>
    </group>
  );
};

// 3D Sci-Fi Drone Vehicle with tilt physics, dual thrusters, and spinning plasma rings
const RoverVehicle = ({ onCollide, onCollect }: { onCollide: () => void; onCollect: () => void }) => {
  const roverGroup = useRef<THREE.Group>(null);
  const leftRotor = useRef<THREE.Mesh>(null);
  const rightRotor = useRef<THREE.Mesh>(null);
  const targetX = useRef(0);
  const roll = useRef(0);
  const pitch = useRef(0);

  // Strict lateral movement limits (walls are at X = +/- 10.2)
  const MAX_LATERAL = 9.4;

  useFrame((_, delta) => {
    if (!roverGroup.current) return;

    // Spin drone energy rotors
    if (leftRotor.current) leftRotor.current.rotation.y += 18 * delta;
    if (rightRotor.current) rightRotor.current.rotation.y -= 18 * delta;

    if (gameContext.active) {
      // Steering mechanics
      const steerSpeed = 26;
      if (gameContext.leftPressed) targetX.current -= steerSpeed * delta;
      if (gameContext.rightPressed) targetX.current += steerSpeed * delta;

      // Hard clamp within track boundaries
      targetX.current = Math.max(-MAX_LATERAL, Math.min(MAX_LATERAL, targetX.current));

      // Smooth interpolation for drone movement
      gameContext.roverX += (targetX.current - gameContext.roverX) * (16 * delta);
      roverGroup.current.position.x = gameContext.roverX;

      // Banking roll & pitch dynamics
      const targetRoll = (targetX.current - gameContext.roverX) * -0.28;
      roll.current += (targetRoll - roll.current) * (14 * delta);
      roverGroup.current.rotation.z = roll.current;
      roverGroup.current.rotation.y = roll.current * 0.35;

      // Subtle hover oscillation
      pitch.current = Math.sin(performance.now() * 0.006) * 0.06;
      roverGroup.current.position.y = 0.3 + Math.sin(performance.now() * 0.005) * 0.05;
      roverGroup.current.rotation.x = pitch.current;

      // Distance & score progression
      gameContext.distance += gameContext.speed * delta;
      gameContext.speed = Math.min(95, 45 + gameContext.distance * 0.015);
      gameContext.score = Math.round(gameContext.distance * 0.5 * gameContext.multiplier);
    }
  });

  return (
    <group ref={roverGroup} position={[0, 0.3, 2]}>
      {/* Central Aerodynamic Carbon Fuselage */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.6, 6]} />
        <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Cyber Cockpit Visor */}
      <mesh position={[0, 0.22, -0.25]}>
        <boxGeometry args={[0.38, 0.12, 0.65]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={1} />
      </mesh>

      {/* Left Wing & Nacelle */}
      <group position={[-0.85, 0.1, 0.1]}>
        {/* Carbon Wing Pylon */}
        <mesh rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.9, 0.06, 0.25]} />
          <meshStandardMaterial color="#292524" metalness={0.8} />
        </mesh>
        {/* Left Nacelle Engine */}
        <mesh position={[-0.45, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.8, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Left Plasma Rotor Ring */}
        <mesh ref={leftRotor} position={[-0.45, 0.18, 0]}>
          <torusGeometry args={[0.32, 0.03, 8, 20]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Left Thruster Plume Light */}
        <pointLight position={[-0.45, 0, 0.5]} intensity={1.8} color="#38bdf8" distance={3} />
      </group>

      {/* Right Wing & Nacelle */}
      <group position={[0.85, 0.1, 0.1]}>
        {/* Carbon Wing Pylon */}
        <mesh rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.9, 0.06, 0.25]} />
          <meshStandardMaterial color="#292524" metalness={0.8} />
        </mesh>
        {/* Right Nacelle Engine */}
        <mesh position={[0.45, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.8, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Right Plasma Rotor Ring */}
        <mesh ref={rightRotor} position={[0.45, 0.18, 0]}>
          <torusGeometry args={[0.32, 0.03, 8, 20]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Right Thruster Plume Light */}
        <pointLight position={[0.45, 0, 0.5]} intensity={1.8} color="#38bdf8" distance={3} />
      </group>

      {/* Rear Ion Exhaust Core */}
      <mesh position={[0, 0.1, 0.85]}>
        <cylinderGeometry args={[0.18, 0.22, 0.3, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <pointLight position={[0, 0.1, 1.1]} intensity={2} color="#f59e0b" distance={4} />
    </group>
  );
};

// Procedural Dynamic Obstacles & Data Orbs System
const WorldElements = ({ onHitObstacle, onHitNode }: { onHitObstacle: () => void; onHitNode: () => void }) => {
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const [nodes, setNodes] = useState<CollectibleData[]>([]);
  const nextSpawnZ = useRef(-30);

  // Initialize track objects
  useEffect(() => {
    const initialObs: ObstacleData[] = [];
    const initialNodes: CollectibleData[] = [];

    for (let z = -30; z > -350; z -= 25) {
      // Monolith obstacle
      initialObs.push({
        id: Math.random(),
        x: (Math.random() - 0.5) * 24,
        z,
        width: 1.4 + Math.random() * 1.2,
        height: 3 + Math.random() * 4,
        depth: 1.4,
      });

      // Data Node Collectible
      if (Math.random() < 0.6) {
        initialNodes.push({
          id: Math.random(),
          x: (Math.random() - 0.5) * 22,
          z: z + 12,
          collected: false,
        });
      }
    }
    setObstacles(initialObs);
    setNodes(initialNodes);
  }, []);

  useFrame((_, delta) => {
    if (!gameContext.active) return;

    const moveZ = gameContext.speed * delta;

    // Move and recycle obstacles
    setObstacles((prev) =>
      prev.map((obs) => {
        const newZ = obs.z + moveZ;

        // Collision detection with rover (rover is around z = 2)
        if (newZ > 1.2 && newZ < 2.8) {
          const dx = Math.abs(obs.x - gameContext.roverX);
          if (dx < (obs.width / 2 + 0.45)) {
            onHitObstacle();
          }
        }

        // Recycle ahead of camera
        if (newZ > 8) {
          return {
            id: Math.random(),
            x: (Math.random() - 0.5) * 26,
            z: -280 - Math.random() * 40,
            width: 1.4 + Math.random() * 1.2,
            height: 3 + Math.random() * 4,
            depth: 1.4,
          };
        }
        return { ...obs, z: newZ };
      })
    );

    // Move and recycle energy nodes
    setNodes((prev) =>
      prev.map((node) => {
        const newZ = node.z + moveZ;

        // Collection detection
        if (!node.collected && newZ > 1.0 && newZ < 2.8) {
          const dx = Math.abs(node.x - gameContext.roverX);
          if (dx < 1.2) {
            onHitNode();
            return { ...node, collected: true, z: newZ };
          }
        }

        if (newZ > 8) {
          return {
            id: Math.random(),
            x: (Math.random() - 0.5) * 24,
            z: -260 - Math.random() * 30,
            collected: false,
          };
        }
        return { ...node, z: newZ };
      })
    );
  });

  return (
    <group>
      {/* Monolith Pillars */}
      {obstacles.map((obs) => (
        <mesh key={obs.id} position={[obs.x, obs.height / 2 - 0.5, obs.z]}>
          <boxGeometry args={[obs.width, obs.height, obs.depth]} />
          <meshStandardMaterial 
            color="#171717" 
            roughness={0.4} 
            metalness={0.8} 
          />
          {/* Neon warning strip at base */}
          <mesh position={[0, -obs.height / 2 + 0.1, 0]}>
            <boxGeometry args={[obs.width * 1.02, 0.2, obs.depth * 1.02]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
        </mesh>
      ))}

      {/* Collectible Floating Energy Nodes */}
      {nodes.map((node) =>
        !node.collected ? (
          <group key={node.id} position={[node.x, 0.6, node.z]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <octahedronGeometry args={[0.4, 0]} />
              <meshBasicMaterial color="#38bdf8" wireframe />
            </mesh>
            <pointLight distance={3} intensity={1.5} color="#38bdf8" />
          </group>
        ) : null
      )}
    </group>
  );
};

const Laboratory: React.FC = () => {
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(45);
  const [multiplier, setMultiplier] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('neural_rover_highscore') || '0', 10);
  });
  const [soundOn, setSoundOn] = useState(true);

  // Audio synthesizer via Web Audio (0 assets)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSfx = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!soundOn) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  };

  const startGame = () => {
    gameContext.active = true;
    gameContext.roverX = 0;
    gameContext.speed = 45;
    gameContext.distance = 0;
    gameContext.score = 0;
    gameContext.multiplier = 1;
    setScore(0);
    setMultiplier(1);
    setGameState('PLAYING');
    playSfx(580, 'triangle', 0.2);
  };

  const handleGameOver = () => {
    if (!gameContext.active) return;
    gameContext.active = false;
    setGameState('GAMEOVER');
    playSfx(140, 'sawtooth', 0.4);

    setHighScore((prev) => {
      const best = Math.max(prev, gameContext.score);
      localStorage.setItem('neural_rover_highscore', best.toString());
      return best;
    });
  };

  const handleCollectNode = () => {
    gameContext.multiplier = Math.min(5, gameContext.multiplier + 0.5);
    setMultiplier(gameContext.multiplier);
    playSfx(880, 'sine', 0.12);
  };

  // UI state ticker
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const interval = setInterval(() => {
      setScore(gameContext.score);
      setSpeed(Math.round(gameContext.speed));
    }, 80);
    return () => clearInterval(interval);
  }, [gameState]);

  // Key controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'arrowleft') gameContext.leftPressed = true;
      if (k === 'd' || k === 'arrowright') gameContext.rightPressed = true;
      if (k === ' ' && gameState !== 'PLAYING') startGame();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'arrowleft') gameContext.leftPressed = false;
      if (k === 'd' || k === 'arrowright') gameContext.rightPressed = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameState]);

  return (
    <div className="relative h-screen w-full bg-[#030303] text-white overflow-hidden select-none font-sans">
      
      {/* 3D WebGL Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas gl={{ antialias: true, powerPreference: 'high-performance' }} dpr={[1, 1.5]}>
          <PerspectiveCamera makeDefault position={[0, 3.2, 7.5]} rotation={[-0.22, 0, 0]} fov={55} />
          
          {/* Exponential dark fog that hides background spawn edges seamlessly */}
          <color attach="background" args={['#030303']} />
          <fog attach="fog" args={['#030303', 30, 180]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 25, 10]} intensity={1.4} />
          
          <Stars radius={120} depth={60} count={900} factor={3} saturation={0} fade />
          <InfiniteGrid />
          <RoverVehicle onCollide={handleGameOver} onCollect={handleCollectNode} />
          <WorldElements onHitObstacle={handleGameOver} onHitNode={handleCollectNode} />
        </Canvas>
      </div>

      {/* Top HUD bar */}
      <header className="absolute top-0 left-0 w-full z-20 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Base</span>
        </Link>

        {/* Telemetry metrics */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-neutral-500 uppercase">Velocity:</span>
            <span className="text-amber-200 font-bold">{speed} km/h</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500 uppercase">Boost:</span>
            <span className="text-cyan-400 font-bold">{multiplier}x</span>
          </div>

          <button
            onClick={() => setSoundOn(!soundOn)}
            className="pointer-events-auto p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </header>

      {/* Top Center Live Score */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 block">Distance Score</span>
        <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white">{score}</span>
      </div>

      {/* On-screen Touch Controls for mobile/mouse */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between sm:hidden pointer-events-none">
        <button
          onTouchStart={() => (gameContext.leftPressed = true)}
          onTouchEnd={() => (gameContext.leftPressed = false)}
          onMouseDown={() => (gameContext.leftPressed = true)}
          onMouseUp={() => (gameContext.leftPressed = false)}
          className="pointer-events-auto w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg font-bold active:bg-white/30"
        >
          ◀
        </button>
        <button
          onTouchStart={() => (gameContext.rightPressed = true)}
          onTouchEnd={() => (gameContext.rightPressed = false)}
          onMouseDown={() => (gameContext.rightPressed = true)}
          onMouseUp={() => (gameContext.rightPressed = false)}
          className="pointer-events-auto w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg font-bold active:bg-white/30"
        >
          ▶
        </button>
      </div>

      {/* Start / Game Over Modal Overlays */}
      {gameState !== 'PLAYING' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
          <div className="max-w-md w-full p-8 rounded-3xl border border-white/10 bg-[#0a0a0a]/90 text-center shadow-2xl">
            
            {gameState === 'GAMEOVER' ? (
              <>
                <ShieldAlert size={44} className="text-rose-400 mx-auto mb-3" />
                <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                  NEURAL DISRUPTION
                </h2>
                <p className="text-xs text-neutral-400 font-mono mb-6">
                  Vehicle hull breached by monolith barrier.
                </p>

                <div className="flex justify-around items-center py-4 px-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-8 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Distance</span>
                    <span className="text-2xl font-bold text-white">{score}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Record</span>
                    <span className="text-2xl font-bold text-amber-300">{highScore}</span>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-amber-100 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  <span>Re-deploy Rover</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-300 mx-auto flex items-center justify-center mb-4">
                  <Zap size={24} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  NEURAL ROVER
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  Navigate the high-speed autonomous simulation grid. Evade data monoliths and collect blue energy nodes to increase velocity.
                </p>

                <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-400 mb-8 bg-white/[0.03] py-2.5 px-4 rounded-xl border border-white/5">
                  <span>Steer:</span>
                  <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">A</kbd>
                  <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">D</kbd>
                  <span>or</span>
                  <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">Arrow Keys</kbd>
                </div>

                {highScore > 0 && (
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-300 mb-6">
                    <Trophy size={14} />
                    <span>Personal Best: {highScore} pts</span>
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="w-full py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-amber-100 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Play size={14} />
                  <span>Launch Simulation (Space)</span>
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* Footer Instructions */}
      <footer className="absolute bottom-4 left-0 w-full z-20 text-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest pointer-events-none hidden sm:block">
        PRESS [A / D] OR [← / →] TO STEER // [SPACE] TO RESTART
      </footer>
    </div>
  );
};

export default Laboratory;
