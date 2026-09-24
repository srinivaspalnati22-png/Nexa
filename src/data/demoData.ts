import { 
  Incident, 
  ResourceUnit, 
  MedicalFacility, 
  ReliefShelter, 
  IoTSensor, 
  CitizenSOSReport,
  DemoScenario
} from '@/types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'scenario-ap-cyclone',
    title: 'AP Cyclone & Deep Depression Landfall',
    hazardType: 'severe_weather',
    description: 'Bay of Bengal Deep Depression crossing North Andhra coast near Kalingapatnam with gale force gusts of 75 km/h and extreme rainfall.',
    location: 'Kalingapatnam & Srikakulam Coast, Andhra Pradesh',
    initialRisk: 93,
    stepsCount: 17,
    badge: 'IMD RED ALERT'
  },
  {
    id: 'scenario-ap-budameru',
    title: 'Budameru Rivulet Breach & Vijayawada Flood',
    hazardType: 'flood',
    description: 'Catastrophic breach of Budameru diversion channel inundating Ajit Singh Nagar, Payakapuram, and Vidyadharapuram with 4.8m floodwaters.',
    location: 'Ajit Singh Nagar, Vijayawada, Andhra Pradesh',
    initialRisk: 96,
    stepsCount: 17,
    badge: 'CRITICAL INUNDATION'
  },
  {
    id: 'scenario-gas',
    title: 'Visakhapatnam Industrial Corridor Hazard',
    hazardType: 'industrial_gas_leak',
    description: 'Petrochemical plant containment pressure valve failure releasing chemical aerosol downwind towards Gajuwaka residential zone.',
    location: 'Pharma City, Visakhapatnam Corridor, AP',
    initialRisk: 91,
    stepsCount: 16,
    badge: 'HAZMAT LEVEL 3'
  },
  {
    id: 'scenario-machilipatnam',
    title: 'Machilipatnam Coastal Surge & Sea Intrusion',
    hazardType: 'severe_weather',
    description: 'Storm surge wave overtopping Gilakaladindi harbor breakwater by 2.4 meters, flooding coastal fishermen habitations.',
    location: 'Machilipatnam Port, Krishna District, AP',
    initialRisk: 86,
    stepsCount: 15,
    badge: 'PORT WARNING 7'
  },
  {
    id: 'scenario-landslide',
    title: 'Ghat Section Highway Landslide',
    hazardType: 'landslide',
    description: 'Heavy torrential downpour triggered 14,000 cu.m debris flow blocking critical mountain pass arterial road.',
    location: 'Araku Valley Ghat Pass, KM 38, AP',
    initialRisk: 82,
    stepsCount: 14,
    badge: 'ROAD BLOCKED'
  }
];

