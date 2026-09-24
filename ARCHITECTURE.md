# NEXUS AI 2.0 — Architecture Documentation

## 1. System High-Level Topology

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  [Next.js 14 App Router]      [Tactical GIS Map]        [Three.js 3D Twin]         |
|  * Command Dashboard          * CartoDB Dark Matter     * Urban Procedural Mesh   |
|  * AI Commander Directives    * SVG Beacon DivIcons     * Hazard Expansion Rings  |
|  * Explainable Risk Gauge     * Evacuation Corridors    * Recon Drone Telemetry   |
|  * Multilingual Voice (5 Lang)* Offline Local Cache     * WebGL Shaders           |
+-----------------------------------------------------------------------------------+
                                         │
                   WebSocket & REST APIs │ Local State & Offline Fallback
                                         ▼
+-----------------------------------------------------------------------------------+
|                                 SERVICES LAYER                                    |
|                                                                                   |
|  [Emergency Context Engine]  [FastAPI Backend]        [Firebase / Cloud Layer]    |
|  * 17-Step Demo Runner       * REST Resource APIs     * Optional Cloud Firestore  |
|  * Offline Beacon Queue      * WS Telemetry Stream    * Real-time Auth Persistence|
|  * Proximity Geo Matching    * OpenCV CV Analytics    * Emergency Push Relays     |
+-----------------------------------------------------------------------------------+
```

## 2. Core Modules

### 2.1 Geospatial Map Engine (`components/map/LiveEmergencyMap.tsx`)
- Utilizes Leaflet with custom DOM SVG markers to avoid missing asset dependencies.
- Smooth camera coordinate fly-tos when switching between incidents across Indian regions.
- Overlay layers for dynamic hazard circles, green safe evacuation corridors, and red-dashed inundated roads.

### 2.2 AI Emergency Commander (`components/commander/AIEmergencyCommander.tsx`)
- Structured action pipeline: Directives are numbered 01 through 05.
- Enforces strict human-in-the-loop safety guardrails: dispatch actions trigger an explicit confirmation modal before transmitting orders.

### 2.3 NEXUS Risk Index & XAI (`components/risk/NexusRiskGauge.tsx`)
- Computes a weighted 0-100 composite index based on:
  - Hazard Severity (30%)
  - Population Exposure (25%)
  - Infrastructure Fragility (20%)
  - Weather Instability (15%)
  - Egress / Road Accessibility (10%)
- Explainable AI breakdown clarifies the specific causal factors driving high risk.

### 2.4 Offline Emergency Mode (`lib/offlineStorage.ts` & `components/offline/OfflineBanner.tsx`)
- Simulates realistic field disconnections.
- Queues distress beacons into local browser memory with automatic batch upload upon network restoration.
