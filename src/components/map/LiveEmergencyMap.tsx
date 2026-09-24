'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEmergency } from '@/context/EmergencyContext';
import { Incident, ResourceUnit, MedicalFacility, ReliefShelter, IoTSensor } from '@/types';
import { 
  ShieldAlert, 
  Truck, 
  Hospital, 
  Home, 
  Radio, 
  Navigation, 
  AlertTriangle,
  Info
} from 'lucide-react';

// Controller component to smoothly pan/zoom map when coordinates change in state
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

// Generate custom SVG DivIcon for Incidents
const createIncidentIcon = (severity: string, hazardType: string) => {
  const isCritical = severity === 'CRITICAL';
  const color = isCritical ? '#EF4444' : severity === 'HIGH' ? '#F59E0B' : '#3B82F6';
  
  return L.divIcon({
    className: 'custom-incident-marker',
    html: `
      <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${color}; opacity: 0.25; animation: beacon-pulse 2s infinite;"></div>
        <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: #0B1226; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px ${color};">
          <span style="font-size: 13px;">${hazardType === 'flood' ? '🌊' : hazardType === 'fire' ? '🔥' : hazardType === 'industrial_gas_leak' ? '☣️' : hazardType === 'landslide' ? '⛰️' : '⚠️'}</span>
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
};

// Custom DivIcons for resources
const createResourceIcon = (type: string, status: string) => {
  const isDispatched = status === 'DISPATCHED';
  const color = isDispatched ? '#00F0FF' : '#10B981';
  
  return L.divIcon({
    className: 'custom-resource-marker',
    html: `
      <div style="width: 24px; height: 24px; border-radius: 6px; background: #0B1226; border: 1.5px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${color}60;">
        <span style="font-size: 12px;">${type === 'AMBULANCE' ? '🚑' : '🚒'}</span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const createHospitalIcon = () => {
  return L.divIcon({
    className: 'custom-hospital-marker',
    html: `
      <div style="width: 22px; height: 22px; border-radius: 50%; background: #0B1226; border: 1.5px solid #EF4444; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(239,68,68,0.4);">
        <span style="font-size: 11px; font-weight: bold; color: #EF4444;">H</span>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  });
};

const createShelterIcon = () => {
  return L.divIcon({
    className: 'custom-shelter-marker',
    html: `
      <div style="width: 22px; height: 22px; border-radius: 50%; background: #0B1226; border: 1.5px solid #3B82F6; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(59,130,246,0.4);">
        <span style="font-size: 11px;">⛺</span>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  });
};

const createSensorIcon = (status: string) => {
  const color = status === 'CRITICAL' ? '#EF4444' : status === 'WARNING' ? '#F59E0B' : '#10B981';
  return L.divIcon({
    className: 'custom-sensor-marker',
    html: `
      <div style="width: 14px; height: 14px; border-radius: 50%; background: ${color}; border: 2px solid #0B1226; box-shadow: 0 0 8px ${color};"></div>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7],
  });
};

interface LiveEmergencyMapProps {
  onSelectIncident?: (incident: Incident) => void;
  showEvacuationRoutes?: boolean;
}

export default function LiveEmergencyMap({ onSelectIncident, showEvacuationRoutes = true }: LiveEmergencyMapProps) {
  const { 
    incidents, 
    selectedIncident, 
    setSelectedIncidentId,
    ambulances, 
    rescueTeams, 
    hospitals, 
    shelters, 
    sensors, 
    mapCenter, 
    mapZoom 
  } = useEmergency();

  // Simulated Evacuation Routes for currently focused incident
  const currentLat = selectedIncident?.coordinates.lat || 19.0688;
  const currentLng = selectedIncident?.coordinates.lng || 72.8715;

  const safeRouteCoords: [number, number][] = [
    [currentLat, currentLng],
    [currentLat + 0.005, currentLng - 0.008],
    [currentLat + 0.012, currentLng - 0.014],
    [currentLat + 0.018, currentLng - 0.020]
  ];

  const blockedRouteCoords: [number, number][] = [
    [currentLat, currentLng],
    [currentLat - 0.006, currentLng + 0.004],
    [currentLat - 0.012, currentLng + 0.009]
  ];

  return (
    <div className="relative z-0 w-full h-full rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapViewController center={mapCenter} zoom={mapZoom} />

        {/* OpenStreetMap Zero-Key Free Tiles (Styled to Dark Command Navy via CSS) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Dynamic Affected Hazard Perimeters */}
        {incidents.map((inc) => (
          <Circle
            key={`hazard-zone-${inc.id}`}
            center={[inc.coordinates.lat, inc.coordinates.lng]}
            radius={inc.affectedRadiusMeters}
            pathOptions={{
              color: inc.severity === 'CRITICAL' ? '#EF4444' : inc.severity === 'HIGH' ? '#F59E0B' : '#3B82F6',
              fillColor: inc.severity === 'CRITICAL' ? '#EF4444' : inc.severity === 'HIGH' ? '#F59E0B' : '#3B82F6',
              fillOpacity: 0.15,
              weight: 2,
              dashArray: '4, 8'
            }}
          />
        ))}

        {/* Evacuation Routes */}
        {showEvacuationRoutes && (
          <>
            {/* Safe Route (Green) */}
            <Polyline
              positions={safeRouteCoords}
              pathOptions={{ color: '#10B981', weight: 4, opacity: 0.85 }}
            />
            {/* Blocked Inundated Route (Red Dashed) */}
            <Polyline
              positions={blockedRouteCoords}
              pathOptions={{ color: '#EF4444', weight: 4, opacity: 0.8, dashArray: '6, 8' }}
            />
          </>
        )}

        {/* Incident Markers */}
        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.coordinates.lat, inc.coordinates.lng]}
            icon={createIncidentIcon(inc.severity, inc.hazardType)}
            eventHandlers={{
              click: () => {
                setSelectedIncidentId(inc.id);
                if (onSelectIncident) onSelectIncident(inc);
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">{inc.code}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    inc.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {inc.severity}
                  </span>
                </div>
                <h5 className="font-bold text-white mb-1">{inc.title}</h5>
                <p className="text-slate-300 text-[11px] mb-2">{inc.locationName}</p>
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-slate-700 pt-1 text-slate-400">
                  <span>Risk: <strong className="text-red-400">{inc.riskScore}/100</strong></span>
                  <span>Pop: <strong>{inc.populationAtRisk.toLocaleString()}</strong></span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Ambulance Markers */}
        {ambulances.map((amb) => (
          <Marker
            key={amb.id}
            position={[amb.coordinates.lat, amb.coordinates.lng]}
            icon={createResourceIcon(amb.type, amb.status)}
          >
            <Popup>
              <div className="p-2 text-xs min-w-[180px]">
                <div className="font-bold text-cyan-300 mb-0.5">{amb.callSign}</div>
                <div className="text-[10px] font-mono text-slate-400 mb-1">Status: {amb.status}</div>
                <div className="text-[11px] text-slate-300">ETA: {amb.etaMinutes} mins ({amb.distanceKm} km)</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rescue Team Markers */}
        {rescueTeams.map((res) => (
          <Marker
            key={res.id}
            position={[res.coordinates.lat, res.coordinates.lng]}
            icon={createResourceIcon(res.type, res.status)}
          >
            <Popup>
              <div className="p-2 text-xs min-w-[180px]">
                <div className="font-bold text-amber-300 mb-0.5">{res.callSign}</div>
                <div className="text-[10px] font-mono text-slate-400 mb-1">Personnel: {res.personnelCount}</div>
                <div className="text-[11px] text-slate-300">Base: {res.baseStation}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hospital Markers */}
        {hospitals.map((hosp) => (
          <Marker
            key={hosp.id}
            position={[hosp.coordinates.lat, hosp.coordinates.lng]}
            icon={createHospitalIcon()}
          >
            <Popup>
              <div className="p-2 text-xs min-w-[190px]">
                <div className="font-bold text-red-300 mb-0.5">{hosp.name}</div>
                <div className="text-[10px] font-mono text-slate-300">Available Beds: {hosp.availableBeds} / {hosp.totalBeds}</div>
                <div className="text-[10px] font-mono text-emerald-400">ICU Available: {hosp.icuBedsAvailable}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Shelter Markers */}
        {shelters.map((sh) => (
          <Marker
            key={sh.id}
            position={[sh.coordinates.lat, sh.coordinates.lng]}
            icon={createShelterIcon()}
          >
            <Popup>
              <div className="p-2 text-xs min-w-[190px]">
                <div className="font-bold text-blue-300 mb-0.5">{sh.name}</div>
                <div className="text-[10px] font-mono text-slate-300">Capacity: {sh.currentOccupancy} / {sh.capacity}</div>
                <div className="text-[10px] font-mono text-cyan-300">Food Rations: {sh.foodSuppliesDays} Days</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* IoT Sensor Markers */}
        {sensors.map((sn) => (
          <Marker
            key={sn.id}
            position={[sn.coordinates.lat, sn.coordinates.lng]}
            icon={createSensorIcon(sn.status)}
          >
            <Popup>
              <div className="p-2 text-xs min-w-[180px]">
                <div className="font-bold text-slate-200 mb-0.5">{sn.name}</div>
                <div className="text-[11px] text-cyan-300 font-mono">{sn.metricLabel}: {sn.currentValue} {sn.unit}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Status: {sn.status} (Batt: {sn.batteryLevel}%)</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] glass-panel rounded-xl p-2.5 text-[10px] font-mono border border-slate-700/80 bg-navy-950/90 text-slate-300 space-y-1 shadow-lg pointer-events-auto">
        <div className="font-bold text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Navigation className="w-3 h-3 text-cyan-400" />
          GEO-INTELLIGENCE LAYERS
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span>Critical Hazard Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Safe Evacuation Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Tactical Fleet (Ambulance/Boat)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>IoT Sensor Node</span>
        </div>
      </div>
    </div>
  );
}
