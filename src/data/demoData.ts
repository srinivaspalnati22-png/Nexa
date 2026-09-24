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
    id: 'scenario-flood',
    title: 'Urban Flash Flood & River Overflow',
    hazardType: 'flood',
    description: 'Extreme cloudburst (180mm/hr) in urban basin causing storm sewer backflow and critical water level rise at 5.4m.',
    location: 'Kurla West, Mumbai Basin',
    initialRisk: 88,
    stepsCount: 17,
    badge: 'CRITICAL PRIORITY'
  },
  {
    id: 'scenario-fire',
    title: 'Interface Forest Wildfire',
    hazardType: 'fire',
    description: 'High winds (45km/h) pushing rapid wildland-urban interface fire toward residential estates and tea plantations.',
    location: 'Nilgiris Foothills, Western Ghats',
    initialRisk: 79,
    stepsCount: 15,
    badge: 'RAPID SPREAD'
  },
  {
    id: 'scenario-gas',
    title: 'Industrial Toxic Gas Dispersion',
    hazardType: 'industrial_gas_leak',
    description: 'Polymer plant containment valve failure releasing styrene vapor plume downwind towards suburban transit hub.',
    location: 'Pharma City, Visakhapatnam Corridor',
    initialRisk: 94,
    stepsCount: 16,
    badge: 'HAZMAT LEVEL 3'
  },
  {
    id: 'scenario-landslide',
    title: 'Ghat Section Highway Landslide',
    hazardType: 'landslide',
    description: 'Heavy precipitation triggered 12,000 cu.m debris flow blocking critical arterial highway and burying 2 vehicles.',
    location: 'Munnar-Kochi Ghat Road, KM 42',
    initialRisk: 83,
    stepsCount: 14,
    badge: 'ROAD BLOCKED'
  },
  {
    id: 'scenario-accident',
    title: 'Multi-Vehicle Expressway Pileup',
    hazardType: 'road_accident',
    description: 'Dense fog induced 14-vehicle collision involving an LPG chemical tanker with active fuel leakage risks.',
    location: 'Mumbai-Pune Expressway Tunnel 3',
    initialRisk: 74,
    stepsCount: 12,
    badge: 'MULTI-CASUALTY'
  }
];

