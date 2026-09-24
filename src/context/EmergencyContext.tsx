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
  
  // Map coordinates state (Andhra Pradesh Kalingapatnam Cyclone Belt)
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.3400, 84.1200]);
  const [mapZoom, setMapZoom] = useState<number>(13);

  // Network & Offline Mode
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('ONLINE');

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'CRITICAL',
      title: 'IMD Red Alert: Bay of Bengal Deep Depression Landfall',
      message: 'Cyclone crossing coast near Kalingapatnam, Srikakulam with 78 km/h gale gusts. Storm surge 3.4m.',
      timestamp: '14:02:11',
      incidentId: 'inc-001',
      read: false
    },
    {
      id: 'notif-2',
      type: 'CRITICAL',
      title: 'Vijayawada Budameru Inundation Alert',
      message: 'Budameru diversion breach submerged Ajit Singh Nagar & Payakapuram. 86,000 citizens impacted.',
      timestamp: '14:03:45',
      incidentId: 'inc-002',
      read: false
    },
    {
      id: 'notif-3',
      type: 'SUCCESS',
      title: 'Kalingapatnam Cyclone Sanctuary CS-01 Activated',
      message: '1,500-capacity reinforced shelter ready with medical surge posts and food supplies.',
      timestamp: '14:06:10',
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
      { step: 1, title: '1. Normal Coastal Baseline', desc: 'Continuous environmental IoT monitoring and IMD Doppler radar active across North Andhra.' },
      { step: 2, title: '2. Deep Depression Anomaly Trigger', desc: 'Barometric sensor #SN-AP-01 plunges 14 hPa; Kalingapatnam tide station flags +3.4m storm surge.' },
      { step: 3, title: '3. Radar Sweep & Coastal Geofence', desc: 'Doppler Cyclone radar sweep demarcates eye wall convective band crossing Srikakulam coastline.' },
      { step: 4, title: '4. Multi-Stream AI Verification', desc: 'Cross-verifying 64 citizen distress calls, CCTV harbor cameras, and IMD Amaravati radar.' },
      { step: 5, title: '5. Incident Confirmed (CRITICAL)', desc: 'AI Verification Engine confirms Bay of Bengal Cyclone Landfall with 96% statistical confidence.' },
      { step: 6, title: '6. NEXUS Risk Score Computed', desc: 'Composite multi-dimensional algorithm escalates Risk Score to 94/100 (CRITICAL RED ALERT).' },
      { step: 7, title: '7. Affected Polygon Rendered', desc: 'Digital Twin computes 3,800m coastal inundation envelope with hydrodynamic surge velocities.' },
      { step: 8, title: '8. Population Impact Evaluated', desc: 'Geospatial census layer calculates 24,500 coastal residents and 4,100 structures at immediate risk.' },
      { step: 9, title: '9. AI Emergency Commander Strategy', desc: 'Autonomous Commander synthesizes 5 deterministic action protocols for collectorate authorization.' },
      { step: 10, title: '10. Optimal Evacuation Route Calculated', desc: 'High-elevation corridor Route 16-A generated avoiding submerged coastal bridges.' },
      { step: 11, title: '11. 108 ALS Ambulance Assigned', desc: 'Automated nearest-unit dispatch assigns Ambulance #AP-VZG-12 with 6-minute ETA.' },
      { step: 12, title: '12. NDRF 10th Battalion Deployed', desc: 'Battalion Unit 04 activated with motorized inflatable rescue boats and hydraulic saws.' },
      { step: 13, title: '13. Cyclone Shelter CS-01 Reserved', desc: 'Kalingapatnam Reinforced Sanctuary prepared with 1,500 beds, food packets, and solar gensets.' },
      { step: 14, title: '14. Multilingual Citizen Broadcast', desc: 'High-priority voice and SMS alerts broadcast in Telugu (తెలుగు) and English across mobile towers.' },
      { step: 15, title: '15. Port Warning Signal 7 Hoisted', desc: 'State police and coastal marine units seal beach roads and secure 840 fishing trawlers.' },
      { step: 16, title: '16. Live Operational Status: ACTIVE', desc: 'Unified district emergency command center reaches coordinated deployment status.' },
      { step: 17, title: '17. NEXUS Response Completed', desc: 'Coastal perimeter stabilized; 24,500 citizens safeguarded with zero preventable loss of life.' }
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
