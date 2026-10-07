export interface EngineeringProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  field: string;
  year: string;
  accent: string;
  githubUrl?: string;
  liveUrl?: string;
  packageUrl?: string;
  architecture: {
    overview: string;
    coreChallenge: string;
    engineeringSolution: string;
  };
  metrics: { label: string; value: string; detail: string }[];
  stack: string[];
  keyHighlights: string[];
  codeSnippets?: {
    label: string;
    code: string;
  }[];
}

export const projectsData: EngineeringProject[] = [
  {
    id: "biofeedback-vr-core",
    num: "01",
    title: "Biofeedback VR Core",
    subtitle: "Real-Time Bluetooth Low Energy (BLE) Physiological Telemetry for Android / Quest XR",
    field: "XR Biosensing & Wearable Systems",
    year: "2026",
    accent: "#06b6d4",
    githubUrl: "https://github.com/Arnau10a/unity-biofeedback-vr-core",
    packageUrl: "https://github.com/Arnau10a/unity-biofeedback-vr-core.git",
    architecture: {
      overview: "Unity Package (UPM) de producción que establece conexiones BLE de ultra-baja latencia con smartwatches (BioWatch y pulsómetros BLE estándar) en dispositivos Android y Meta Quest, capturando y serializando telemetría fisiológica en tiempo real.",
      coreChallenge: "Integrar el stack BLE nativo de Android en el ciclo de ejecución de Unity XR sin pérdidas de framerate, manteniendo sincronizados el stream de pulso (BPM), IMU (acelerómetro/giroscopio de 6 ejes) y variables ambientales.",
      engineeringSolution: "Arquitectura basada en eventos desacoplados (BLEConnector.OnDataReceived), puente nativo Java/Android, struct unificado BLEData, prefab plug-and-play (Biofeedback_UI_System) y pipeline de persistencia configurable en CSV (BLEDataSaver). Incluye app WearOS dedicada en Kotlin."
    },
    metrics: [
      { label: "Target XR", value: "Meta Quest", detail: "Android Standalone VR" },
      { label: "Data Pipeline", value: "Zero Alloc", detail: "Struct C# serializable" },
      { label: "Distribution", value: "UPM Git", detail: "Unity Package Manager" }
    ],
    stack: ["Unity", "C#", "WearOS / Android", "Bluetooth LE (BLE)", "Meta Quest VR", "CSV Telemetry", "Kotlin"],
    keyHighlights: [
      "Instalación directa vía Unity Package Manager (UPM) con Git URL",
      "Prefab plug-and-play Biofeedback_UI_System con escáner, conexión y persistencia CSV integrada",
      "Estructura BLEData serializable para pulso, IMU 6-DOF, presión barométrica y rotación en tiempo real",
      "Control bidireccional de frecuencia de transmisión del smartwatch en tiempo de ejecución",
      "Companion App nativa WearOS/Android modular con compilación independiente"
    ],
    codeSnippets: [
      {
        label: "BLEData.cs",
        code: `[System.Serializable]
public struct BLEData
{
    public float timestamp;        // Time.time recibido
    public int heartRate;          // BPM
    public Vector3 acceleration;   // Acelerómetro (X, Y, Z)
    public Vector3 gyroscope;      // Giroscopio (X, Y, Z)
    public float pressure;         // Barómetro (hPa)
    public int steps;              // Pasos acumulados
    public float light;            // Iluminancia (lx)
    public float temperature;      // Temp (°C)
    public float battery;          // Batería (%)
    public Quaternion rotation;    // Orientación
}`
      },
      {
        label: "Consumer.cs",
        code: `using UnityEngine;

public class BiofeedbackController : MonoBehaviour
{
    void OnEnable()  => BLEConnector.OnDataReceived += OnDataReceived;
    void OnDisable() => BLEConnector.OnDataReceived -= OnDataReceived;

    private void OnDataReceived(BLEData data)
    {
        // Latencia mínima para modulación de entorno VR
        Debug.Log($"HR: {data.heartRate} BPM | Acc: {data.acceleration}");
    }
}`
      }
    ]
  },
  {
    id: "nuclear-vr",
    num: "02",
    title: "NuclearVerse VR",
    subtitle: "Tokamak Fusion Reactor Digital Twin & Microsecond RAG Architecture",
    field: "Distributed AI & Spatial Computing",
    year: "2026",
    accent: "#38bdf8",
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
    ],
    codeSnippets: [
      {
        label: "TokamakBoundary.cs",
        code: `public class ToroidalSafetyBoundary : MonoBehaviour
{
    [SerializeField] private float majorRadius = 6.2f;
    [SerializeField] private float minorRadius = 2.0f;

    public bool ValidateActuatorPose(Vector3 targetPosition)
    {
        float planarDist = new Vector2(targetPosition.x, targetPosition.z).magnitude;
        float torusDist = Mathf.Sqrt(Mathf.Pow(planarDist - majorRadius, 2) + Mathf.Pow(targetPosition.y, 2));
        return torusDist <= minorRadius;
    }
}`
      }
    ]
  },
  {
    id: "humanoid-robotics",
    num: "03",
    title: "Humanoid Grasping",
    subtitle: "Autonomous 3D Point Cloud Perception Pipeline & Multi-Contact Kinematic Synthesis",
    field: "Autonomous Robotics & Vision",
    year: "2024",
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
    ],
    codeSnippets: [
      {
        label: "grasp_planner.cpp",
        code: `bool GraspPlanner::EvaluateForceClosure(
    const pcl::PointCloud<pcl::PointXYZRGB>::Ptr& cloud,
    const std::vector<ContactCandidate>& contacts) 
{
    Eigen::MatrixXd grasp_matrix = ComputeGraspMatrix(contacts);
    double quality = ComputeEpsilonQuality(grasp_matrix);
    return quality > MIN_FORCE_CLOSURE_EPSILON;
}`
      }
    ]
  },
  {
    id: "reinforcement-learning",
    num: "04",
    title: "Fantasy RL Agent",
    subtitle: "Deep Q-Network with Prioritized Experience Replay for Stochastic Multi-Agent Optimization",
    field: "Deep Reinforcement Learning",
    year: "2024",
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
    ],
    codeSnippets: [
      {
        label: "dqn_agent.py",
        code: `class PrioritizedReplayBuffer:
    def __init__(self, capacity: int, alpha: float = 0.6):
        self.capacity = capacity
        self.alpha = alpha
        self.tree = SumSegmentTree(capacity)
        
    def sample(self, batch_size: int, beta: float):
        indices, weights = self._sample_proportional(batch_size, beta)
        return self._get_transitions(indices), weights`
      }
    ]
  }
];