export const DEMO_INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    code: 'NX-2048',
    title: 'Mithi River Basin Flash Flood & Inundation',
    hazardType: 'flood',
    severity: 'CRITICAL',
    confidence: 94,
    status: 'ACTIVE',
    locationName: 'Kurla West & BKC Connector, Mumbai',
    coordinates: { lat: 19.0688, lng: 72.8715 },
    affectedRadiusMeters: 1850,
    populationAtRisk: 8420,
    riskScore: 88,
    riskFactors: {
      hazard: 92,
      population: 86,
      infrastructure: 84,
      weather: 89,
      accessibility: 74
    },
    sensorReadings: [
      { sensorId: 'sn-01', type: 'River Water Level', reading: '5.2m (Threshold 3.8m)', status: 'ALERT' },
      { sensorId: 'sn-02', type: 'Precipitation Gauge', reading: '142 mm/hr', status: 'ALERT' },
      { sensorId: 'sn-03', type: 'Sewer Pressure Transducer', reading: '4.8 bar', status: 'WARNING' },
      { sensorId: 'sn-04', type: 'Flow Velocity Sonar', reading: '3.6 m/s', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v1', source: 'citizen_report', label: 'Citizen SOS Distress Calls', verified: true, confidence: 96, evidence: '42 Geo-tagged reports with submerged vehicle photos', timestamp: '10m ago' },
      { id: 'v2', source: 'cctv_vision', label: 'CCTV Intersection AI Analytics', verified: true, confidence: 94, evidence: 'Automated water line detection over vehicle roofs at LBS Marg', timestamp: '8m ago' },
      { id: 'v3', source: 'sensor_anomaly', label: 'Telemetry Anomaly Trigger', verified: true, confidence: 98, evidence: 'Water level climbed +1.8m in 25 minutes on Sonar #04', timestamp: '14m ago' },
      { id: 'v4', source: 'weather_feed', label: 'Doppler Radar Precipitation', verified: true, confidence: 92, evidence: 'Severe convective cloud burst cell overhead lasting 90m', timestamp: '15m ago' },
      { id: 'v5', source: 'historical_pattern', label: 'Topographical Basin Model', verified: true, confidence: 89, evidence: 'Matches 2019 monsoon inundation depth profile', timestamp: '20m ago' }
    ],
    verificationConfidence: 94,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Level', value: 5.2, unit: 'm', riskScore: 88, predictedPopulationImpact: 8420 },
      { timeOffsetMinutes: 20, label: '+20 Min Trend', value: 5.6, unit: 'm', riskScore: 92, predictedPopulationImpact: 11200 },
      { timeOffsetMinutes: 40, label: '+40 Min Peak', value: 6.1, unit: 'm', riskScore: 95, predictedPopulationImpact: 15400 },
      { timeOffsetMinutes: 70, label: '+70 Min Influx', value: 5.8, unit: 'm', riskScore: 89, predictedPopulationImpact: 13100 }
    ],
    recommendedActions: [
      { id: 'act-1', stepNumber: '01', title: 'Issue Immediate Zone A Evacuation Broadcast', description: 'Trigger targeted multilingual SMS/Voice alert to 8,400+ residents in low-lying Kurla riverbank corridor.', category: 'evacuation', status: 'EXECUTING', priority: 'CRITICAL' },
      { id: 'act-2', stepNumber: '02', title: 'Dispatch NDRF Inflatable Rescue Boats (Boat 04 & 07)', description: 'Deploy shallow water rescue squads to stranded bus stop clusters near Phoenix junction.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-01' },
      { id: 'act-3', stepNumber: '03', title: 'Open Relief Shelter S-02 (Don Bosco Center)', description: 'Activate 600-person capacity shelter with dry food rations, backup power, and water purification.', category: 'medical', status: 'COMPLETED', priority: 'HIGH', targetUnitId: 'sh-02' },
      { id: 'act-4', stepNumber: '04', title: 'Alert Lilavati & Sion Hospital Trauma Surge', description: 'Prepare Level-1 trauma and hypothermia bays; deploy mobile medical triage team.', category: 'medical', status: 'CONFIRMED', priority: 'HIGH', targetUnitId: 'hosp-01' },
      { id: 'act-5', stepNumber: '05', title: 'Traffic Police Perimeter Cordon on LBS Marg', description: 'Divert arterial traffic toward Eastern Express Highway; shut flooded underpasses.', category: 'infrastructure', status: 'PENDING', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-1', timestamp: '17:21:03', event: 'Sensor telemetry spike: River water level crossed 4.2m alert threshold', source: 'IoT HydroSensor #SN-01', confidence: 99, severity: 'HIGH' },
      { id: 't-2', timestamp: '17:21:08', event: 'Multi-stream AI cross-check initiated: Correlating CCTV, satellite precipitation, and 6 citizen reports', source: 'NEXUS Verification Engine', confidence: 91, severity: 'HIGH' },
      { id: 't-3', timestamp: '17:21:14', event: 'Incident Confirmed as Level-4 Urban Flash Flood with active inundation', source: 'AI Commander', confidence: 94, severity: 'CRITICAL' },
      { id: 't-4', timestamp: '17:21:18', event: 'NEXUS Risk Index computed: 88 (CRITICAL) - High flood depth with dense residential exposure', source: 'Risk Index Engine', confidence: 95, severity: 'CRITICAL' },
      { id: 't-5', timestamp: '17:21:25', event: 'Digital Twin evacuation polygon generated: Zone A & Zone B demarcated', source: 'Geospatial Twin', confidence: 93, severity: 'HIGH' },
      { id: 't-6', timestamp: '17:21:31', event: 'NDRF Unit #01 & SDRF Water Squad dispatched to Kurla junction', source: 'Resource Orchestrator', confidence: 96, actionTaken: 'Dispatched 2 boats & 14 personnel', severity: 'CRITICAL' }
    ],
    assignedResources: ['res-01', 'amb-01', 'amb-02', 'hosp-01', 'sh-02'],
    weather: { temp: 27, humidity: 95, windSpeed: 38, rainfall: 142, condition: 'Severe Cloudburst' },
    reportedAt: '17:21:03',
    updatedAt: 'Just now'
  },
  {
    id: 'inc-002',
    code: 'NX-2051',
    title: 'Western Ghats Tea Estate Wildfire Outbreak',
    hazardType: 'fire',
    severity: 'HIGH',
    confidence: 91,
    status: 'ACTIVE',
    locationName: 'Kotagiri Ridge, Nilgiris Foothills',
    coordinates: { lat: 11.4230, lng: 76.8660 },
    affectedRadiusMeters: 2400,
    populationAtRisk: 2850,
    riskScore: 78,
    riskFactors: {
      hazard: 85,
      population: 62,
      infrastructure: 70,
      weather: 91,
      accessibility: 82
    },
    sensorReadings: [
      { sensorId: 'sn-05', type: 'IR Thermal Sensor', reading: '380°C hotspot detected', status: 'ALERT' },
      { sensorId: 'sn-06', type: 'Smoke Particulate PM2.5', reading: '540 µg/m³', status: 'ALERT' },
      { sensorId: 'sn-07', type: 'Anemometer Wind Speed', reading: '44 km/h Gusts', status: 'WARNING' }
    ],
    verificationChecks: [
      { id: 'v21', source: 'cctv_vision', label: 'Watchtower Thermal Drone Camera', verified: true, confidence: 95, evidence: 'Flames rising over tree canopy on southern slope', timestamp: '12m ago' },
      { id: 'v22', source: 'sensor_anomaly', label: 'Thermal Infrared Hotspot', verified: true, confidence: 92, evidence: 'MODIS Satellite rapid thermal cluster match', timestamp: '18m ago' },
      { id: 'v23', source: 'citizen_report', label: 'Forest Ranger SOS Report', verified: true, confidence: 94, evidence: 'Voice dispatch confirming active flame front 400m from workers', timestamp: '15m ago' }
    ],
    verificationConfidence: 91,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Spread', value: 1.4, unit: 'km²', riskScore: 78, predictedPopulationImpact: 2850 },
      { timeOffsetMinutes: 20, label: '+20 Min Spread', value: 2.2, unit: 'km²', riskScore: 84, predictedPopulationImpact: 4100 },
      { timeOffsetMinutes: 40, label: '+40 Min Spread', value: 3.5, unit: 'km²', riskScore: 89, predictedPopulationImpact: 6400 },
      { timeOffsetMinutes: 70, label: '+70 Min Spread', value: 4.8, unit: 'km²', riskScore: 92, predictedPopulationImpact: 8900 }
    ],
    recommendedActions: [
      { id: 'act-21', stepNumber: '01', title: 'Deploy Helitack & Aerial Foam Drop Unit', description: 'Task state disaster helicopter for targeted retardant drop along ridge line.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-04' },
      { id: 'act-22', stepNumber: '02', title: 'Evacuate Tea Estate Labor Settlements 3 & 4', description: 'Order immediate orderly shuttle of 420 workers toward Kotagiri Municipal Hall.', category: 'evacuation', status: 'EXECUTING', priority: 'HIGH' },
      { id: 'act-23', stepNumber: '03', title: 'Establish Firebreak Bulldozer Cut Line', description: 'Position earthmovers along Valley Road to prevent fire crossing highway.', category: 'infrastructure', status: 'PENDING', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-21', timestamp: '16:45:10', event: 'Thermal camera detected 380°C flare on southern ridge', source: 'Forest Drone #D-04', confidence: 96, severity: 'HIGH' },
      { id: 't-22', timestamp: '16:47:30', event: 'Incident verified: Rapid wildfire moving north-east at 18m/min', source: 'AI Verification Matrix', confidence: 91, severity: 'CRITICAL' },
      { id: 't-23', timestamp: '16:51:00', event: 'Fire tender brigade dispatched with water fog cannons', source: 'Resource Orchestrator', confidence: 94, severity: 'HIGH' }
    ],
    assignedResources: ['res-04', 'amb-05', 'hosp-04'],
    weather: { temp: 34, humidity: 24, windSpeed: 44, rainfall: 0, condition: 'Dry & High Winds' },
    reportedAt: '16:45:10',
    updatedAt: '5m ago'
  },
  {
    id: 'inc-003',
    code: 'NX-2055',
    title: 'Petrochemical Corridor Styrene Vapor Leak',
    hazardType: 'industrial_gas_leak',
    severity: 'CRITICAL',
    confidence: 96,
    status: 'ACTIVE',
    locationName: 'Sector 4, Pharma City, Visakhapatnam',
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
      { sensorId: 'sn-08', type: 'VOC Photoionization Sensor', reading: '185 ppm (Toxic threshold 20 ppm)', status: 'ALERT' },
      { sensorId: 'sn-09', type: 'Wind Direction Vane', reading: '220° SW at 18 km/h', status: 'WARNING' },
      { sensorId: 'sn-10', type: 'Tank Core Pressure', reading: '12.4 bar (Depressurizing)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v31', source: 'sensor_anomaly', label: 'Factory Perimeter Gas Sensors', verified: true, confidence: 99, evidence: 'Triple sensor alarm confirmation of styrene polymer breakdown', timestamp: '5m ago' },
      { id: 'v32', source: 'cctv_vision', label: 'Plant Boundary Optical Camera', verified: true, confidence: 93, evidence: 'White aerosol vapor cloud drifting north-east toward township', timestamp: '4m ago' },
      { id: 'v33', source: 'citizen_report', label: 'Resident Respiratory Distress SOS', verified: true, confidence: 96, evidence: '28 urgent reports of stinging eyes, breathlessness, nausea', timestamp: '3m ago' }
    ],
    verificationConfidence: 96,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Plume', value: 1.2, unit: 'km radius', riskScore: 94, predictedPopulationImpact: 14200 },
      { timeOffsetMinutes: 20, label: '+20 Min Drift', value: 2.1, unit: 'km radius', riskScore: 97, predictedPopulationImpact: 22000 },
      { timeOffsetMinutes: 40, label: '+40 Min Plume', value: 2.8, unit: 'km radius', riskScore: 92, predictedPopulationImpact: 31000 },
      { timeOffsetMinutes: 70, label: '+70 Min Dispersion', value: 3.2, unit: 'km radius', riskScore: 84, predictedPopulationImpact: 26000 }
    ],
    recommendedActions: [
      { id: 'act-31', stepNumber: '01', title: 'Activate Level-3 HAZMAT Emergency Siren', description: 'Sound acoustic air raid sirens and push broadcast alert instructing all citizens indoors with wet masks.', category: 'communication', status: 'EXECUTING', priority: 'CRITICAL' },
      { id: 'act-32', stepNumber: '02', title: 'Deploy Water Curtain Neutralization Cannons', description: 'Position 4 industrial fire foam trucks to spray neutralizer fog over leaking tank vent.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-06' },
      { id: 'act-33', stepNumber: '03', title: 'Dispatch 6 Advanced Life Support Ambulances', description: 'Equip with high-flow oxygen tanks and atropine antidotes for acute chemical inhalation.', category: 'medical', status: 'CONFIRMED', priority: 'CRITICAL', targetUnitId: 'amb-07' }
    ],
    timeline: [
      { id: 't-31', timestamp: '17:34:02', event: 'Styrene gas sensor detected 185 ppm chemical spike', source: 'Fixed Gas Node #SN-08', confidence: 99, severity: 'CRITICAL' },
      { id: 't-32', timestamp: '17:34:25', event: 'HAZMAT containment protocol auto-recommended by AI Commander', source: 'AI Commander', confidence: 96, severity: 'CRITICAL' },
      { id: 't-33', timestamp: '17:35:10', event: 'Cross-wind plume dispersion modeling completed', source: 'Predictive Gas Engine', confidence: 94, severity: 'CRITICAL' }
    ],
    assignedResources: ['res-06', 'amb-07', 'amb-08', 'hosp-05'],
    weather: { temp: 31, humidity: 78, windSpeed: 18, rainfall: 0, condition: 'South-West Breeze' },
    reportedAt: '17:34:02',
    updatedAt: '2m ago'
  },
  {
    id: 'inc-004',
    code: 'NX-2060',
    title: 'Wayanad Ghat Arterial Landslide & Road Collapse',
    hazardType: 'landslide',
    severity: 'HIGH',
    confidence: 89,
    status: 'ACTIVE',
    locationName: 'Meppadi Ghat Pass, Wayanad',
    coordinates: { lat: 11.5540, lng: 76.1260 },
    affectedRadiusMeters: 1400,
    populationAtRisk: 1950,
    riskScore: 83,
    riskFactors: {
      hazard: 88,
      population: 68,
      infrastructure: 92,
      weather: 94,
      accessibility: 90
    },
    sensorReadings: [
      { sensorId: 'sn-11', type: 'Slope Extensometer', reading: '18.4 cm shear displacement', status: 'ALERT' },
      { sensorId: 'sn-12', type: 'Pore Water Pressure', reading: '62 kPa (Critical Saturation)', status: 'ALERT' },
      { sensorId: 'sn-13', type: 'Seismic Geophone', reading: '2.1 Magnitude Tremor', status: 'WARNING' }
    ],
    verificationChecks: [
      { id: 'v41', source: 'sensor_anomaly', label: 'Slope Displacement Telemetry', verified: true, confidence: 97, evidence: 'Extensometer snapped after 18cm rapid ground movement', timestamp: '20m ago' },
      { id: 'v42', source: 'cctv_vision', label: 'Toll Plaza Highway Camera', verified: true, confidence: 88, evidence: 'Mud and boulder cascade across 2 lanes with stopped traffic', timestamp: '18m ago' },
      { id: 'v43', source: 'citizen_report', label: 'State Transport Bus Driver Call', verified: true, confidence: 92, evidence: 'Reported 2 cars trapped behind boulder pile; 30 passengers stranded', timestamp: '16m ago' }
    ],
    verificationConfidence: 89,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Initial Slip', value: 12000, unit: 'm³ Debris', riskScore: 83, predictedPopulationImpact: 1950 },
      { timeOffsetMinutes: 20, label: '+20 Min Secondary', value: 18000, unit: 'm³ Debris', riskScore: 89, predictedPopulationImpact: 2800 },
      { timeOffsetMinutes: 40, label: '+40 Min Valley', value: 24000, unit: 'm³ Debris', riskScore: 91, predictedPopulationImpact: 3600 },
      { timeOffsetMinutes: 70, label: '+70 Min Stabilize', value: 26000, unit: 'm³ Debris', riskScore: 80, predictedPopulationImpact: 3600 }
    ],
    recommendedActions: [
      { id: 'act-41', stepNumber: '01', title: 'Deploy Heavy Earthmoving Excavators (JCB 03 & 04)', description: 'Clear single rescue passage while maintaining spotter watch on upper ridge.', category: 'infrastructure', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-03' },
      { id: 'act-42', stepNumber: '02', title: 'Deploy Canine Search & Acoustic Geophone Team', description: 'Scan mud mound for signs of life underneath compressed mud.', category: 'dispatch', status: 'CONFIRMED', priority: 'CRITICAL', targetUnitId: 'res-05' },
      { id: 'act-43', stepNumber: '03', title: 'Divert All Traffic via Kozhikode Alternate Pass', description: 'Notify district traffic control to halt all heavy cargo trucks at border checkpost.', category: 'infrastructure', status: 'COMPLETED', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-41', timestamp: '15:10:00', event: 'Slope soil moisture exceeded 98% saturation threshold', source: 'Soil Sensor #SN-12', confidence: 95, severity: 'HIGH' },
      { id: 't-42', timestamp: '15:18:22', event: 'Debris avalanche broke through road barrier at KM 42', source: 'CCTV Camera #HW-09', confidence: 91, severity: 'CRITICAL' },
      { id: 't-43', timestamp: '15:22:00', event: 'Rescue squad R-03 arrived with hydraulic cutters and medical gear', source: 'Resource Orchestrator', confidence: 98, severity: 'HIGH' }
    ],
    assignedResources: ['res-03', 'res-05', 'amb-04', 'hosp-03'],
    weather: { temp: 21, humidity: 98, windSpeed: 22, rainfall: 188, condition: 'Torrential Downpour' },
    reportedAt: '15:18:22',
    updatedAt: '10m ago'
  },
  {
    id: 'inc-005',
    code: 'NX-2064',
    title: 'Expressway Multi-Vehicle Pileup with LPG Tanker Leak',
    hazardType: 'road_accident',
    severity: 'HIGH',
    confidence: 93,
    status: 'ACTIVE',
    locationName: 'Mumbai-Pune Expressway, Khandala Tunnel',
    coordinates: { lat: 18.7560, lng: 73.3720 },
    affectedRadiusMeters: 950,
    populationAtRisk: 860,
    riskScore: 74,
    riskFactors: {
      hazard: 82,
      population: 58,
      infrastructure: 90,
      weather: 76,
      accessibility: 88
    },
    sensorReadings: [
      { sensorId: 'sn-14', type: 'Tunnel Air Quality LEL', reading: '14% Lower Explosive Limit', status: 'ALERT' },
      { sensorId: 'sn-15', type: 'Tunnel Optical Visibility', reading: '18m visibility (Dense smoke/fog)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v51', source: 'cctv_vision', label: 'Tunnel Ceiling AI Vision Stream', verified: true, confidence: 97, evidence: '14 vehicles involved in chain collision; overturned LPG bullet tanker', timestamp: '8m ago' },
      { id: 'v52', source: 'citizen_report', label: 'Motorist Emergency Button Push', verified: true, confidence: 95, evidence: 'SOS triggered from SOS callbox #K-12 in tunnel bay', timestamp: '9m ago' }
    ],
    verificationConfidence: 93,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Initial Impact', value: 14, unit: 'Vehicles', riskScore: 74, predictedPopulationImpact: 860 },
      { timeOffsetMinutes: 20, label: '+20 Min Leak', value: 28, unit: '% LEL Gas', riskScore: 86, predictedPopulationImpact: 1400 },
      { timeOffsetMinutes: 40, label: '+40 Min Foam Cordon', value: 8, unit: '% LEL Gas', riskScore: 68, predictedPopulationImpact: 1100 },
      { timeOffsetMinutes: 70, label: '+70 Min Cleared', value: 0, unit: '% LEL Gas', riskScore: 42, predictedPopulationImpact: 400 }
    ],
    recommendedActions: [
      { id: 'act-51', stepNumber: '01', title: 'Close Tunnel North & South Portals Immediately', description: 'Engage electronic boom barriers and reversible jet fans for positive pressure ventilation.', category: 'infrastructure', status: 'COMPLETED', priority: 'CRITICAL' },
      { id: 'act-52', stepNumber: '02', title: 'Dispatch Foam Fire Tenders & Hazmat Recovery Unit', description: 'Apply aqueous film forming foam blanket over ruptured tanker flange.', category: 'dispatch', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'res-02' },
      { id: 'act-53', stepNumber: '03', title: 'Dispatch 4 Triage Ambulances to South Exit', description: 'Establish on-scene casualty triage station for 18 injured motorists.', category: 'medical', status: 'EXECUTING', priority: 'HIGH', targetUnitId: 'amb-03' }
    ],
    timeline: [
      { id: 't-51', timestamp: '14:02:11', event: 'Tunnel CCTV anomaly detector flagged multi-car collision', source: 'Smart Highway CCTV #T3', confidence: 98, severity: 'HIGH' },
      { id: 't-52', timestamp: '14:03:00', event: 'LPG hydrocarbon sniffer alarm activated in Sector 2', source: 'Tunnel Safety System', confidence: 94, severity: 'CRITICAL' },
      { id: 't-53', timestamp: '14:05:40', event: 'AI Commander recommended immediate tunnel closure and ventilation sequence', source: 'AI Commander', confidence: 96, severity: 'CRITICAL' }
    ],
    assignedResources: ['res-02', 'amb-03', 'hosp-02'],
    weather: { temp: 22, humidity: 92, windSpeed: 10, rainfall: 45, condition: 'Dense Mountain Fog' },
    reportedAt: '14:02:11',
    updatedAt: '8m ago'
  },
  {
    id: 'inc-006',
    code: 'NX-2070',
    title: 'Cyclone Coastal Storm Surge Inundation',
    hazardType: 'severe_weather',
    severity: 'CRITICAL',
    confidence: 95,
    status: 'ACTIVE',
    locationName: 'Ennore Port & Coastal Slums, Chennai',
    coordinates: { lat: 13.2320, lng: 80.3280 },
    affectedRadiusMeters: 3800,
    populationAtRisk: 18500,
    riskScore: 91,
    riskFactors: {
      hazard: 95,
      population: 92,
      infrastructure: 88,
      weather: 96,
      accessibility: 84
    },
    sensorReadings: [
      { sensorId: 'sn-16', type: 'Tide Gauge', reading: '3.9m above astronomical tide', status: 'ALERT' },
      { sensorId: 'sn-17', type: 'Barometric Pressure', reading: '964 hPa (Severe Cyclone Eye)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v61', source: 'weather_feed', label: 'IMD Doppler Coastal Radar', verified: true, confidence: 99, evidence: 'Eye wall landfall with 130 km/h wind gusts confirmed', timestamp: '10m ago' },
      { id: 'v62', source: 'sensor_anomaly', label: 'Coastal Sea Wall Tide Sonar', verified: true, confidence: 96, evidence: 'Sea surge overtopping breakwater by 1.4 meters', timestamp: '8m ago' }
    ],
    verificationConfidence: 95,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Surge', value: 3.9, unit: 'm', riskScore: 91, predictedPopulationImpact: 18500 },
      { timeOffsetMinutes: 20, label: '+20 Min Landfall', value: 4.5, unit: 'm', riskScore: 96, predictedPopulationImpact: 24000 },
      { timeOffsetMinutes: 40, label: '+40 Min High Tide', value: 4.8, unit: 'm', riskScore: 98, predictedPopulationImpact: 31000 },
      { timeOffsetMinutes: 70, label: '+70 Min Eye Passage', value: 3.8, unit: 'm', riskScore: 87, predictedPopulationImpact: 22000 }
    ],
    recommendedActions: [
      { id: 'act-61', stepNumber: '01', title: 'Complete Coastal Sector B Evacuation to Inundation Centers', description: 'Shuttle 6,500 fishermen colony residents to reinforced shelter complexes.', category: 'evacuation', status: 'EXECUTING', priority: 'CRITICAL', targetUnitId: 'sh-05' },
      { id: 'act-62', stepNumber: '02', title: 'Shut Port Crude Oil Pipelines & Crane Moorings', description: 'Prevent coastal oil spill by locking automatic emergency subsea valves.', category: 'infrastructure', status: 'COMPLETED', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-61', timestamp: '16:00:00', event: 'Cyclone landfall warning upgraded to RED ALERT', source: 'Regional Weather Center', confidence: 99, severity: 'CRITICAL' },
      { id: 't-62', timestamp: '16:15:00', event: 'Port sea wall overtopped; coastal flooding detected', source: 'Tide Station #07', confidence: 96, severity: 'CRITICAL' }
    ],
    assignedResources: ['res-07', 'amb-09', 'sh-05', 'hosp-08'],
    weather: { temp: 26, humidity: 99, windSpeed: 118, rainfall: 210, condition: 'Severe Cyclonic Storm' },
    reportedAt: '16:00:00',
    updatedAt: '12m ago'
  },
  {
    id: 'inc-007',
    code: 'NX-2075',
    title: 'Historic Heritage Complex Structural Subsidence',
    hazardType: 'structural_failure',
    severity: 'MODERATE',
    confidence: 87,
    status: 'ACTIVE',
    locationName: 'Pathergatti Market Corridor, Hyderabad',
    coordinates: { lat: 17.3616, lng: 78.4747 },
    affectedRadiusMeters: 450,
    populationAtRisk: 1450,
    riskScore: 58,
    riskFactors: {
      hazard: 62,
      population: 74,
      infrastructure: 65,
      weather: 40,
      accessibility: 72
    },
    sensorReadings: [
      { sensorId: 'sn-18', type: 'Tiltmeter Crack Sensor', reading: '4.8 mm tilt deflection', status: 'WARNING' }
    ],
    verificationChecks: [
      { id: 'v71', source: 'citizen_report', label: 'Shopkeepers Panic Report', verified: true, confidence: 90, evidence: 'Visible masonry cracking across 3 multi-story archways', timestamp: '25m ago' }
    ],
    verificationConfidence: 87,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Lean', value: 4.8, unit: 'mm', riskScore: 58, predictedPopulationImpact: 1450 },
      { timeOffsetMinutes: 40, label: '+40 Min Stress', value: 6.2, unit: 'mm', riskScore: 66, predictedPopulationImpact: 1800 }
    ],
    recommendedActions: [
      { id: 'act-71', stepNumber: '01', title: 'Erect Safety Perimeter & Barricade Archways', description: 'Prevent pedestrian and scooter entry into unstable vaulted walkway.', category: 'infrastructure', status: 'EXECUTING', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-71', timestamp: '12:30:00', event: 'Tilt sensor alarm sounded for Heritage Arch #12', source: 'Civic Structural Grid', confidence: 89, severity: 'HIGH' }
    ],
    assignedResources: ['res-08', 'amb-06'],
    weather: { temp: 32, humidity: 45, windSpeed: 14, rainfall: 0, condition: 'Clear Sky' },
    reportedAt: '12:30:00',
    updatedAt: '30m ago'
  },
  {
    id: 'inc-008',
    code: 'NX-2080',
    title: 'Pilgrim Ghat Footbridge Density Surge & Surge Stampede Risk',
    hazardType: 'crowd_emergency',
    severity: 'HIGH',
    confidence: 94,
    status: 'ACTIVE',
    locationName: 'Dashashwamedh Ghat Riverfront, Varanasi',
    coordinates: { lat: 25.3076, lng: 83.0107 },
    affectedRadiusMeters: 620,
    populationAtRisk: 16200,
    riskScore: 79,
    riskFactors: {
      hazard: 84,
      population: 98,
      infrastructure: 80,
      weather: 55,
      accessibility: 92
    },
    sensorReadings: [
      { sensorId: 'sn-19', type: 'Density Optical Counter', reading: '6.8 persons / m² (Crush threshold 4.5)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v81', source: 'cctv_vision', label: 'Overhead Drone Thermal Density Stream', verified: true, confidence: 96, evidence: 'Severe bottleneck at Main Stairs with backward pressure waves', timestamp: '5m ago' }
    ],
    verificationConfidence: 94,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Current Density', value: 6.8, unit: 'p/m²', riskScore: 79, predictedPopulationImpact: 16200 },
      { timeOffsetMinutes: 20, label: '+20 Min Influx', value: 8.1, unit: 'p/m²', riskScore: 92, predictedPopulationImpact: 22000 }
    ],
    recommendedActions: [
      { id: 'act-81', stepNumber: '01', title: 'Open Relief Exit Gates 4 & 5 toward Godowlia', description: 'Discharge unidirectional crowd flow away from slippery river steps.', category: 'evacuation', status: 'EXECUTING', priority: 'CRITICAL' }
    ],
    timeline: [
      { id: 't-81', timestamp: '18:15:00', event: 'Crowd density exceeded safe 4.5 persons/sq.meter limit', source: 'AI Drone Stream', confidence: 96, severity: 'HIGH' }
    ],
    assignedResources: ['res-01', 'amb-10'],
    weather: { temp: 29, humidity: 62, windSpeed: 8, rainfall: 0, condition: 'Humid Evening' },
    reportedAt: '18:15:00',
    updatedAt: '6m ago'
  },
  {
    id: 'inc-009',
    code: 'NX-2085',
    title: 'Wild Elephant Herd Rail Corridor Intrusion',
    hazardType: 'wildlife_intrusion',
    severity: 'MODERATE',
    confidence: 92,
    status: 'ACTIVE',
    locationName: 'Madukkarai Forest Rail Pass, Coimbatore',
    coordinates: { lat: 10.9020, lng: 76.9610 },
    affectedRadiusMeters: 1200,
    populationAtRisk: 620,
    riskScore: 61,
    riskFactors: {
      hazard: 68,
      population: 40,
      infrastructure: 78,
      weather: 50,
      accessibility: 70
    },
    sensorReadings: [
      { sensorId: 'sn-20', type: 'Acoustic Seismic Sensor', reading: 'Seismic footfall signature detected: 7 pachyderms', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v91', source: 'sensor_anomaly', label: 'Trackside AI Optical Camera', verified: true, confidence: 95, evidence: 'Herd of 7 elephants crossing track B at KM 504/12', timestamp: '12m ago' }
    ],
    verificationConfidence: 92,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Track Crossing', value: 7, unit: 'Elephants', riskScore: 61, predictedPopulationImpact: 620 }
    ],
    recommendedActions: [
      { id: 'act-91', stepNumber: '01', title: 'Issue Automated Rail Speed Restriction (Caution Order 20km/h)', description: 'Halt oncoming Nilgiri Express at Walayar signal; alert train locopilots.', category: 'infrastructure', status: 'COMPLETED', priority: 'CRITICAL' }
    ],
    timeline: [
      { id: 't-91', timestamp: '20:10:00', event: 'Elephants detected within 40m of railway track line', source: 'Seismic AI Sensor', confidence: 95, severity: 'HIGH' }
    ],
    assignedResources: ['res-04'],
    weather: { temp: 24, humidity: 80, windSpeed: 12, rainfall: 10, condition: 'Forest Night' },
    reportedAt: '20:10:00',
    updatedAt: '15m ago'
  },
  {
    id: 'inc-010',
    code: 'NX-2090',
    title: 'Severe Urban Heat Island & Heatstroke Surge',
    hazardType: 'extreme_heat',
    severity: 'MODERATE',
    confidence: 90,
    status: 'ACTIVE',
    locationName: 'Maninagar & Old City, Ahmedabad',
    coordinates: { lat: 23.0039, lng: 72.5976 },
    affectedRadiusMeters: 4500,
    populationAtRisk: 28000,
    riskScore: 64,
    riskFactors: {
      hazard: 72,
      population: 88,
      infrastructure: 55,
      weather: 95,
      accessibility: 30
    },
    sensorReadings: [
      { sensorId: 'sn-21', type: 'Wet Bulb Globe Temp', reading: '46.8°C (WBGT 33.2°C Extreme Danger)', status: 'ALERT' }
    ],
    verificationChecks: [
      { id: 'v101', source: 'weather_feed', label: 'Municipal Meteorological Station', verified: true, confidence: 98, evidence: 'Consecutive Day-4 with temperatures above 45.5°C', timestamp: '30m ago' }
    ],
    verificationConfidence: 90,
    predictiveForecast: [
      { timeOffsetMinutes: 0, label: 'Peak Sun Heat', value: 46.8, unit: '°C', riskScore: 64, predictedPopulationImpact: 28000 }
    ],
    recommendedActions: [
      { id: 'act-101', stepNumber: '01', title: 'Activate Cool Roof Centers & Water Misting Sprinklers', description: 'Deploy 8 municipal tanker misting rigs along bus termini and outdoor market hubs.', category: 'medical', status: 'EXECUTING', priority: 'HIGH' }
    ],
    timeline: [
      { id: 't-101', timestamp: '11:00:00', event: 'Orange Heatwave alert escalated based on wet bulb sensor reading', source: 'Heat Action Grid', confidence: 92, severity: 'HIGH' }
    ],
    assignedResources: ['amb-01', 'amb-06', 'hosp-07'],
    weather: { temp: 46.8, humidity: 22, windSpeed: 16, rainfall: 0, condition: 'Blistering Sun' },
    reportedAt: '11:00:00',
    updatedAt: '45m ago'
  }
];

