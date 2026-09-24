export type HazardType = 
  | 'flood'
  | 'fire'
  | 'landslide'
  | 'severe_weather'
  | 'industrial_gas_leak'
  | 'road_accident'
  | 'structural_failure'
  | 'crowd_emergency'
  | 'wildlife_intrusion'
  | 'extreme_heat';

export type SeverityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type IncidentStatus = 
  | 'DETECTED'
  | 'VERIFYING'
  | 'VERIFIED'
  | 'ACTIVE'
  | 'CONTAINED'
  | 'RESOLVED';

export type UserRole = 'ADMIN' | 'OPERATOR' | 'RESPONDER' | 'CITIZEN';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface VerificationCheck {
  id: string;
  source: 'citizen_report' | 'cctv_vision' | 'sensor_anomaly' | 'weather_feed' | 'historical_pattern';
  label: string;
  verified: boolean;
  confidence: number;
  evidence: string;
  timestamp: string;
}

export interface RiskFactor {
  name: string;
  score: number; // 0-100
  weight: number;
  impactReason: string;
}

export interface PredictiveStep {
  timeOffsetMinutes: number;
  label: string;
  value: number; // e.g., water level in m or fire spread km2
  unit: string;
  riskScore: number;
  predictedPopulationImpact: number;
}

export interface EmergencyAction {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  category: 'evacuation' | 'dispatch' | 'medical' | 'infrastructure' | 'communication';
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'CONFIRMED';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  targetUnitId?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  source: string;
  confidence: number;
  actionTaken?: string;
  severity: SeverityLevel;
}

export interface Incident {
  id: string;
  code: string; // e.g. "NX-2048"
  title: string;
  hazardType: HazardType;
  severity: SeverityLevel;
  confidence: number; // 0-100
  status: IncidentStatus;
  locationName: string;
  coordinates: Coordinates;
  affectedRadiusMeters: number;
  polygonCoordinates?: Coordinates[];
  populationAtRisk: number;
  riskScore: number; // Overall NEXUS Risk Index 0-100
  riskFactors: {
    hazard: number;
    population: number;
    infrastructure: number;
    weather: number;
    accessibility: number;
  };
  sensorReadings: {
    sensorId: string;
    type: string;
    reading: string;
    status: 'NORMAL' | 'WARNING' | 'ALERT';
  }[];
  verificationChecks: VerificationCheck[];
  verificationConfidence: number;
  predictiveForecast: PredictiveStep[];
  recommendedActions: EmergencyAction[];
  timeline: TimelineEvent[];
  assignedResources: string[];
  weather: {
    temp: number;
    humidity: number;
    windSpeed: number;
    rainfall: number;
    condition: string;
  };
  reportedAt: string;
  updatedAt: string;
}

export interface ResourceUnit {
  id: string;
  callSign: string;
  type: 'AMBULANCE' | 'RESCUE_TEAM' | 'FIRE_TRUCK' | 'POLICE_PATROL' | 'DRONE_UNIT';
  status: 'AVAILABLE' | 'DISPATCHED' | 'ON_SCENE' | 'MAINTENANCE';
  coordinates: Coordinates;
  baseStation: string;
  personnelCount: number;
  etaMinutes?: number;
  distanceKm?: number;
  capacity?: number;
  currentAssignment?: string;
  contactNumber: string;
}

export interface MedicalFacility {
  id: string;
  name: string;
  type: 'HOSPITAL' | 'TRAUMA_CENTER' | 'CLINIC';
  coordinates: Coordinates;
  totalBeds: number;
  availableBeds: number;
  icuBedsAvailable: number;
  traumaLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';
  status: 'NORMAL' | 'SURGE' | 'CRITICAL_CAPACITY';
  distanceKm?: number;
  contactNumber: string;
}

export interface ReliefShelter {
  id: string;
  name: string;
  coordinates: Coordinates;
  capacity: number;
  currentOccupancy: number;
  status: 'OPEN' | 'STANDBY' | 'FULL';
  hasMedicalPost: boolean;
  foodSuppliesDays: number;
  contactPerson: string;
  contactNumber: string;
}

export interface IoTSensor {
  id: string;
  name: string;
  hazardType: HazardType;
  coordinates: Coordinates;
  status: 'ONLINE' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  lastPing: string;
  metricLabel: string;
  currentValue: number;
  thresholdValue: number;
  unit: string;
  batteryLevel: number;
}

export interface CitizenSOSReport {
  id: string;
  reporterName: string;
  contactPhone: string;
  coordinates: Coordinates;
  locationText: string;
  emergencyType: HazardType;
  reportedAt: string;
  status: 'NEW' | 'VERIFIED' | 'RESPONDED';
  peopleCount: number;
  notes: string;
  mediaUrl?: string;
}

export interface EvacuationRoute {
  id: string;
  incidentId: string;
  name: string;
  type: 'FASTEST' | 'SAFEST' | 'LOWEST_RISK';
  status: 'OPEN' | 'CONGESTED' | 'BLOCKED';
  waypoints: Coordinates[];
  estimatedTransitMinutes: number;
  safetyScore: number; // 0-100
  hazardProximityKm: number;
}

export interface CVDetectionResult {
  id: string;
  label: string;
  confidence: number;
  box: { x: number; y: number; width: number; height: number }; // normalized 0-1
  severity: SeverityLevel;
  suggestedHazard: HazardType;
}

export interface NotificationItem {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  title: string;
  message: string;
  timestamp: string;
  incidentId?: string;
  read: boolean;
}

export interface DemoScenario {
  id: string;
  title: string;
  hazardType: HazardType;
  description: string;
  location: string;
  initialRisk: number;
  stepsCount: number;
  badge: string;
}