export const DEMO_INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    code: 'NX-AP-2048',
    title: 'Bay of Bengal Deep Depression & Cyclone Landfall',
    hazardType: 'severe_weather',
    severity: 'CRITICAL',
    confidence: 96,
    status: 'ACTIVE',
    locationName: 'Kalingapatnam Coastal Belt, Srikakulam, Andhra Pradesh',
    coordinates: { lat: 18.3400, lng: 84.1200 },
    affectedRadiusMeters: 3800,
    populationAtRisk: 24500,
    riskScore: 94,
    riskFactors: {
      hazard: 96,
      population: 92,
      infrastructure: 88,
      weather: 98,
      accessibility: 84
    },
    sensorReadings: [
      { sensorId: 'sn-ap-01', type: 'Doppler Cyclone Barometer', reading: '992.4 hPa (Severe Low Depression)', status: 'ALERT' },
      { sensorId: 'sn-ap-02', type: 'Kalingapatnam Tide Gauge', reading: '3.4m Storm Surge Wave', status: 'ALERT' },
      { sensorId: 'sn-ap-03', type: 'Anemometer Wind Station', reading: '78 km/h Gusts (Squall Warning)', status: 'ALERT' },
      { sensorId: 'sn-ap-04', type: 'Pluviometer Rain Gauge', reading: '185 mm/24hr (Extremely Heavy)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v1', source: 'weather_feed', label: 'IMD Amaravati Doppler Cyclone Radar', verified: true, confidence: 99, evidence: 'Deep Depression center crossing coastline near 18.34°N with severe convective bands', timestamp: '5m ago' },
      { id: 'v2', source: 'cctv_vision', label: 'APSDMA Coastal Optical Cameras', verified: true, confidence: 96, evidence: 'Massive wave overtopping sea walls and sand dunes at Kalingapatnam lighthouse', timestamp: '8m ago' },
      { id: 'v3', source: 'sensor_anomaly', label: 'Srikakulam Hydro-Station Network', verified: true, confidence: 98, evidence: 'Barometric pressure plunged 14 hPa in 3 hours; water surge crossing alert line', timestamp: '12m ago' },
      { id: 'v4', source: 'citizen_report', label: 'Toll-Free 1070 Emergency Calls', verified: true, confidence: 94, evidence: '64 verified citizen reports of uprooted trees and seawater entered in coastal huts', timestamp: '10m ago' },
      { id: 'v5', source: 'historical_pattern', label: 'AP Coastal Storm Surge Hydrodynamic Model', verified: true, confidence: 92, evidence: 'Matches 2021 Cyclone Gulab & 2018 Titli surge path and inundation footprint', timestamp: '15m ago' }
    ],
    verificationConfidence: 96,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Landfall', value: 3.4, unit: 'm Surge', riskScore: 94, predictedPopulationImpact: 24500 },
      { timeOffsetMinutes: 20, label: '+20 Min Peak Squall', value: 4.1, unit: 'm Surge', riskScore: 97, predictedPopulationImpact: 32000 },
      { timeOffsetMinutes: 40, label: '+40 Min Inundation', value: 4.6, unit: 'm Surge', riskScore: 98, predictedPopulationImpact: 41000 },
      { timeOffsetMinutes: 70, label: '+70 Min Eye Drift', value: 3.8, unit: 'm Surge', riskScore: 89, predictedPopulationImpact: 31000 }
    ],
    recommendedActions: [
      { id: 'act-1', stepNumber: '01', title: 'Issue Red Alert Evacuation for Coastal Mandals (Gara & Kalingapatnam)', description: 'Trigger automated Telugu & English voice SMS broadcast to 24,000+ residents within 2km of high tide line.', category: 'evacuation', status: 'EXECUTING', priority: 'CRITICAL' },
      { id: 'act-2', stepNumber: '02', title: 'Dispatch NDRF 10th Battalion & SDRF Marine Units', description: 'Deploy motorized inflatable rescue boats and tree clearing hydraulic saws along NH-16.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-ap-01' },
      { id: 'act-3', stepNumber: '03', title: 'Open Cyclone Relief Sanctuaries CS-01 & CS-02', description: 'Activate 1,500-capacity reinforced cyclone shelters with food packets and solar generators.', category: 'medical', status: 'COMPLETED', priority: 'HIGH', targetUnitId: 'sh-ap-01' },
      { id: 'act-4', stepNumber: '04', title: 'Alert RIMS Srikakulam & KGH Visakhapatnam Trauma Units', description: 'Mobilize emergency power generators, oxygen stockpiles, and Level-1 disaster surgical teams.', category: 'medical', status: 'CONFIRMED', priority: 'HIGH', targetUnitId: 'hosp-ap-01' },
      { id: 'act-5', stepNumber: '05', title: 'Impose Fishing Ban & Port Warning Signal 7', description: 'Ensure all 840 registered fishing trawlers anchored; seal low-lying coastal bridges.', category: 'infrastructure', status: 'COMPLETED', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-1', timestamp: '14:02:11', event: 'IMD Amaravati issued Red Alert: Deep depression intensifying towards Kalingapatnam', source: 'IMD Doppler Radar #VZG', confidence: 99, severity: 'CRITICAL' },
      { id: 't-2', timestamp: '14:04:30', event: 'NEXUS Autonomous Verification confirmed 96% multi-stream correlation', source: 'AI Verification Matrix', confidence: 96, severity: 'CRITICAL' },
      { id: 't-3', timestamp: '14:08:00', event: 'Evacuation corridors established towards designated cyclone relief centers', source: 'Geospatial Radar', confidence: 95, actionTaken: 'Route 16-A opened for emergency transit', severity: 'HIGH' },
      { id: 't-4', timestamp: '14:12:15', event: 'SDRF Coastal Unit 02 dispatched with satellite communication phones', source: 'Resource Orchestrator', confidence: 98, actionTaken: 'Dispatched 4 motorized boats', severity: 'CRITICAL' }
    ],
    assignedResources: ['res-ap-01', 'amb-ap-01', 'amb-ap-02', 'hosp-ap-01', 'sh-ap-01'],
    weather: { temp: 26.6, humidity: 94, windSpeed: 78, rainfall: 185, condition: 'Severe Cyclonic Depression' },
    reportedAt: '14:02:11',
    updatedAt: 'Just now'
  },
  {
    id: 'inc-002',
    code: 'NX-AP-2050',
    title: 'Budameru Rivulet Breach & Vijayawada Flash Flood',
    hazardType: 'flood',
    severity: 'CRITICAL',
    confidence: 97,
    status: 'ACTIVE',
    locationName: 'Ajit Singh Nagar & Payakapuram, Vijayawada, Andhra Pradesh',
    coordinates: { lat: 16.5410, lng: 80.6270 },
    affectedRadiusMeters: 4200,
    populationAtRisk: 86000,
    riskScore: 96,
    riskFactors: {
      hazard: 98,
      population: 96,
      infrastructure: 94,
      weather: 95,
      accessibility: 90
    },
    sensorReadings: [
      { sensorId: 'sn-ap-05', type: 'Budameru Inflow Sonar', reading: '62,000 cusecs (Breach Level)', status: 'ALERT' },
      { sensorId: 'sn-ap-06', type: 'Prakasam Barrage Discharge', reading: '11.4 Lakh Cusecs (Maximum Surplus)', status: 'ALERT' },
      { sensorId: 'sn-ap-07', type: 'Urban Inundation Depth', reading: '4.8m (Submerging ground floors)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v21', source: 'citizen_report', label: 'Citizen SOS & Drone Streams', verified: true, confidence: 98, evidence: 'Over 180 emergency calls from Ajit Singh Nagar with families stranded on rooftops', timestamp: '6m ago' },
      { id: 'v22', source: 'cctv_vision', label: 'VMC Smart City Traffic CCTV', verified: true, confidence: 97, evidence: 'Inner Ring Road completely inundated; current moving at 2.8 m/s', timestamp: '4m ago' },
      { id: 'v23', source: 'sensor_anomaly', label: 'Water Resources Dept Telemetry', verified: true, confidence: 99, evidence: 'Embankment breach confirmed at Rayanapadu and Shanti Nagar', timestamp: '10m ago' }
    ],
    verificationConfidence: 97,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Level', value: 4.8, unit: 'm', riskScore: 96, predictedPopulationImpact: 86000 },
      { timeOffsetMinutes: 20, label: '+20 Min Inundation', value: 5.4, unit: 'm', riskScore: 98, predictedPopulationImpact: 110000 },
      { timeOffsetMinutes: 40, label: '+40 Min Peak Flow', value: 5.9, unit: 'm', riskScore: 99, predictedPopulationImpact: 145000 },
      { timeOffsetMinutes: 70, label: '+70 Min Stabilize', value: 5.5, unit: 'm', riskScore: 92, predictedPopulationImpact: 125000 }
    ],
    recommendedActions: [
      { id: 'act-21', stepNumber: '01', title: 'Deploy Indian Air Force Helicopters from Gannavaram for Food Drops', description: 'Airdrop drinking water, ORS sachets, and food packets to rooftops in Singh Nagar.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-ap-03' },
      { id: 'act-22', stepNumber: '02', title: 'Deploy 45 NDRF & SDRF Motorized Inflatable Rescue Boats', description: 'Extract infants, dialysis patients, and elderly citizens from flooded ground floor apartments.', category: 'evacuation', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-ap-02' },
      { id: 'act-23', stepNumber: '03', title: 'Open Indira Gandhi Stadium & Bishop Azariah Relief Camps', description: 'Deploy medical triage posts with anti-venom, cholera prevention, and hot meals.', category: 'medical', status: 'COMPLETED', priority: 'HIGH', targetUnitId: 'sh-ap-02' }
    ],
    timeline: [
      { id: 't-21', timestamp: '12:15:00', event: 'Budameru diversion channel embankment suffered 30-meter structural breach', source: 'Irrigation Telemetry #BDC', confidence: 99, severity: 'CRITICAL' },
      { id: 't-22', timestamp: '12:20:00', event: 'Water entered residential colonies of Ajit Singh Nagar and Payakapuram', source: 'VMC Disaster Control', confidence: 98, severity: 'CRITICAL' },
      { id: 't-23', timestamp: '12:35:00', event: 'NDRF 10th Battalion deployed with 22 inflatable boats and drone search lights', source: 'Resource Orchestrator', confidence: 99, severity: 'CRITICAL' }
    ],
    assignedResources: ['res-ap-02', 'res-ap-03', 'amb-ap-03', 'hosp-ap-02', 'sh-ap-02'],
    weather: { temp: 26.8, humidity: 95, windSpeed: 24, rainfall: 220, condition: 'Severe Cloudburst Inundation' },
    reportedAt: '12:15:00',
    updatedAt: '3m ago'
  },
  {
    id: 'inc-003',
    code: 'NX-AP-2055',
    title: 'Visakhapatnam Industrial Corridor Toxic Gas Leak',
    hazardType: 'industrial_gas_leak',
    severity: 'CRITICAL',
    confidence: 96,
    status: 'ACTIVE',
    locationName: 'Sector 4, Pharma City, Visakhapatnam, Andhra Pradesh',
    coordinates: { lat: 17.6868, lng: 83.2185 },
    affectedRadiusMeters: 2900,
    populationAtRisk: 14200,
    riskScore: 94,
    riskFactors: {
      hazard: 98,
      population: 94,
      infrastructure: 90,
      weather: 88,
      accessibility: 84
    },
    sensorReadings: [
      { sensorId: 'sn-ap-08', type: 'VOC PID Gas Detector', reading: '185 ppm (Toxic threshold 20 ppm)', status: 'ALERT' },
      { sensorId: 'sn-ap-09', type: 'Coastal Wind Heading Vane', reading: '220° SW at 22 km/h', status: 'WARNING' },
      { sensorId: 'sn-ap-10', type: 'Chemical Tank Pressure Cell', reading: '12.4 bar', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v31', source: 'sensor_anomaly', label: 'Industrial Safety Sensor Matrix', verified: true, confidence: 99, evidence: 'Triple sensor alarm confirmation of styrene polymer vapor leak', timestamp: '5m ago' },
      { id: 'v32', source: 'citizen_report', label: 'Gajuwaka Residents SOS Stream', verified: true, confidence: 96, evidence: 'Over 40 calls reporting burning eyes, nausea, and severe throat irritation', timestamp: '4m ago' }
    ],
    verificationConfidence: 96,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Plume', value: 1.2, unit: 'km radius', riskScore: 94, predictedPopulationImpact: 14200 },
      { timeOffsetMinutes: 20, label: '+20 Min Drift', value: 2.1, unit: 'km radius', riskScore: 97, predictedPopulationImpact: 22000 }
    ],
    recommendedActions: [
      { id: 'act-31', stepNumber: '01', title: 'Activate Level-3 Industrial HAZMAT Acoustic Siren', description: 'Sound air raid sirens and order all citizens indoors with wet cloth masks.', category: 'communication', status: 'EXECUTING', priority: 'CRITICAL' },
      { id: 'act-32', stepNumber: '02', title: 'Deploy Water Neutralization Fog Cannons', description: 'Apply high-volume neutralizing mist over leaking polymer valve vent.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-ap-04' }
    ],
    timeline: [
      { id: 't-31', timestamp: '17:34:02', event: 'Chemical sensor detected toxic styrene spike at 185 ppm', source: 'Fixed Node #SN-AP-08', confidence: 99, severity: 'CRITICAL' }
    ],
    assignedResources: ['res-ap-04', 'amb-ap-04', 'hosp-ap-03'],
    weather: { temp: 28.5, humidity: 82, windSpeed: 22, rainfall: 5, condition: 'Coastal Sea Breeze' },
    reportedAt: '17:34:02',
    updatedAt: '2m ago'
  },
  {
    id: 'inc-004',
    code: 'NX-AP-2060',
    title: 'Machilipatnam Port Coastal Storm Surge Inundation',
    hazardType: 'severe_weather',
    severity: 'HIGH',
    confidence: 93,
    status: 'ACTIVE',
    locationName: 'Gilakaladindi Fishermen Harbor, Machilipatnam, AP',
    coordinates: { lat: 16.1875, lng: 81.1389 },
    affectedRadiusMeters: 2600,
    populationAtRisk: 12800,
    riskScore: 86,
    riskFactors: {
      hazard: 88,
      population: 84,
      infrastructure: 85,
      weather: 94,
      accessibility: 78
    },
    sensorReadings: [
      { sensorId: 'sn-ap-11', type: 'Machilipatnam Port Tide Radar', reading: '2.8m above normal tide', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v41', source: 'weather_feed', label: 'Coastal Marine Radar Station', verified: true, confidence: 96, evidence: 'High sea waves breaking over harbor road and fish landing centers', timestamp: '10m ago' }
    ],
    verificationConfidence: 93,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Surge', value: 2.8, unit: 'm', riskScore: 86, predictedPopulationImpact: 12800 },
      { timeOffsetMinutes: 40, label: '+40 Min High Tide', value: 3.5, unit: 'm', riskScore: 92, predictedPopulationImpact: 18500 }
    ],
    recommendedActions: [
      { id: 'act-41', stepNumber: '01', title: 'Evacuate Gilakaladindi Hamlets to Machilipatnam ZP High School', description: 'Deploy RTC emergency buses for 4,200 coastal fishermen families.', category: 'evacuation', status: 'EXECUTING', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-41', timestamp: '15:10:00', event: 'Port Warning Signal 7 hoisted at Machilipatnam Port', source: 'Port Conservator', confidence: 98, severity: 'HIGH' }
    ],
    assignedResources: ['res-ap-01', 'amb-ap-05'],
    weather: { temp: 26.5, humidity: 93, windSpeed: 42, rainfall: 48, condition: 'Squally Coastal Storm' },
    reportedAt: '15:10:00',
    updatedAt: '15m ago'
  },
  {
    id: 'inc-005',
    code: 'NX-AP-2065',
    title: 'Araku Valley Ghat Section Landslide & Rail Debris',
    hazardType: 'landslide',
    severity: 'HIGH',
    confidence: 91,
    status: 'ACTIVE',
    locationName: 'Tyda Ghat Curve 14, Alluri Sitharama Raju District, AP',
    coordinates: { lat: 18.2320, lng: 83.0210 },
    affectedRadiusMeters: 1200,
    populationAtRisk: 1450,
    riskScore: 82,
    riskFactors: {
      hazard: 86,
      population: 58,
      infrastructure: 92,
      weather: 95,
      accessibility: 94
    },
    sensorReadings: [
      { sensorId: 'sn-ap-12', type: 'Slope Soil Saturation Inclinometer', reading: '16.8 cm Ground Slip', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v51', source: 'citizen_report', label: 'APSRTC Ghat Bus Driver Alert', verified: true, confidence: 95, evidence: 'Large boulders and mud collapsed across both road lanes near KM 38', timestamp: '14m ago' }
    ],
    verificationConfidence: 91,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Initial Slip', value: 14000, unit: 'm³ Debris', riskScore: 82, predictedPopulationImpact: 1450 }
    ],
    recommendedActions: [
      { id: 'act-51', stepNumber: '01', title: 'Mobilize Heavy Hydraulic JCB Excavators from Srungavarapukota', description: 'Clear single rescue vehicle lane while watching upper hill saturation.', category: 'infrastructure', status: 'EXECUTING', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-51', timestamp: '13:40:00', event: 'Debris cascade snapped overhead electricity wires on Araku Ghat Road', source: 'District Highway Patrol', confidence: 94, severity: 'HIGH' }
    ],
    assignedResources: ['res-ap-02', 'amb-ap-01'],
    weather: { temp: 22.4, humidity: 98, windSpeed: 18, rainfall: 160, condition: 'Torrential Mountain Rain' },
    reportedAt: '13:40:00',
    updatedAt: '25m ago'
  }
];

export const DEMO_AMBULANCES: ResourceUnit[] = [
  { id: 'amb-ap-01', callSign: '108 ALS Ambulance #AP-VZG-12', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 18.3280, lng: 84.1050 }, baseStation: 'Srikakulam Emergency Medical Hub', personnelCount: 3, etaMinutes: 6, distanceKm: 2.4, capacity: 2, contactNumber: '108' },
  { id: 'amb-ap-02', callSign: '108 ICU Ambulance #AP-VZG-08', type: 'AMBULANCE', status: 'DISPATCHED', coordinates: { lat: 18.3520, lng: 84.1350 }, baseStation: 'Gara Primary Health Center', personnelCount: 4, etaMinutes: 8, distanceKm: 3.8, currentAssignment: 'inc-001', contactNumber: '108' },
  { id: 'amb-ap-03', callSign: '108 Flood Triage Ambulance #AP-BZA-04', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 16.5380, lng: 80.6310 }, baseStation: 'GGH New Government Hospital Vijayawada', personnelCount: 3, etaMinutes: 5, distanceKm: 1.8, capacity: 2, contactNumber: '108' },
  { id: 'amb-ap-04', callSign: '108 Hazmat Spec Ambulance #AP-VSP-22', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 17.6920, lng: 83.2110 }, baseStation: 'Gajuwaka Industrial Fire Station', personnelCount: 4, etaMinutes: 7, distanceKm: 3.2, capacity: 2, contactNumber: '108' },
  { id: 'amb-ap-05', callSign: '108 Marine Coastal Ambulance #AP-MTM-07', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 16.1920, lng: 81.1450 }, baseStation: 'Machilipatnam District Hospital', personnelCount: 3, etaMinutes: 9, distanceKm: 4.1, capacity: 2, contactNumber: '108' }
];

