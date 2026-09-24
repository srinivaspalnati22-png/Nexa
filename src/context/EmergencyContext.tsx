'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Incident, 
  ResourceUnit, 
  MedicalFacility, 
  ReliefShelter, 
  IoTSensor, 
  CitizenSOSReport,
  NotificationItem,
  UserRole,
  HazardType
} from '@/types';
import { 
  DEMO_INCIDENTS, 
  DEMO_AMBULANCES, 
  DEMO_RESCUE_TEAMS, 
  DEMO_HOSPITALS, 
  DEMO_SHELTERS, 
  DEMO_SENSORS, 
  DEMO_CITIZEN_REPORTS,
  DEMO_SCENARIOS
} from '@/data/demoData';
import { 
  queueOfflineReport, 
  getOfflineReportsQueue, 
  clearOfflineReportsQueue 
} from '@/lib/offlineStorage';

export type NetworkStatus = 'ONLINE' | 'NETWORK_LOST' | 'OFFLINE_MODE' | 'SYNCING';

interface EmergencyContextType {
  incidents: Incident[];
  selectedIncident: Incident | null;
  selectedIncidentId: string;
  setSelectedIncidentId: (id: string) => void;
  resources: ResourceUnit[];
  ambulances: ResourceUnit[];
  rescueTeams: ResourceUnit[];
  hospitals: MedicalFacility[];
  shelters: ReliefShelter[];
  sensors: IoTSensor[];
  citizenReports: CitizenSOSReport[];
  notifications: NotificationItem[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  networkStatus: NetworkStatus;
  isOffline: boolean;
  toggleNetworkFailure: () => void;
  // Demo Mode & Live Sequence
  isDemoRunning: boolean;
  demoStep: number;
  demoStepTitle: string;
  demoStepDescription: string;
  isDemoCompleted: boolean;
  startLiveDemo: () => void;
  stopLiveDemo: () => void;
  playScenario: (scenarioId: string) => void;
  activeScenarioId: string | null;
  // Actions
  dispatchResource: (incidentId: string, unitId: string) => void;
  verifyIncident: (incidentId: string) => void;
  submitCitizenSOS: (reportData: Partial<CitizenSOSReport>) => Promise<CitizenSOSReport>;
  dismissNotification: (id: string) => void;
  filterHazard: HazardType | 'ALL';
  setFilterHazard: (h: HazardType | 'ALL') => void;
  // Map View Focus
  mapCenter: [number, number];
  mapZoom: number;
  setMapCenter: (coords: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export function EmergencyProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>(DEMO_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('inc-001');
  const [ambulances, setAmbulances] = useState<ResourceUnit[]>(DEMO_AMBULANCES);
  const [rescueTeams, setRescueTeams] = useState<ResourceUnit[]>(DEMO_RESCUE_TEAMS);
  const [hospitals, setHospitals] = useState<MedicalFacility[]>(DEMO_HOSPITALS);
  const [shelters, setShelters] = useState<ReliefShelter[]>(DEMO_SHELTERS);
  const [sensors, setSensors] = useState<IoTSensor[]>(DEMO_SENSORS);
  const [citizenReports, setCitizenReports] = useState<CitizenSOSReport[]>(DEMO_CITIZEN_REPORTS);
  const [userRole, setUserRole] = useState<UserRole>('OPERATOR');
  const [filterHazard, setFilterHazard] = useState<HazardType | 'ALL'>('ALL');
  
  // Map coordinates state
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0688, 72.8715]);
  const [mapZoom, setMapZoom] = useState<number>(14);

  // Network & Offline Mode
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('ONLINE');

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'CRITICAL',
      title: 'Level-4 Urban Inundation Alert',
      message: 'Mithi River Basin water level crossed 5.2m. Kurla Sector A under immediate threat.',
      timestamp: '17:21:03',
      incidentId: 'inc-001',
      read: false
    },
    {
      id: 'notif-2',
      type: 'WARNING',
      title: 'Road Access Restriced',
      message: 'LBS Marg arterial corridor inundated. Diverting emergency logistics to EEH.',
      timestamp: '17:22:45',
      incidentId: 'inc-001',
      read: false
    },
    {
      id: 'notif-3',
      type: 'SUCCESS',
      title: 'Relief Center Activated',
      message: 'Don Bosco Youth Shelter (600 cap) ready with standby medical surge posts.',
      timestamp: '17:24:10',
      incidentId: 'inc-001',
      read: true
    }
  ]);

  // Demo Runner States
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoStepTitle, setDemoStepTitle] = useState<string>('');
  const [demoStepDescription, setDemoStepDescription] = useState<string>('');
  const [isDemoCompleted, setIsDemoCompleted] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0] || null;

  // Sync map center when selected incident changes
  useEffect(() => {
    if (selectedIncident) {
      setMapCenter([selectedIncident.coordinates.lat, selectedIncident.coordinates.lng]);
    }
  }, [selectedIncidentId]);

  // Offline Mode Toggle Simulator
  const toggleNetworkFailure = () => {
    if (networkStatus === 'ONLINE') {
      setNetworkStatus('NETWORK_LOST');
      setTimeout(() => {
        setNetworkStatus('OFFLINE_MODE');
        addNotification({
          id: `notif-offline-${Date.now()}`,
          type: 'WARNING',
          title: 'OFFLINE EMERGENCY MODE ENGAGED',
          message: 'Operating on local cached satellite geometry and offline dispatch queues.',
          timestamp: new Date().toLocaleTimeString(),
          read: false
        });
      }, 1200);
    } else {
      setNetworkStatus('SYNCING');
      setTimeout(() => {
        const queuedReports = clearOfflineReportsQueue();
        if (queuedReports.length > 0) {
          setCitizenReports(prev => [...queuedReports, ...prev]);
        }
        setNetworkStatus('ONLINE');
        addNotification({
          id: `notif-online-${Date.now()}`,
          type: 'SUCCESS',
          title: 'CONNECTIVITY RESTORED',
          message: `Synchronized ${queuedReports.length} queued offline emergency reports.`,
          timestamp: new Date().toLocaleTimeString(),
          read: false
        });
      }, 2000);
    }
  };

  const addNotification = (item: NotificationItem) => {
    setNotifications(prev => [item, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Dispatch Resource
  const dispatchResource = (incidentId: string, unitId: string) => {
    setAmbulances(prev => prev.map(a => {
      if (a.id === unitId) {
        return { ...a, status: 'DISPATCHED', currentAssignment: incidentId };
      }
      return a;
    }));

    setRescueTeams(prev => prev.map(r => {
      if (r.id === unitId) {
        return { ...r, status: 'DISPATCHED', currentAssignment: incidentId };
      }
      return r;
    }));

    // Update incident assigned resources & timeline
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        const updatedResources = inc.assignedResources.includes(unitId)
          ? inc.assignedResources
          : [...inc.assignedResources, unitId];
        
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          event: `Tactical Unit ${unitId.toUpperCase()} dispatched to incident zone`,
          source: 'Resource Orchestrator',
          confidence: 99,
          actionTaken: 'High-speed emergency transit initiated',
          severity: 'CRITICAL' as const
        };

        return {
          ...inc,
          assignedResources: updatedResources,
          timeline: [newTimelineEvent, ...inc.timeline]
        };
      }
      return inc;
    }));

    addNotification({
      id: `notif-disp-${Date.now()}`,
      type: 'INFO',
      title: 'Resource Unit Dispatched',
      message: `Unit ${unitId} is en-route to Incident ${incidentId}`,
      timestamp: new Date().toLocaleTimeString(),
      incidentId,
      read: false
    });
  };

  // Verify Incident
  const verifyIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: 'VERIFIED',
          verificationConfidence: 98,
          timeline: [
            {
              id: `tl-v-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              event: 'AI multi-factor cross-check verified: 98% confidence across all 5 telemetry vectors',
              source: 'AI Incident Verification Engine',
              confidence: 98,
              severity: 'CRITICAL'
            },
            ...inc.timeline
          ]
        };
      }
      return inc;
    }));
  };

  // Submit Citizen SOS
  const submitCitizenSOS = async (reportData: Partial<CitizenSOSReport>): Promise<CitizenSOSReport> => {
    const newReport: CitizenSOSReport = {
      id: `sos-${Date.now()}`,
      reporterName: reportData.reporterName || 'Citizen User',
      contactPhone: reportData.contactPhone || '+91 99999 88888',
      coordinates: reportData.coordinates || { lat: mapCenter[0], lng: mapCenter[1] },
      locationText: reportData.locationText || 'Current GPS Location',
      emergencyType: reportData.emergencyType || 'flood',
      reportedAt: 'Just now',
      status: 'NEW',
      peopleCount: reportData.peopleCount || 1,
      notes: reportData.notes || 'Emergency assistance requested via Citizen SOS Portal.',
      mediaUrl: reportData.mediaUrl
    };

    if (networkStatus !== 'ONLINE') {
      queueOfflineReport(newReport);
      addNotification({
        id: `notif-off-report-${Date.now()}`,
        type: 'WARNING',
        title: 'SOS Queued Locally (Offline)',
        message: 'Your distress beacon is stored in memory and will relay immediately once link restores.',
        timestamp: new Date().toLocaleTimeString(),
        read: false
      });
    } else {
      setCitizenReports(prev => [newReport, ...prev]);
      addNotification({
        id: `notif-sos-${Date.now()}`,
        type: 'CRITICAL',
        title: 'Citizen SOS Ingested',
        message: `${newReport.reporterName} reported ${newReport.emergencyType} at ${newReport.locationText}.`,
        timestamp: new Date().toLocaleTimeString(),
        read: false
      });
    }

    return newReport;
  };

  // Play Specific Scenario
  const playScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    let targetIncId = 'inc-001';
    if (scenarioId === 'scenario-fire') targetIncId = 'inc-002';
    else if (scenarioId === 'scenario-gas') targetIncId = 'inc-003';
    else if (scenarioId === 'scenario-landslide') targetIncId = 'inc-004';
    else if (scenarioId === 'scenario-accident') targetIncId = 'inc-005';

    setSelectedIncidentId(targetIncId);
    const targetInc = incidents.find(i => i.id === targetIncId);
    if (targetInc) {
      setMapCenter([targetInc.coordinates.lat, targetInc.coordinates.lng]);
    }
  };

  // SIGNATURE 17-STEP LIVE DEMO SEQUENCE
  const startLiveDemo = () => {
    setIsDemoRunning(true);
    setIsDemoCompleted(false);
    setDemoStep(1);

    const steps = [
      { step: 1, title: '1. Normal State Baseline', desc: 'Continuous environmental IoT monitoring and satellite telemetry active across sectors.' },
      { step: 2, title: '2. Sensor Anomaly Trigger', desc: 'Sonar gauge #SN-01 detects unexpected +1.8m surge beyond safe hydraulic thresholds.' },
      { step: 3, title: '3. Radar Sweep & Geofence', desc: 'Synthetic Aperture Radar (SAR) sweep demarcates anomalous high-reflectivity basin.' },
      { step: 4, title: '4. Multi-Stream AI Verification', desc: 'Cross-verifying 42 citizen tweets, CCTV water detection, and Doppler rainfall.' },
      { step: 5, title: '5. Incident Confirmed (CRITICAL)', desc: 'AI Verification Engine confirms Level-4 Urban Flash Flood with 94% statistical confidence.' },
      { step: 6, title: '6. NEXUS Risk Score Computed', desc: 'Composite multi-dimensional algorithm escalates Risk Score to 88/100 (CRITICAL).' },
      { step: 7, title: '7. Affected Polygon Rendered', desc: 'Digital Twin computes 1,850m radius inundation envelope with hydrodynamic flow velocity.' },
      { step: 8, title: '8. Population Impact Evaluated', desc: 'Geospatial census layer calculates 8,420 citizens and 1,240 structures at direct risk.' },
      { step: 9, title: '9. AI Emergency Commander Strategy', desc: 'Autonomous Commander synthesizes 5 deterministic action protocols for human confirmation.' },
      { step: 10, title: '10. Optimal Route Calculated', desc: 'High-speed arterial evacuation path generated avoiding submerged LBS Marg underpasses.' },
      { step: 11, title: '11. Ambulance Unit A-12 Assigned', desc: 'Automated nearest-unit dispatch assigns Ambulance A-12 with 6-minute ETA.' },
      { step: 12, title: '12. NDRF Boat Squad Deployed', desc: 'Battalion Unit 05 activated with motorized inflatable boats for stranded bus clusters.' },
      { step: 13, title: '13. Don Bosco Shelter Reserved', desc: 'Relief Shelter S-02 prepared with 600 emergency beds and clean drinking water.' },
      { step: 14, title: '14. Multilingual Citizen Broadcast', desc: 'High-priority voice and SMS alerts broadcast in English, Marathi, and Hindi.' },
      { step: 15, title: '15. Evacuation Corridors Activated', desc: 'Real-time LED road signs and police traffic units seal flooded entry points.' },
      { step: 16, title: '16. Live Operational Status: ACTIVE', desc: 'Unified incident command dashboard reaches coordinated deployment status.' },
      { step: 17, title: '17. NEXUS Response Completed', desc: 'Containment perimeter stabilized; 8,421 citizens safeguarded with zero fatal delays.' }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx <= steps.length) {
        const curr = steps[currentIdx - 1];
        setDemoStep(curr.step);
        setDemoStepTitle(curr.title);
        setDemoStepDescription(curr.desc);

        // State changes during demo sequence
        if (curr.step === 5) {
          verifyIncident('inc-001');
        }
        if (curr.step === 11) {
          dispatchResource('inc-001', 'amb-01');
        }
        if (curr.step === 12) {
          dispatchResource('inc-001', 'res-01');
        }
      } else {
        clearInterval(interval);
        setIsDemoRunning(false);
        setIsDemoCompleted(true);
      }
    }, 2800); // 2.8s per step for professional cinematic pace
  };

  const stopLiveDemo = () => {
    setIsDemoRunning(false);
    setDemoStep(0);
    setDemoStepTitle('');
    setDemoStepDescription('');
  };

  return (
    <EmergencyContext.Provider
      value={{
        incidents,
        selectedIncident,
        selectedIncidentId,
        setSelectedIncidentId,
        resources: [...ambulances, ...rescueTeams],
        ambulances,
        rescueTeams,
        hospitals,
        shelters,
        sensors,
        citizenReports,
        notifications,
        userRole,
        setUserRole,
        networkStatus,
        isOffline: networkStatus !== 'ONLINE',
        toggleNetworkFailure,
        isDemoRunning,
        demoStep,
        demoStepTitle,
        demoStepDescription,
        isDemoCompleted,
        startLiveDemo,
        stopLiveDemo,
        playScenario,
        activeScenarioId,
        dispatchResource,
        verifyIncident,
        submitCitizenSOS,
        dismissNotification,
        filterHazard,
        setFilterHazard,
        mapCenter,
        mapZoom,
        setMapCenter,
        setMapZoom
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
}
