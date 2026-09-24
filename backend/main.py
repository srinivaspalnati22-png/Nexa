import asyncio
import json
import random
import time
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="NEXUS AI 2.0 Emergency Intelligence Engine",
    description="Autonomous Multi-Hazard Emergency Intelligence & Response Platform REST + WebSocket API",
    version="2.0.0"
)

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class Coordinates(BaseModel):
    lat: float
    lng: float

class VerificationCheck(BaseModel):
    id: str
    source: str
    label: str
    verified: bool
    confidence: float
    evidence: str
    timestamp: str

class PredictiveStep(BaseModel):
    timeOffsetMinutes: int
    label: str
    value: float
    unit: str
    riskScore: int
    predictedPopulationImpact: int

class EmergencyAction(BaseModel):
    id: str
    stepNumber: str
    title: str
    description: str
    category: str
    status: str
    priority: str
    targetUnitId: Optional[str] = None

class IncidentModel(BaseModel):
    id: str
    code: str
    title: str
    hazardType: str
    severity: str
    confidence: float
    status: str
    locationName: str
    coordinates: Coordinates
    affectedRadiusMeters: int
    populationAtRisk: int
    riskScore: int
    riskFactors: Dict[str, int]
    verificationConfidence: float
    reportedAt: str

class DispatchRequest(BaseModel):
    incidentId: str
    unitId: str
    authorizedBy: str = "CommandOperator"

class SimulationRequest(BaseModel):
    hazardType: str
    rainfall: float = 140.0
    waterLevel: float = 5.2
    populationDensity: int = 8500
    roadAccessibility: int = 40

# --- Seed In-Memory Store ---
INCIDENTS_DB = [
    {
        "id": "inc-001",
        "code": "NX-2048",
        "title": "Mithi River Basin Flash Flood & Inundation",
        "hazardType": "flood",
        "severity": "CRITICAL",
        "confidence": 94.0,
        "status": "ACTIVE",
        "locationName": "Kurla West & BKC Connector, Mumbai",
        "coordinates": {"lat": 19.0688, "lng": 72.8715},
        "affectedRadiusMeters": 1850,
        "populationAtRisk": 8420,
        "riskScore": 88,
        "riskFactors": {
            "hazard": 92,
            "population": 86,
            "infrastructure": 84,
            "weather": 89,
            "accessibility": 74
        },
        "verificationConfidence": 94.0,
        "reportedAt": "17:21:03"
    },
    {
        "id": "inc-002",
        "code": "NX-2051",
        "title": "Western Ghats Tea Estate Wildfire Outbreak",
        "hazardType": "fire",
        "severity": "HIGH",
        "confidence": 91.0,
        "status": "ACTIVE",
        "locationName": "Kotagiri Ridge, Nilgiris Foothills",
        "coordinates": {"lat": 11.4230, "lng": 76.8660},
        "affectedRadiusMeters": 2400,
        "populationAtRisk": 2850,
        "riskScore": 78,
        "riskFactors": {
            "hazard": 85,
            "population": 62,
            "infrastructure": 70,
            "weather": 91,
            "accessibility": 82
        },
        "verificationConfidence": 91.0,
        "reportedAt": "16:45:10"
    }
]

RESOURCES_DB = [
    {"id": "amb-01", "callSign": "Ambulance A-12", "type": "AMBULANCE", "status": "AVAILABLE", "lat": 19.0620, "lng": 72.8650, "etaMinutes": 6, "distanceKm": 2.4},
    {"id": "amb-02", "callSign": "Ambulance A-05", "type": "AMBULANCE", "status": "DISPATCHED", "lat": 19.0740, "lng": 72.8800, "etaMinutes": 9, "distanceKm": 3.8},
    {"id": "res-01", "callSign": "NDRF Battalion Unit 05", "type": "RESCUE_TEAM", "status": "AVAILABLE", "lat": 19.0710, "lng": 72.8630, "etaMinutes": 9, "distanceKm": 3.1}
]

HOSPITALS_DB = [
    {"id": "hosp-01", "name": "Sion Municipal General Hospital", "totalBeds": 1200, "availableBeds": 142, "icuBeds": 24, "distanceKm": 3.8, "status": "SURGE"},
    {"id": "hosp-02", "name": "Sanjeevani Trauma Care, Khandala", "totalBeds": 240, "availableBeds": 48, "icuBeds": 12, "distanceKm": 2.1, "status": "NORMAL"}
]

SHELTERS_DB = [
    {"id": "sh-01", "name": "Kurla West Municipal School Relief Center", "capacity": 450, "currentOccupancy": 180, "status": "OPEN"},
    {"id": "sh-02", "name": "Don Bosco Youth Center, Kurla", "capacity": 600, "currentOccupancy": 210, "status": "OPEN"}
]