export const DEMO_RESCUE_TEAMS: ResourceUnit[] = [
  { id: 'res-ap-01', callSign: 'NDRF 10th Battalion Unit 04 (AP)', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 18.3350, lng: 84.1120 }, baseStation: 'ANU Nagarjuna University Base', personnelCount: 24, etaMinutes: 8, distanceKm: 3.2, contactNumber: '1078' },
  { id: 'res-ap-02', callSign: 'AP-SDRF Flood Extraction Squad 02', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 16.5450, lng: 80.6220 }, baseStation: 'Bhavanipuram River Command, Vijayawada', personnelCount: 20, etaMinutes: 7, distanceKm: 2.8, contactNumber: '1070' },
  { id: 'res-ap-03', callSign: 'IAF Helicopter Rescue Squad (Mi-17)', type: 'DRONE_UNIT', status: 'AVAILABLE', coordinates: { lat: 16.5300, lng: 80.7960 }, baseStation: 'Gannavaram Air Force Staging Base', personnelCount: 8, etaMinutes: 12, distanceKm: 16.0, contactNumber: '112' },
  { id: 'res-ap-04', callSign: 'AP Fire Services Chemical Hazmat Tender', type: 'FIRE_TRUCK', status: 'AVAILABLE', coordinates: { lat: 17.6890, lng: 83.2140 }, baseStation: 'Visakhapatnam Steel Plant Fire Command', personnelCount: 14, etaMinutes: 8, distanceKm: 3.5, contactNumber: '101' }
];

