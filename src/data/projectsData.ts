export interface EngineeringProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  field: string;
  year: string;
  image: string;
  accent: string;
  githubUrl?: string;
  liveUrl?: string;
  architecture: {
    overview: string;
    coreChallenge: string;
    engineeringSolution: string;
  };
  metrics: { label: string; value: string; detail: string }[];
  stack: string[];
  keyHighlights: string[];
}

export const projectsData: EngineeringProject[] = [
  {
    id: "nuclear-vr",
    num: "01",
    title: "NuclearVerse VR",
    subtitle: "Tokamak Fusion Reactor Digital Twin & Microsecond RAG Architecture",
    field: "Distributed AI & Spatial Computing",
    year: "2024",
    image: "/assets/projects/fusion_reactor_vr_nano_banana.webp",
    accent: "#06b6d4",
    architecture: {
      overview: "High-fidelity holographic digital twin engineered for ITER/DEMO fusion reactors. Enables human operators to rehearse mission-critical robotic component assembly inside high-radiation plasma chambers before hardware actuation.",
      coreChallenge: "Sub-millimeter physics collision accuracy and zero-latency spatial tracking inside dense CAD toroidal geometries under strict VR refresh budgets (90 FPS lock).",
      engineeringSolution: "Engineered a custom deterministic 1:1 physics constraints pipeline in C#/Unity, combined with an embedded local RAG vector engine that queries indexed technical blueprints and streams data to the user HUD in microsecond intervals."
    },
    metrics: [
      { label: "Spatial Precision", value: "1:1 Isometric", detail: "Sub-millimeter scale" },
      { label: "AI Pipeline", value: "Embedded RAG", detail: "Zero-latency vector search" },
      { label: "Frame Budget", value: "90 FPS Solid", detail: "Hardware-constrained" }
    ],
    stack: ["Unity / C#", "Spatial Computing", "Embedded RAG", "Vector Search", "GLSL Shaders", "Physics Engine"],
    keyHighlights: [
      "Zero-latency local vector database running locally without internet requirement",
      "Full 1:1 CAD model integration with physics colliders generated on-the-fly",
      "Head-mounted display telemetry recording and post-simulation diagnostic playback"
    ]
  },
  {
    id: "humanoid-robotics",
    num: "02",
    title: "Humanoid Grasping",
    subtitle: "Autonomous 3D Point Cloud Perception Pipeline & Multi-Contact Kinematic Synthesis",
    field: "Autonomous Robotics & Vision",
    year: "2024",
    image: "/assets/projects/robotic_grasping_nano_banana.webp",
    accent: "#a855f7",
    githubUrl: "https://github.com/Arnau10a/Humanoid-Robots-Grasping",
    architecture: {
      overview: "Autonomous perception and grasp synthesis system that ingests raw RGB-D sensor point clouds to compute kinematically stable grasp poses for 16-DOF anthropomorphic robot hands.",
      coreChallenge: "Synthesizing multi-contact force closure points on arbitrary, unmodeled geometries in real time without access to offline CAD meshes.",
      engineeringSolution: "Designed an asynchronous ROS node pipeline written in C++ and Python, computing surface normal curvature distributions via Point Cloud Library (PCL) and evaluating GraspIt! energy metrics within an 80ms inference budget."
    },
    metrics: [
      { label: "Pipeline Latency", value: "< 80 ms", detail: "Real-time sensor loop" },
      { label: "Hand Kinematics", value: "16-DOF Hand", detail: "Anthropomorphic reach" },
      { label: "Middleware IPC", value: "ROS / C++", detail: "Zero memory copy" }
    ],
    stack: ["C++", "ROS", "Python", "Point Cloud (PCL)", "GraspIt!", "Computer Vision", "Kinematics"],
    keyHighlights: [
      "Real-time filtering of noisy depth point clouds with voxel grid downsampling",
      "Curvature analysis generating viable contact normals in under 25ms",
      "Seamless ROS action server protocol for robotic arm and hand execution"
    ]
  },
  {
    id: "reinforcement-learning",
    num: "03",
    title: "Fantasy RL Agent",
    subtitle: "Deep Q-Network with Prioritized Experience Replay for Stochastic Multi-Agent Optimization",
    field: "Deep Reinforcement Learning",
    year: "2024",
    image: "/assets/projects/fantasy_rl_nano_banana.webp",
    accent: "#22c55e",
    githubUrl: "https://github.com/Arnau10a/Fantasy_Machine_learning",
    architecture: {
      overview: "Custom Gymnasium simulation engine and neural policy optimizer modelling weekly draft volatility, constrained budget frontiers, and non-stationary competitive player transfers.",
      coreChallenge: "Exploration in an intractable combinatorial discrete state-action space (>10^8 configurations) subject to high variance and sparse episodic rewards.",
      engineeringSolution: "Architected a Prioritized Experience Replay (PER) Deep Q-Network (DQN) in PyTorch with target network stabilization and calibrated epsilon annealing schedules, attaining 98.4% policy convergence against historical benchmarks."
    },
    metrics: [
      { label: "Convergence Rate", value: "98.4%", detail: "Policy optimality target" },
      { label: "Environment", value: "Custom Gym", detail: "Vectorized step execution" },
      { label: "Network Design", value: "DQN + PER", detail: "PyTorch neural policy" }
    ],
    stack: ["Python", "PyTorch", "Gymnasium", "Deep Q-Learning", "Experience Replay", "NumPy", "Optimization"],
    keyHighlights: [
      "Custom Gymnasium step & reward function with non-linear penalty terms",
      "Sum-tree prioritized experience replay boosting sample efficiency by 4x",
      "Extensive ablation studies on policy convergence vs heuristic baselines"
    ]
  }
];