# --- REST Endpoints ---
@app.get("/")
def read_root():
    return {
        "platform": "NEXUS AI 2.0",
        "tagline": "Detect. Predict. Decide. Respond. Save Lives.",
        "status": "OPERATIONAL",
        "active_hazards": len(INCIDENTS_DB),
        "docs_url": "/docs"
    }

@app.get("/api/incidents")
def get_incidents():
    return INCIDENTS_DB

@app.get("/api/incidents/{incident_id}")
def get_incident(incident_id: str):
    inc = next((i for i in INCIDENTS_DB if i["id"] == incident_id), None)
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    return inc

@app.post("/api/incidents")
def create_incident(incident: IncidentModel):
    INCIDENTS_DB.append(incident.model_dump())
    return {"status": "SUCCESS", "incidentId": incident.id}

@app.post("/api/incidents/{incident_id}/verify")
def verify_incident(incident_id: str):
    inc = next((i for i in INCIDENTS_DB if i["id"] == incident_id), None)
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    inc["status"] = "VERIFIED"
    inc["verificationConfidence"] = 98.0
    return {
        "incidentId": incident_id,
        "verificationConfidence": 98.0,
        "status": "VERIFIED",
        "crossCheckFactors": ["citizen_report", "cctv_vision", "sensor_anomaly", "weather_feed", "historical_pattern"]
    }

@app.post("/api/incidents/{incident_id}/dispatch")
def dispatch_resource(incident_id: str, payload: DispatchRequest):
    unit = next((u for u in RESOURCES_DB if u["id"] == payload.unitId), None)
    if unit:
        unit["status"] = "DISPATCHED"
    return {
        "status": "SUCCESS",
        "incidentId": incident_id,
        "unitId": payload.unitId,
        "dispatchedAt": time.strftime("%H:%M:%S")
    }

@app.post("/api/incidents/{incident_id}/simulate")
def simulate_incident(incident_id: str, req: SimulationRequest):
    # Deterministic simulation calculation
    predicted_risk = min(99, int((req.rainfall * 0.3) + (req.waterLevel * 8) + (req.populationDensity / 400) - (req.roadAccessibility * 0.2)))
    impacted_civilians = int(req.populationDensity * 1.45)
    return {
        "incidentId": incident_id,
        "simulatedRisk": predicted_risk,
        "impactedCivilians": impacted_civilians,
        "estimatedEvacTimeMinutes": 18.5,
        "recommendedUnits": max(4, impacted_civilians // 700),
        "confidence": 92.4
    }

@app.get("/api/resources")
def get_resources():
    return RESOURCES_DB

@app.get("/api/hospitals")
def get_hospitals():
    return HOSPITALS_DB

@app.get("/api/shelters")
def get_shelters():
    return SHELTERS_DB

@app.get("/api/risk")
def get_risk_index():
    return {
        "overallIndex": 88,
        "level": "CRITICAL",
        "factors": {
            "hazard": 92,
            "population": 86,
            "infrastructure": 84,
            "weather": 89,
            "accessibility": 74
        },
        "explainableAI": "Primary escalation driven by 142mm/h convective cloudburst and flooded arterial underpasses."
    }

@app.get("/api/map-data")
def get_map_data():
    return {
        "incidents": INCIDENTS_DB,
        "resources": RESOURCES_DB,
        "hospitals": HOSPITALS_DB,
        "shelters": SHELTERS_DB
    }

@app.post("/api/cv/detect")
async def detect_hazard_cv(file: Optional[UploadFile] = None):
    # Simulated OpenCV computer vision bounding box inference
    return {
        "status": "SUCCESS",
        "model": "YOLO-DisasterV8-FastAPI",
        "detections": [
            {"label": "Flood Water Submersion", "confidence": 96.4, "box": {"x": 0.1, "y": 0.45, "width": 0.8, "height": 0.5}, "severity": "CRITICAL"},
            {"label": "Submerged Vehicle", "confidence": 92.1, "box": {"x": 0.35, "y": 0.5, "width": 0.28, "height": 0.35}, "severity": "HIGH"}
        ]
    }

# --- WebSocket Telemetry Stream ---
@app.websocket("/ws/emergency")
async def websocket_emergency_feed(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Broadcast simulated IoT sensor pulse every 3 seconds
            payload = {
                "event": "SENSOR_TELEMETRY_TICK",
                "timestamp": time.strftime("%H:%M:%S"),
                "sensorId": "sn-01",
                "type": "River Water Depth",
                "value": round(5.2 + random.uniform(-0.05, 0.08), 2),
                "unit": "m",
                "status": "ALERT"
            }
            await websocket.send_text(json.dumps(payload))
            await asyncio.sleep(3)
    except WebSocketDisconnect:
        pass