export const DEMO_HOSPITALS: MedicalFacility[] = [
  { id: 'hosp-ap-01', name: 'RIMS Government General Hospital, Srikakulam', type: 'TRAUMA_CENTER', coordinates: { lat: 18.2980, lng: 83.8960 }, totalBeds: 850, availableBeds: 160, icuBedsAvailable: 28, traumaLevel: 'LEVEL_1', status: 'SURGE', distanceKm: 14.2, contactNumber: '+91 8942 278100' },
  { id: 'hosp-ap-02', name: 'Government General Hospital (GGH), Vijayawada', type: 'TRAUMA_CENTER', coordinates: { lat: 16.5160, lng: 80.6420 }, totalBeds: 1400, availableBeds: 195, icuBedsAvailable: 34, traumaLevel: 'LEVEL_1', status: 'SURGE', distanceKm: 4.2, contactNumber: '+91 866 257 6888' },
  { id: 'hosp-ap-03', name: 'King George Hospital (KGH), Visakhapatnam', type: 'TRAUMA_CENTER', coordinates: { lat: 17.7080, lng: 83.3050 }, totalBeds: 1250, availableBeds: 210, icuBedsAvailable: 42, traumaLevel: 'LEVEL_1', status: 'SURGE', distanceKm: 8.4, contactNumber: '+91 891 256 4891' },
  { id: 'hosp-ap-04', name: 'Machilipatnam District Headquarter Hospital', type: 'HOSPITAL', coordinates: { lat: 16.1820, lng: 81.1320 }, totalBeds: 500, availableBeds: 82, icuBedsAvailable: 14, traumaLevel: 'LEVEL_2', status: 'NORMAL', distanceKm: 2.8, contactNumber: '+91 8672 222108' }
];

