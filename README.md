# NEXUS AI 2.0
### Autonomous Multi-Hazard Emergency Intelligence & Response Platform

> **Tagline:** *Detect. Predict. Decide. Respond. Save Lives.*

NEXUS AI is a startup-grade, production-quality emergency intelligence command center engineered for modern disaster-response organizations, state disaster management authorities, and civil protection teams.

---

## 🎯 The Core Intelligence Pipeline

```
SIGNAL → DETECT → VERIFY → PREDICT → ASSESS → DECIDE → COORDINATE → RESPOND → MONITOR → LEARN
```

Every major interface view in NEXUS AI communicates this life-saving autonomous pipeline.

---

## 🌟 Key Capabilities

1. **Multi-Hazard Detection Engine**: Real-time monitoring across 10 disaster categories:
   - Urban Flash Flood
   - Forest & Wildland Interface Fire
   - Petrochemical Gas Dispersion
   - Ghat Arterial Landslide
   - Multi-Vehicle Tunnel Pileup
   - Coastal Cyclone & Storm Surge
   - Structural Failure & Subsidence
   - Pilgrim Crowd Density Surge
   - Railway Wildlife Intrusion
   - Extreme Urban Heat Island

2. **AI Emergency Commander**:
   - Structured action directives (01 Evacuation, 02 Unit Dispatch, 03 Shelter Activation, 04 Hospital Surge, 05 Road Cordon).
   - Human-in-the-loop safety guardrails preventing unconfirmed hazardous actions.

3. **NEXUS Risk Index (0–100)**:
   - Animated circular risk gauge with composite score calculation.
   - Explainable AI (XAI) feature attribution breakdown explaining why risk is critical.

4. **Predictive Risk & What-If Simulator**:
   - 70-minute hazard evolution curves for water depth and flame front propagation.
   - Interactive simulator with sliders for precipitation, water depth, and road accessibility across 8 dynamic response stages.

5. **3D Emergency Digital Twin**:
   - WebGL Three.js spatial view featuring procedural urban blocks, animated hazard rings, and drone reconnaissance paths.

6. **Tactical GIS Emergency Map**:
   - Leaflet with CartoDB Dark Matter tiles, custom SVG beacon icons, dynamic hazard envelopes, and color-coded safe vs. blocked evacuation routes.

7. **Multilingual Emergency Voice Assistant**:
   - Real-time speech recognition & text-to-speech in **English, Telugu (తెలుగు), Hindi (हिंदी), Tamil (தமிழ்), and Kannada (ಕನ್ನಡ)** with audio waveforms.

8. **Offline Emergency Mode**:
   - Built-in network failure simulator: `ONLINE` → `NETWORK LOST` → `OFFLINE MODE` → `SYNCING`.
   - Local queuing of citizen SOS distress beacons with auto-reconnect synchronization.

9. **Computer Vision Lab**:
   - Detection bounding boxes for flood submersion, vehicle pileup, and fire canopy with confidence scoring.

10. **Signature 17-Step Live Demo Runner**:
    - One-click autonomous sequence showcasing the complete pipeline from baseline sensor anomaly to final response stabilization.

---

## 🚀 Quick Start

### Frontend (Next.js 14)
```bash
# Install dependencies
npm install

# Start development command center
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (Python FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API Documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🧭 Navigation Structure

- `/` — Cinematic Landing Page
- `/command` — Main Emergency Command Center Dashboard
- `/map` — Tactical Full-Screen GIS Map
- `/incidents` — Live Incidents Feed & Filtering
- `/incidents/[id]` — Detailed Incident Dossier (Tabs: Overview, Risk, Commander, Timeline, Evidence, Resources)
- `/twin` — 3D Emergency Digital Twin
- `/computer-vision` — Computer Vision AI Lab
- `/sos` — Citizen SOS Distress Portal
- `/simulator` — What-If Scenario Simulator
- `/resources` — Resource Orchestrator Fleet
- `/analytics` — Risk & Performance Analytics