export const DEMO_AMBULANCES: ResourceUnit[] = [
  { id: 'amb-01', callSign: 'Ambulance A-12', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 19.0620, lng: 72.8650 }, baseStation: 'BKC Emergency Post', personnelCount: 3, etaMinutes: 6, distanceKm: 2.4, capacity: 2, contactNumber: '+91 98201 12345' },
  { id: 'amb-02', callSign: 'Ambulance A-05', type: 'AMBULANCE', status: 'DISPATCHED', coordinates: { lat: 19.0740, lng: 72.8800 }, baseStation: 'Kurla Depot', personnelCount: 3, etaMinutes: 9, distanceKm: 3.8, capacity: 2, currentAssignment: 'inc-001', contactNumber: '+91 98201 12346' },
  { id: 'amb-03', callSign: 'Ambulance A-08 (ICU)', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 18.7620, lng: 73.3810 }, baseStation: 'Lonavala Toll Hub', personnelCount: 4, etaMinutes: 8, distanceKm: 4.1, capacity: 1, contactNumber: '+91 98201 12347' },
  { id: 'amb-04', callSign: 'Ambulance A-14 (4x4)', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 11.5480, lng: 76.1190 }, baseStation: 'Meppadi Primary Health', personnelCount: 3, etaMinutes: 11, distanceKm: 5.2, capacity: 2, contactNumber: '+91 98201 12348' },
  { id: 'amb-05', callSign: 'Ambulance A-18', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 11.4180, lng: 76.8590 }, baseStation: 'Kotagiri Health Center', personnelCount: 2, etaMinutes: 12, distanceKm: 6.4, capacity: 2, contactNumber: '+91 98201 12349' },
  { id: 'amb-06', callSign: 'Ambulance A-20', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 17.3680, lng: 78.4710 }, baseStation: 'Afzalgunj Hospital Hub', personnelCount: 3, etaMinutes: 5, distanceKm: 1.8, capacity: 2, contactNumber: '+91 98201 12350' },
  { id: 'amb-07', callSign: 'Ambulance A-22 (Hazmat Spec)', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 17.6920, lng: 83.2110 }, baseStation: 'Gajuwaka Fire Triage', personnelCount: 4, etaMinutes: 7, distanceKm: 3.2, capacity: 2, contactNumber: '+91 98201 12351' },
  { id: 'amb-08', callSign: 'Ambulance A-25', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 17.6790, lng: 83.2240 }, baseStation: 'Scindia Port Health', personnelCount: 3, etaMinutes: 10, distanceKm: 4.5, capacity: 2, contactNumber: '+91 98201 12352' },
  { id: 'amb-09', callSign: 'Ambulance A-31', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 13.2240, lng: 80.3190 }, baseStation: 'Ennore Port Post', personnelCount: 3, etaMinutes: 14, distanceKm: 7.2, capacity: 2, contactNumber: '+91 98201 12353' },
  { id: 'amb-10', callSign: 'Ambulance A-34', type: 'AMBULANCE', status: 'AVAILABLE', coordinates: { lat: 25.3120, lng: 83.0040 }, baseStation: 'BHU Trauma Center Relay', personnelCount: 3, etaMinutes: 6, distanceKm: 2.1, capacity: 2, contactNumber: '+91 98201 12354' }
];