export const DEMO_SHELTERS: ReliefShelter[] = [
  { id: 'sh-ap-01', name: 'Kalingapatnam Coastal Cyclone Relief Shelter', coordinates: { lat: 18.3440, lng: 84.1240 }, capacity: 1500, currentOccupancy: 640, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 10, contactPerson: 'Tahsildar Gara Mandal', contactNumber: '+91 8942 220011' },
  { id: 'sh-ap-02', name: 'Indira Gandhi Municipal Stadium Relief Camp, Vijayawada', coordinates: { lat: 16.5080, lng: 80.6380 }, capacity: 3500, currentOccupancy: 1850, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 14, contactPerson: 'VMC Commissioner Relief Cell', contactNumber: '+91 866 242 1070' },
  { id: 'sh-ap-03', name: 'Gajuwaka Indoor Sports Stadium Evac Shelter, Vizag', coordinates: { lat: 17.6940, lng: 83.2190 }, capacity: 1500, currentOccupancy: 520, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 8, contactPerson: 'Revenue Divisional Officer', contactNumber: '+91 891 254 3321' },
  { id: 'sh-ap-04', name: 'Gilakaladindi Coastal High School Cyclone Sanctuary', coordinates: { lat: 16.1950, lng: 81.1420 }, capacity: 1200, currentOccupancy: 480, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 7, contactPerson: 'Machilipatnam Municipal Relief Officer', contactNumber: '+91 8672 224411' }
];

