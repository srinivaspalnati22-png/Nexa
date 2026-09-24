# NEXUS AI 2.0 — REST & WebSocket API Specification

## Base URL
- Local: `http://localhost:8000`
- Interactive Swagger UI: `http://localhost:8000/docs`

---

## Endpoints

### 1. Incident Management
- `GET /api/incidents` — Returns all active and confirmed incidents.
- `GET /api/incidents/{id}` — Returns detailed dossier for a specific incident.
- `POST /api/incidents` — Registers a newly ingested hazard incident.
- `POST /api/incidents/{id}/verify` — Executes AI multi-factor cross-check matrix.
- `POST /api/incidents/{id}/dispatch` — Authorizes dispatch of a tactical unit (ambulance/rescue team).
- `POST /api/incidents/{id}/simulate` — Computes 8-stage hazard expansion and population impact.

### 2. Resources & Infrastructure
- `GET /api/resources` — Returns all ambulances, rescue units, and hazmat squads with GPS coordinates and ETA.
- `GET /api/hospitals` — Returns medical trauma centers with live available bed and ICU capacities.
- `GET /api/shelters` — Returns designated relief sanctuaries with occupancy and ration supplies.
- `GET /api/map-data` — Unified endpoint providing geospatial coordinates for all layers.

### 3. Computer Vision & Intelligence
- `POST /api/cv/detect` — Accepts image/video frames and returns bounding boxes, labels, and confidence.
- `GET /api/risk` — Returns the current overall NEXUS Risk Index and XAI attribution factors.

### 4. Real-Time Telemetry Stream
- `WS /ws/emergency` — Real-time WebSocket broadcasting sensor telemetry ticks, flood depth spikes, and emergency notifications.