export const DEMO_RESCUE_TEAMS: ResourceUnit[] = [
  { id: 'res-01', callSign: 'NDRF Battalion Unit 05', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 19.0710, lng: 72.8630 }, baseStation: 'Andheri NDRF Base', personnelCount: 18, etaMinutes: 9, distanceKm: 3.1, contactNumber: '+91 1078' },
  { id: 'res-02', callSign: 'Expressway Hazmat Rescue R-02', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 18.7600, lng: 73.3750 }, baseStation: 'Khandala Rescue Center', personnelCount: 12, etaMinutes: 7, distanceKm: 2.8, contactNumber: '+91 101' },
  { id: 'res-03', callSign: 'SDRF Mountain Collapse Taskforce R-03', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 11.5500, lng: 76.1300 }, baseStation: 'Kalpetta Disaster Base', personnelCount: 16, etaMinutes: 14, distanceKm: 6.8, contactNumber: '+91 1070' },
  { id: 'res-04', callSign: 'Forestry Wildland Fire Brigade R-04', type: 'FIRE_TRUCK', status: 'AVAILABLE', coordinates: { lat: 11.4280, lng: 76.8620 }, baseStation: 'Ooty Range Station', personnelCount: 14, etaMinutes: 12, distanceKm: 5.5, contactNumber: '+91 101' },
  { id: 'res-05', callSign: 'K-9 Search & Extraction Squad R-05', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 11.5590, lng: 76.1210 }, baseStation: 'SDRF Regional Hub', personnelCount: 8, etaMinutes: 16, distanceKm: 7.9, contactNumber: '+91 1078' },
  { id: 'res-06', callSign: 'Chemical Hazmat Rapid Neutralizer R-06', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 17.6890, lng: 83.2140 }, baseStation: 'Vizag Industrial Safety Post', personnelCount: 15, etaMinutes: 8, distanceKm: 3.5, contactNumber: '+91 101' },
  { id: 'res-07', callSign: 'Coast Guard Flood Inundation Unit R-07', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 13.2360, lng: 80.3210 }, baseStation: 'Chennai Port Marine Base', personnelCount: 22, etaMinutes: 15, distanceKm: 8.0, contactNumber: '+91 1554' },
  { id: 'res-08', callSign: 'Urban Structural Collapse Unit R-08', type: 'RESCUE_TEAM', status: 'AVAILABLE', coordinates: { lat: 17.3640, lng: 78.4720 }, baseStation: 'Old City Fire Command', personnelCount: 12, etaMinutes: 6, distanceKm: 2.2, contactNumber: '+91 101' }
];