export const DEMO_SENSORS: IoTSensor[] = [
  { id: 'sn-ap-01', name: 'Kalingapatnam IMD Cyclone Barometer #01', hazardType: 'severe_weather', coordinates: { lat: 18.3410, lng: 84.1210 }, status: 'CRITICAL', lastPing: '20s ago', metricLabel: 'Atmospheric Pressure', currentValue: 992.4, thresholdValue: 1000, unit: 'hPa', batteryLevel: 96 },
  { id: 'sn-ap-02', name: 'North Andhra Coastal Tide Sonar #02', hazardType: 'severe_weather', coordinates: { lat: 18.3425, lng: 84.1235 }, status: 'CRITICAL', lastPing: '15s ago', metricLabel: 'Surge Height', currentValue: 3.4, thresholdValue: 1.8, unit: 'm', batteryLevel: 92 },
  { id: 'sn-ap-05', name: 'Budameru Diversion Channel Sonar #05', hazardType: 'flood', coordinates: { lat: 16.5420, lng: 80.6280 }, status: 'CRITICAL', lastPing: '30s ago', metricLabel: 'Flood Depth', currentValue: 4.8, thresholdValue: 3.0, unit: 'm', batteryLevel: 94 },
  { id: 'sn-ap-06', name: 'Prakasam Barrage Hydro Telemetry #06', hazardType: 'flood', coordinates: { lat: 16.5070, lng: 80.6060 }, status: 'CRITICAL', lastPing: '45s ago', metricLabel: 'Water Discharge', currentValue: 11.4, thresholdValue: 8.0, unit: 'Lakh Cusecs', batteryLevel: 98 },
  { id: 'sn-ap-08', name: 'Visakhapatnam Pharma City VOC Sensor #08', hazardType: 'industrial_gas_leak', coordinates: { lat: 17.6870, lng: 83.2180 }, status: 'CRITICAL', lastPing: '10s ago', metricLabel: 'VOC Gas Density', currentValue: 185, thresholdValue: 20, unit: 'ppm', batteryLevel: 97 }
];

