export interface ProjectCardData {
  id: string;
  titleLine1: string;
  titleLine2: string;
  context: string;
  year: string;
  bg: string;
  image: string;
  imageAlt: string;
  imageFit?: 'cover' | 'contain';
  stack: string[];
  metrics: string[];
  description: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  summary: string;
}

export interface ExperienceColumn {
  label: string;
  title: string;
  items: ExperienceItem[];
}

export const PROJECTS: ProjectCardData[] = [
  {
    id: 'fusion-reactor-digital-twin',
    titleLine1: 'Fusion Reactor',
    titleLine2: 'Digital Twin',
    context: 'IDOM Consulting · ITER / IFMIF-DONES',
    year: '2025 – 2026',
    bg: '#0C1016',
    image: '/assets/projects/fusion_digital_twin_vr.webp',
    imageAlt: 'Fusion Reactor Digital Twin VR thermal inspection view',
    stack: ['Unity C#', 'C++ / llama.cpp', 'USearch', 'Python', 'GLSL / Blender'],
    metrics: ['+5M CAD Polygons', '>72 FPS VR', 'Zero Cloud'],
    description:
      'Real-time VR simulation platform for maintenance validation in international nuclear fusion facilities, combining custom CAD polygon decimation pipelines with an offline Llama 3.1 + USearch vector engine for sub-second blueprint retrieval.',
  },
  {
    id: 'biometric-vr-telemetry',
    titleLine1: 'Biometric VR',
    titleLine2: 'Telemetry Core',
    context: 'CRV · UPC Barcelona',
    year: '2026',
    bg: '#23272D',
    image: '/assets/projects/biometric_vr_vital_sync.webp',
    imageAlt: 'Vital Sync BLE biometric telemetry app interface',
    imageFit: 'contain',
    stack: ['Unity C#', 'BLE', 'WearOS / Android', 'Meta Quest XR', 'UPM'],
    metrics: ['Zero GC Allocs', '90 FPS VR', 'Live BLE'],
    githubUrl: 'https://github.com/Arnau10a/unity-biofeedback-vr-core',
    description:
      'End-to-end low-latency physiological telemetry pipeline streaming heart rate, 6-axis IMU, and environmental data from WearOS smartwatches into Meta Quest XR with zero-allocation structs and in-editor calibration tools.',
  },
  {
    id: 'point-cloud-hand-kinematics',
    titleLine1: '3D Point Cloud',
    titleLine2: 'Hand Kinematics',
    context: 'Autonomous Robotics Research',
    year: '2024',
    bg: '#3A3E44',
    image: '/assets/projects/robotic_grasping_nano_banana.webp',
    imageAlt: '3D Point Cloud and 16-DOF robotic hand grasping',
    stack: ['C++', 'ROS / ROS 2', 'PCL', 'Python', 'OpenCV'],
    metrics: ['< 80 ms Loop', '16-DOF Hand', 'Force Closure'],
    githubUrl: 'https://github.com/Arnau10a/Humanoid-Robots-Grasping',
    description:
      'Autonomous spatial perception and multi-contact grasp pose synthesis pipeline processing dense RGB-D point clouds via PCL and ROS to actuate 16-DOF anthropomorphic robotic hands in real time.',
  },
  {
    id: 'local-vector-search-engine',
    titleLine1: 'Local Vector',
    titleLine2: 'Search Engine',
    context: 'Applied AI & Systems',
    year: '2024 – 2025',
    bg: '#50555A',
    image: '/assets/projects/trading_ai_nano_banana.webp',
    imageAlt: 'Local Vector Search Engine architecture visual',
    stack: ['C++', 'SIMD', 'USearch', 'Python', 'CMake'],
    metrics: ['Sub-Millisecond', 'Minimal RAM', '100% Offline'],
    description:
      'Modular low-overhead offline semantic search and Approximate Nearest Neighbor (ANN) vector indexing engine built in native C++ with SIMD routines and Python bindings, eliminating external cloud dependencies.',
  },
];

export const EXPERIENCE_COLUMNS: ExperienceColumn[] = [
  {
    label: 'Education',
    title: 'Academic Excellence',
    items: [
      {
        role: "Bachelor's in Computer Engineering",
        org: 'Universitat Politècnica de Catalunya (UPC)',
        summary:
          'Focus on High-Performance Computing (HPC), computer graphics, advanced algorithms, and artificial intelligence.',
      },
      {
        role: 'Erasmus Academic Program',
        org: 'Czech Technical University in Prague (CTU)',
        summary:
          'Advanced coursework in systems architecture, embedded computing, and distributed networks.',
      },
    ],
  },
  {
    label: 'Industry',
    title: 'Industrial Experience',
    items: [
      {
        role: 'Software Engineer Intern',
        org: 'IDOM Consulting · ITER / IFMIF-DONES',
        summary:
          'Built real-time VR digital twins for nuclear fusion maintenance, CAD polygon optimization pipelines, and offline embedded RAG retrieval.',
      },
      {
        role: 'Real-Time XR Telemetry Researcher',
        org: 'Centre de Realitat Virtual (CRV - UPC)',
        summary:
          'Engineered zero-allocation BLE streaming architectures linking WearOS wearables with Meta Quest VR research environments.',
      },
    ],
  },
  {
    label: 'Leadership',
    title: 'Operational Leadership',
    items: [
      {
        role: 'Head Instructor & Sailing Coordinator',
        org: 'Institut de Nàutica de Barcelona',
        summary:
          'Fleet coordination, operational risk mitigation, emergency safety protocols, and calm execution under demanding maritime conditions.',
      },
    ],
  },
];

export const CONTACT = {
  email: 'parise.garcia@gmail.com',
  github: 'https://github.com/Arnau10a',
  linkedin: 'https://linkedin.com/in/arnau-garcia-parise',
  location: 'Barcelona, Spain',
};