export const DEMO_HOSPITALS: MedicalFacility[] = [
  { id: 'hosp-01', name: 'Sion Municipal General Hospital', type: 'TRAUMA_CENTER', coordinates: { lat: 19.0360, lng: 72.8610 }, totalBeds: 1200, availableBeds: 142, icuBedsAvailable: 24, traumaLevel: 'LEVEL_1', status: 'SURGE', distanceKm: 3.8, contactNumber: '+91 22 2407 6381' },
  { id: 'hosp-02', name: 'Sanjeevani Trauma Care, Khandala', type: 'TRAUMA_CENTER', coordinates: { lat: 18.7520, lng: 73.3680 }, totalBeds: 240, availableBeds: 48, icuBedsAvailable: 12, traumaLevel: 'LEVEL_2', status: 'NORMAL', distanceKm: 2.1, contactNumber: '+91 2114 273111' },
  { id: 'hosp-03', name: 'Wayanad District Hospital, Mananthavady', type: 'HOSPITAL', coordinates: { lat: 11.5620, lng: 76.1350 }, totalBeds: 450, availableBeds: 64, icuBedsAvailable: 9, traumaLevel: 'LEVEL_2', status: 'NORMAL', distanceKm: 4.8, contactNumber: '+91 4935 240223' },
  { id: 'hosp-04', name: 'Government Headquarter Hospital, Ooty', type: 'HOSPITAL', coordinates: { lat: 11.4120, lng: 76.7020 }, totalBeds: 380, availableBeds: 72, icuBedsAvailable: 14, traumaLevel: 'LEVEL_2', status: 'NORMAL', distanceKm: 8.2, contactNumber: '+91 423 244 2212' },
  { id: 'hosp-05', name: 'King George Hospital (KGH), Visakhapatnam', type: 'TRAUMA_CENTER', coordinates: { lat: 17.7080, lng: 83.3050 }, totalBeds: 1050, availableBeds: 186, icuBedsAvailable: 31, traumaLevel: 'LEVEL_1', status: 'SURGE', distanceKm: 6.4, contactNumber: '+91 891 256 4891' },
  { id: 'hosp-06', name: 'Lilavati Hospital & Research Center', type: 'HOSPITAL', coordinates: { lat: 19.0510, lng: 72.8290 }, totalBeds: 320, availableBeds: 38, icuBedsAvailable: 8, traumaLevel: 'LEVEL_1', status: 'NORMAL', distanceKm: 5.5, contactNumber: '+91 22 2675 1000' },
  { id: 'hosp-07', name: 'SVP Institute of Medical Sciences, Ahmedabad', type: 'TRAUMA_CENTER', coordinates: { lat: 23.0180, lng: 72.5760 }, totalBeds: 1500, availableBeds: 290, icuBedsAvailable: 45, traumaLevel: 'LEVEL_1', status: 'NORMAL', distanceKm: 3.2, contactNumber: '+91 79 2657 7621' },
  { id: 'hosp-08', name: 'Stanley Medical College Hospital, Chennai', type: 'TRAUMA_CENTER', coordinates: { lat: 13.1040, lng: 80.2880 }, totalBeds: 1300, availableBeds: 210, icuBedsAvailable: 38, traumaLevel: 'LEVEL_1', status: 'SURGE', distanceKm: 9.8, contactNumber: '+91 44 2528 1351' },
  { id: 'hosp-09', name: 'Osmania General Hospital, Hyderabad', type: 'TRAUMA_CENTER', coordinates: { lat: 17.3730, lng: 78.4720 }, totalBeds: 1100, availableBeds: 125, icuBedsAvailable: 22, traumaLevel: 'LEVEL_1', status: 'NORMAL', distanceKm: 1.6, contactNumber: '+91 40 2460 0121' },
  { id: 'hosp-10', name: 'Sir Sunderlal Hospital, BHU Varanasi', type: 'TRAUMA_CENTER', coordinates: { lat: 25.2780, lng: 82.9990 }, totalBeds: 1400, availableBeds: 195, icuBedsAvailable: 40, traumaLevel: 'LEVEL_1', status: 'NORMAL', distanceKm: 4.1, contactNumber: '+91 542 236 9251' }
];