export const DEMO_CITIZEN_REPORTS: CitizenSOSReport[] = [
  { id: 'rep-ap-01', reporterName: 'Venkata Ramana', contactPhone: '+91 98480 11223', coordinates: { lat: 18.3412, lng: 84.1205 }, locationText: 'Kalingapatnam Beach Road, Near Lighthouse Hamlets', emergencyType: 'severe_weather', reportedAt: '6m ago', status: 'VERIFIED', peopleCount: 8, notes: 'Sea waves reached our front porch. High gale winds blew off asbestos roof. 2 elderly persons need wheelchair evacuation.' },
  { id: 'rep-ap-02', reporterName: 'Lakshmi Prasanna', contactPhone: '+91 94401 55667', coordinates: { lat: 16.5422, lng: 80.6265 }, locationText: 'Ajit Singh Nagar, Pipe Road Curve, Vijayawada', emergencyType: 'flood', reportedAt: '12m ago', status: 'VERIFIED', peopleCount: 14, notes: 'Ground floor submerged up to 8 feet. Stuck on first floor terrace with children. Drinking water packets needed urgently.' },
  { id: 'rep-ap-03', reporterName: 'K. Srinivasa Rao', contactPhone: '+91 98492 88990', coordinates: { lat: 17.6875, lng: 83.2180 }, locationText: 'RR Venkatapuram Township, Gate 3, Vizag', emergencyType: 'industrial_gas_leak', reportedAt: '18m ago', status: 'VERIFIED', peopleCount: 5, notes: 'Severe plastic burning chemical smell. Eyes burning intensely. Waiting at colony gate.' }
];
