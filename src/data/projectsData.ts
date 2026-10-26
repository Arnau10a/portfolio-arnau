export interface EngineeringProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  field: string;
  context?: string;
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
    id: "fusion-reactor-digital-twin",
    num: "01",
    title: "Fusion Reactor Digital Twin & Embedded Local RAG",
    subtitle: "Real-time VR simulation platform for maintenance validation in nuclear fusion facilities with local zero-cloud RAG.",
    field: "Industrial Simulation & Digital Twin",
    context: "IDOM Consulting for ITER / IFMIF-DONES",
    year: "2025 – 2026",
    accent: "#38bdf8",
    architecture: {
      overview: "Developed a real-time VR simulation platform for maintenance validation in international nuclear fusion facilities. Built custom polygon reduction and LOD pipelines to bring massive industrial CAD datasets (+5M polygons) into real-time frame budgets (>72 FPS). Integrated an offline local LLM (Llama 3.1 via llama.cpp C++ bindings) and high-speed vector retrieval (USearch) for instant, zero-cloud technical documentation lookups.",
      coreChallenge: "Sub-millimeter physics collision accuracy and zero-latency spatial tracking inside dense CAD toroidal geometries under strict VR refresh budgets (>72 FPS lock).",
      engineeringSolution: "Engineered a custom deterministic 1:1 physics constraints pipeline in C#/Unity, combined with an embedded local RAG vector engine (Llama 3.1 via llama.cpp C++ bindings and USearch) that queries indexed technical blueprints locally without external cloud dependencies."
    },
    metrics: [
      { label: "CAD Polygons", value: "+5M Polygons", detail: "LOD decimation pipeline" },
      { label: "Performance", value: ">72 FPS Target", detail: "Production VR budget" },
      { label: "Search Latency", value: "Sub-Second", detail: "Local USearch vector retrieval" },
      { label: "Cloud Deps", value: "Zero Cloud", detail: "100% offline llama.cpp" }
    ],
    stack: ["Unity C#", "C++ / llama.cpp", "USearch", "Python", "GLSL / Blender"],
    keyHighlights: [
      "Custom polygon reduction and LOD generation pipeline for +5M CAD fusion geometries",
      "Offline local LLM (Llama 3.1 via llama.cpp C++ bindings) with zero external network calls",
      "High-speed Approximate Nearest Neighbor (ANN) vector retrieval powered by USearch",
      "Sub-millimeter deterministic physics boundaries for virtual maintenance rehearsals"
    ],
    codeSnippets: [
      {
        label: "TokamakSafetyBoundary.cs",
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
      },
      {
        label: "llama_rag_bridge.cpp",
        code: `// C++ bindings linking local vector retrieval with llama.cpp
#include <usearch/index_dense.hpp>
#include <llama.h>

extern "C" {
    int query_local_context(const float* query_embedding, size_t dims, char* out_buffer, size_t max_len) {
        usearch::index_dense_t index = usearch::index_dense_t::load("fusion_manuals.usearch");
        auto results = index.search(query_embedding, 3);
        // Direct zero-copy dispatch into local Llama 3.1 prompt context
        return populate_prompt_context(results, out_buffer, max_len);
    }
}`
      }
    ]
  },
  {
    id: "biometric-telemetry-vr",
    num: "02",
    title: "Real-Time Biometric & Telemetry VR Streaming",
    subtitle: "Low-latency telemetry streaming pipeline transmitting live physiological data from wearables into Meta Quest XR.",
    field: "Real-Time IoT & Spatial Systems",
    context: "Centre de Realitat Virtual de Barcelona (CRV - UPC)",
    year: "2026",
    accent: "#06b6d4",
    githubUrl: "https://github.com/Arnau10a/unity-biofeedback-vr-core",
    packageUrl: "https://github.com/Arnau10a/unity-biofeedback-vr-core.git",
    architecture: {
      overview: "Engineered an end-to-end telemetry streaming pipeline transmitting live physiological data from wearable smartwatches (WearOS / Android via BLE) into immersive Meta Quest environments. Designed an event-driven architecture focused on zero garbage-collection allocations to preserve VR rendering budgets, alongside custom in-editor tools for researchers to calibrate live signals.",
      coreChallenge: "Integrating the native Android BLE stack into Unity XR's update loop without frame stutter or GC spikes, maintaining synchronous streams of heart rate (BPM), 6-axis IMU, and environmental metrics.",
      engineeringSolution: "Event-driven architecture with zero-allocation serializable structs, native Java/Android bridge, plug-and-play Unity Package Manager (UPM) distribution, and in-editor researcher calibration tools."
    },
    metrics: [
      { label: "Streaming", value: "Low-Latency BLE", detail: "Smartwatch telemetry" },
      { label: "Memory Loop", value: "Zero GC Allocs", detail: "Preserved VR frame budget" },
      { label: "Research Tools", value: "In-Editor Tools", detail: "Live signal calibration" },
      { label: "Target Platform", value: "Meta Quest XR", detail: "Android Standalone VR" }
    ],
    stack: ["Unity C#", "Bluetooth Low Energy (BLE)", "WearOS / Android", "UPM Package"],
    keyHighlights: [
      "Zero GC allocation struct pipeline in update loops guaranteeing 90 FPS VR rendering",
      "Native Android / WearOS Java bridge compiling independently with zero overhead",
      "Plug-and-play Unity Package Manager (UPM) distribution via Git URL",
      "In-editor telemetry monitor and CSV persistence suite for biomechanics research"
    ],
    codeSnippets: [
      {
        label: "BLEData.cs",
        code: `[System.Serializable]
public struct BLEData
{
    public float timestamp;        // Receive timestamp
    public int heartRate;          // BPM
    public Vector3 acceleration;   // Accelerometer (X, Y, Z)
    public Vector3 gyroscope;      // Gyroscope (X, Y, Z)
    public float pressure;         // Barometer (hPa)
    public int steps;              // Step count
    public float battery;          // Battery level (%)
    public Quaternion rotation;    // Orientation
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
        // Zero-allocation callback modulating VR spatial audio and lighting
        ApplyCardiovascularModulation(data.heartRate, data.acceleration);
    }
}`
      }
    ]
  },
  {
    id: "point-cloud-robotics",
    num: "03",
    title: "3D Point Cloud Perception & Hand Kinematics Pipeline",
    subtitle: "Autonomous spatial perception and multi-contact grasp pose synthesis for 16-DOF robotic hands.",
    field: "Autonomous Robotics & Spatial Perception",
    context: "Academic Robotics & Computer Vision Research",
    year: "2024",
    accent: "#a855f7",
    githubUrl: "https://github.com/Arnau10a/Humanoid-Robots-Grasping",
    architecture: {
      overview: "Designed an autonomous spatial perception pipeline for multi-contact robotic grasping. Processed dense 3D point clouds (filtering, surface normal estimation, and clustering) in C++ to synthesize kinematic poses for a 16-DOF robotic hand with sub-80ms pipeline latency.",
      coreChallenge: "Synthesizing multi-contact force closure points on arbitrary, unmodeled geometries in real time without access to offline CAD meshes.",
      engineeringSolution: "Designed an asynchronous ROS node pipeline written in C++ and Python, computing surface normal curvature distributions via Point Cloud Library (PCL) and evaluating GraspIt! energy metrics within an 80ms inference budget."
    },
    metrics: [
      { label: "Perception Latency", value: "< 80 ms", detail: "Real-time sensor loop" },
      { label: "Point Cloud", value: "3D Normal & Voxel", detail: "Curvature clustering" },
      { label: "Kinematics", value: "16-DOF Hand", detail: "Anthropomorphic reach" },
      { label: "IPC Middleware", value: "ROS / C++", detail: "Zero memory copy" }
    ],
    stack: ["C++", "ROS / ROS 2", "Point Cloud (PCL)", "Python", "OpenCV"],
    keyHighlights: [
      "Sub-80ms full loop from RGB-D raw point cloud ingestion to joint-angle actuation",
      "Voxel grid downsampling and curvature normal estimation in under 25ms via PCL",
      "16-DOF kinematic grasp synthesis using force-closure quality metrics"
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
    id: "local-vector-search",
    num: "04",
    title: "Local Semantic Search & High-Speed Vector Indexing Engine",
    subtitle: "Modular offline semantic search and vector indexing pipeline in C++ and Python with sub-millisecond latency.",
    field: "Applied AI & Systems Architecture",
    context: "Applied AI & Systems Architecture Research",
    year: "2024 – 2025",
    accent: "#10b981",
    architecture: {
      overview: "Engineered a modular, low-overhead offline semantic search and vector indexing pipeline in C++ and Python. Benchmarked and integrated fast Approximate Nearest Neighbor (ANN) search using USearch against heavy vector databases, minimizing memory footprint and eliminating external cloud dependencies for embedded retrieval.",
      coreChallenge: "Running low-latency vector similarity retrieval on constrained client hardware without consuming gigabytes of memory or relying on third-party cloud APIs.",
      engineeringSolution: "Implemented a lightweight native C++ core wrapping USearch with custom SIMD-optimized cosine similarity routines and lightweight Python C-extensions, achieving instant retrieval with deterministic resource consumption."
    },
    metrics: [
      { label: "Search Latency", value: "Sub-Millisecond", detail: "In-memory vector index" },
      { label: "RAM Footprint", value: "Minimal Overhead", detail: "Vs heavy vector DBs" },
      { label: "Cloud Deps", value: "Zero Cloud", detail: "100% offline retrieval" },
      { label: "Core Execution", value: "Native C++", detail: "SIMD vector execution" }
    ],
    stack: ["C++", "Python", "USearch", "Local Embeddings", "CMake"],
    keyHighlights: [
      "Offline vector similarity index benchmarked for sub-millisecond search latencies",
      "Fraction of the RAM footprint compared to bulky multi-gigabyte vector databases",
      "Zero cloud reliance ensuring strict confidentiality for proprietary technical documentation",
      "Optimized C++ core with clean Python bindings for rapid experimental iteration"
    ],
    codeSnippets: [
      {
        label: "vector_index.cpp",
        code: `#include <usearch/index_dense.hpp>
#include <iostream>

using namespace unum::usearch;

index_dense_t build_embedded_index(size_t dimensions, metric_kind_t metric) {
    index_dense_config_t config;
    config.expansion_add = 64;
    config.expansion_search = 32;
    
    index_dense_t index = index_dense_t::make(dimensions, metric, config);
    index.reserve(50000); // Pre-allocate memory for deterministic execution
    return index;
}`
      }
    ]
  }
];