export const DEMO_SHELTERS: ReliefShelter[] = [
  { id: 'sh-01', name: 'Kurla West Municipal School Relief Center', coordinates: { lat: 19.0660, lng: 72.8760 }, capacity: 450, currentOccupancy: 180, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 5, contactPerson: 'Officer M. Kulkarni', contactNumber: '+91 98200 45671' },
  { id: 'sh-02', name: 'Don Bosco Youth Center, Kurla', coordinates: { lat: 19.0720, lng: 72.8840 }, capacity: 600, currentOccupancy: 210, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 7, contactPerson: 'Rev. Fr. Augustine', contactNumber: '+91 98200 45672' },
  { id: 'sh-03', name: 'Lonavala Municipal Community Hall', coordinates: { lat: 18.7550, lng: 73.4070 }, capacity: 350, currentOccupancy: 45, status: 'OPEN', hasMedicalPost: false, foodSuppliesDays: 4, contactPerson: 'D. Shinde', contactNumber: '+91 98200 45673' },
  { id: 'sh-04', name: 'Kotagiri Tea Board Community Center', coordinates: { lat: 11.4250, lng: 76.8740 }, capacity: 400, currentOccupancy: 120, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 6, contactPerson: 'K. Ramanathan', contactNumber: '+91 98200 45674' },
  { id: 'sh-05', name: 'Ennore Port Fisherfolk Cyclone Shelter', coordinates: { lat: 13.2380, lng: 80.3240 }, capacity: 1200, currentOccupancy: 840, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 8, contactPerson: 'Captain P. Selvam', contactNumber: '+91 98200 45675' },
  { id: 'sh-06', name: 'Meppadi St. Joseph Relief Shelter', coordinates: { lat: 11.5510, lng: 76.1280 }, capacity: 500, currentOccupancy: 280, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 5, contactPerson: 'Sister Mary Teresa', contactNumber: '+91 98200 45676' },
  { id: 'sh-07', name: 'Gajuwaka Indoor Sports Stadium Evac Shelter', coordinates: { lat: 17.6940, lng: 83.2190 }, capacity: 1500, currentOccupancy: 610, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 10, contactPerson: 'R. Appa Rao', contactNumber: '+91 98200 45677' },
  { id: 'sh-08', name: 'Ahmedabad Kankaria Relief Pavillion', coordinates: { lat: 23.0060, lng: 72.6020 }, capacity: 700, currentOccupancy: 150, status: 'OPEN', hasMedicalPost: true, foodSuppliesDays: 4, contactPerson: 'B. Patel', contactNumber: '+91 98200 45678' }
];

export const DEMO_SENSORS: IoTSensor[] = [
  { id: 'sn-01', name: 'Mithi River Sonar Gauge #01', hazardType: 'flood', coordinates: { lat: 19.0690, lng: 72.8710 }, status: 'CRITICAL', lastPing: '30s ago', metricLabel: 'Water Depth', currentValue: 5.2, thresholdValue: 3.8, unit: 'm', batteryLevel: 94 },
  { id: 'sn-02', name: 'BKC Meteorological Pluviometer', hazardType: 'flood', coordinates: { lat: 19.0640, lng: 72.8680 }, status: 'CRITICAL', lastPing: '45s ago', metricLabel: 'Rain Intensity', currentValue: 142, thresholdValue: 70, unit: 'mm/h', batteryLevel: 88 },
  { id: 'sn-03', name: 'Kurla Storm Sewer Hydro-Transducer', hazardType: 'flood', coordinates: { lat: 19.0715, lng: 72.8745 }, status: 'WARNING', lastPing: '1m ago', metricLabel: 'Drain Pressure', currentValue: 4.8, thresholdValue: 4.0, unit: 'bar', batteryLevel: 91 },
  { id: 'sn-04', name: 'Bandra-Kurla River Flow Sonar', hazardType: 'flood', coordinates: { lat: 19.0665, lng: 72.8635 }, status: 'CRITICAL', lastPing: '15s ago', metricLabel: 'Flow Velocity', currentValue: 3.6, thresholdValue: 2.5, unit: 'm/s', batteryLevel: 96 },
  { id: 'sn-05', name: 'Kotagiri Thermal IR Canopy Sensor', hazardType: 'fire', coordinates: { lat: 11.4240, lng: 76.8655 }, status: 'CRITICAL', lastPing: '20s ago', metricLabel: 'Canopy Temp', currentValue: 380, thresholdValue: 65, unit: '°C', batteryLevel: 82 },
  { id: 'sn-06', name: 'Nilgiris Ridge Smoke PM2.5 Monitor', hazardType: 'fire', coordinates: { lat: 11.4225, lng: 76.8670 }, status: 'CRITICAL', lastPing: '1m ago', metricLabel: 'PM2.5 Density', currentValue: 540, thresholdValue: 150, unit: 'µg/m³', batteryLevel: 79 },
  { id: 'sn-07', name: 'Ooty Wind Anemometer Mast', hazardType: 'fire', coordinates: { lat: 11.4280, lng: 76.8610 }, status: 'WARNING', lastPing: '30s ago', metricLabel: 'Wind Velocity', currentValue: 44, thresholdValue: 35, unit: 'km/h', batteryLevel: 89 },
  { id: 'sn-08', name: 'Pharma City VOC PID Spectrometer', hazardType: 'industrial_gas_leak', coordinates: { lat: 17.6870, lng: 83.2180 }, status: 'CRITICAL', lastPing: '10s ago', metricLabel: 'VOC Concentration', currentValue: 185, thresholdValue: 20, unit: 'ppm', batteryLevel: 98 },
  { id: 'sn-09', name: 'Gajuwaka Ultrasonic Weather Mast', hazardType: 'industrial_gas_leak', coordinates: { lat: 17.6895, lng: 83.2160 }, status: 'WARNING', lastPing: '45s ago', metricLabel: 'Wind Heading', currentValue: 220, thresholdValue: 180, unit: '°', batteryLevel: 93 },
  { id: 'sn-10', name: 'Polymer Tank 4 Pressure Gauge', hazardType: 'industrial_gas_leak', coordinates: { lat: 17.6855, lng: 83.2195 }, status: 'CRITICAL', lastPing: '12s ago', metricLabel: 'Tank Pressure', currentValue: 12.4, thresholdValue: 8.0, unit: 'bar', batteryLevel: 85 },
  { id: 'sn-11', name: 'Meppadi Slope Inclinometer A', hazardType: 'landslide', coordinates: { lat: 11.5535, lng: 76.1265 }, status: 'CRITICAL', lastPing: '30s ago', metricLabel: 'Shear Displacement', currentValue: 18.4, thresholdValue: 5.0, unit: 'cm', batteryLevel: 76 },
  { id: 'sn-12', name: 'Wayanad Ghat Piezometer Node', hazardType: 'landslide', coordinates: { lat: 11.5545, lng: 76.1255 }, status: 'CRITICAL', lastPing: '25s ago', metricLabel: 'Pore Water Pressure', currentValue: 62, thresholdValue: 40, unit: 'kPa', batteryLevel: 81 },
  { id: 'sn-13', name: 'Ghat Pass Triaxial Geophone', hazardType: 'landslide', coordinates: { lat: 11.5520, lng: 76.1275 }, status: 'WARNING', lastPing: '15s ago', metricLabel: 'Vibration Amplitude', currentValue: 2.1, thresholdValue: 1.5, unit: 'mm/s', batteryLevel: 90 },
  { id: 'sn-14', name: 'Khandala Tunnel LEL Gas Sniffer', hazardType: 'road_accident', coordinates: { lat: 18.7565, lng: 73.3725 }, status: 'CRITICAL', lastPing: '10s ago', metricLabel: 'Combustible Gas', currentValue: 14, thresholdValue: 10, unit: '% LEL', batteryLevel: 99 },
  { id: 'sn-15', name: 'Expressway Tunnel Optical Transmissometer', hazardType: 'road_accident', coordinates: { lat: 18.7555, lng: 73.3715 }, status: 'CRITICAL', lastPing: '20s ago', metricLabel: 'Visibility Range', currentValue: 18, thresholdValue: 50, unit: 'm', batteryLevel: 97 },
  { id: 'sn-16', name: 'Ennore Marine Radar Tide Gauge', hazardType: 'severe_weather', coordinates: { lat: 13.2325, lng: 80.3285 }, status: 'CRITICAL', lastPing: '30s ago', metricLabel: 'Surge Height', currentValue: 3.9, thresholdValue: 2.0, unit: 'm', batteryLevel: 92 },
  { id: 'sn-17', name: 'Chennai Port Barometric Pressure Cell', hazardType: 'severe_weather', coordinates: { lat: 13.2315, lng: 80.3275 }, status: 'CRITICAL', lastPing: '1m ago', metricLabel: 'Atmospheric Pressure', currentValue: 964, thresholdValue: 990, unit: 'hPa', batteryLevel: 87 },
  { id: 'sn-18', name: 'Pathergatti Heritage Vibrating Wire Tilt', hazardType: 'structural_failure', coordinates: { lat: 17.3620, lng: 78.4750 }, status: 'WARNING', lastPing: '2m ago', metricLabel: 'Wall Angular Tilt', currentValue: 4.8, thresholdValue: 3.0, unit: 'mm/m', batteryLevel: 95 },
  { id: 'sn-19', name: 'Dashashwamedh Optical Crowd Density Rig', hazardType: 'crowd_emergency', coordinates: { lat: 25.3080, lng: 83.0110 }, status: 'CRITICAL', lastPing: '10s ago', metricLabel: 'Crowd Density', currentValue: 6.8, thresholdValue: 4.5, unit: 'p/m²', batteryLevel: 94 },
  { id: 'sn-20', name: 'Madukkarai Rail Seismic Elephant Detector', hazardType: 'wildlife_intrusion', coordinates: { lat: 10.9025, lng: 76.9615 }, status: 'CRITICAL', lastPing: '45s ago', metricLabel: 'Fauna Mass Acoustic', currentValue: 7, thresholdValue: 1, unit: 'Count', batteryLevel: 91 }
];

export const DEMO_CITIZEN_REPORTS: CitizenSOSReport[] = [
  { id: 'rep-01', reporterName: 'Aarav Sharma', contactPhone: '+91 98210 99881', coordinates: { lat: 19.0682, lng: 72.8710 }, locationText: 'LBS Marg, Kurla Bus Depot water level up to car windows', emergencyType: 'flood', reportedAt: '12m ago', status: 'VERIFIED', peopleCount: 4, notes: 'Stuck inside white Swift car. Water is rising fast. Elderly mother with diabetes.' },
  { id: 'rep-02', reporterName: 'Sunita Patil', contactPhone: '+91 98210 99882', coordinates: { lat: 19.0695, lng: 72.8725 }, locationText: 'Kamani Junction, Ground floor shops flooded', emergencyType: 'flood', reportedAt: '18m ago', status: 'VERIFIED', peopleCount: 8, notes: 'Shop basement filled with mud water. Electric transformer nearby sparking.' },
  { id: 'rep-03', reporterName: 'K. Vignesh', contactPhone: '+91 94440 33211', coordinates: { lat: 11.4235, lng: 76.8665 }, locationText: 'Kotagiri Valley Road Estate #4', emergencyType: 'fire', reportedAt: '14m ago', status: 'VERIFIED', peopleCount: 25, notes: 'Flames leaping across dry pine grass. Smoke is black and blinding.' },
  { id: 'rep-04', reporterName: 'Chaitanya Reddy', contactPhone: '+91 98480 77123', coordinates: { lat: 17.6872, lng: 83.2182 }, locationText: 'RR Venkatapuram Township, Gate 2', emergencyType: 'industrial_gas_leak', reportedAt: '8m ago', status: 'VERIFIED', peopleCount: 6, notes: 'Chemical smell like burning plastic. Children vomiting and crying from burning eyes.' },
  { id: 'rep-05', reporterName: 'Mohammed Shafi', contactPhone: '+91 94950 11200', coordinates: { lat: 11.5542, lng: 76.1262 }, locationText: 'Meppadi Ghat Curve 3, Wayanad', emergencyType: 'landslide', reportedAt: '22m ago', status: 'VERIFIED', peopleCount: 12, notes: 'Entire hillside slipped down. Large trees across road. A private car is pinned.' },
  { id: 'rep-06', reporterName: 'Rohit Joshi', contactPhone: '+91 98220 55431', coordinates: { lat: 18.7562, lng: 73.3722 }, locationText: 'Expressway Bhatan Tunnel interior', emergencyType: 'road_accident', reportedAt: '11m ago', status: 'VERIFIED', peopleCount: 18, notes: 'LPG tanker leaking gas hiss. Several cars smashed behind it. People running toward exit.' },
  { id: 'rep-07', reporterName: 'R. Meenakshi', contactPhone: '+91 98410 88200', coordinates: { lat: 13.2322, lng: 80.3282 }, locationText: 'Ennore High Road, Tsunami Colony', emergencyType: 'severe_weather', reportedAt: '20m ago', status: 'VERIFIED', peopleCount: 15, notes: 'Sea waves crashed into houses. Rooftops blown off by heavy gale winds.' },
  { id: 'rep-08', reporterName: 'Sayeed Ahmed', contactPhone: '+91 98490 44321', coordinates: { lat: 17.3618, lng: 78.4748 }, locationText: 'Madina Building Archway', emergencyType: 'structural_failure', reportedAt: '35m ago', status: 'VERIFIED', peopleCount: 5, notes: 'Chunks of lime mortar falling. Sound of deep cracking inside old pillar.' },
  { id: 'rep-09', reporterName: 'Pandit Ramdas', contactPhone: '+91 94500 22119', coordinates: { lat: 25.3078, lng: 83.0108 }, locationText: 'Dashashwamedh Main Ghat steps', emergencyType: 'crowd_emergency', reportedAt: '7m ago', status: 'VERIFIED', peopleCount: 50, notes: 'People pushing backwards. Barricade broken near VIP Aarti platform.' },
  { id: 'rep-10', reporterName: 'Muruganathan S.', contactPhone: '+91 94430 66551', coordinates: { lat: 10.9022, lng: 76.9612 }, locationText: 'Madukkarai railway kilometer post 504', emergencyType: 'wildlife_intrusion', reportedAt: '16m ago', status: 'VERIFIED', peopleCount: 3, notes: 'Mother elephant with calf standing directly between railway tracks.' }
];
