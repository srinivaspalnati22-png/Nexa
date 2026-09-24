'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import MapWrapper from '@/components/map/MapWrapper';
import IncidentDrawer from '@/components/incident/IncidentDrawer';
import { useEmergency } from '@/context/EmergencyContext';
import { Incident } from '@/types';
import { Map, Layers, Navigation, ShieldAlert, Sparkles } from 'lucide-react';

export default function FullscreenMapPage() {
  const { incidents } = useEmergency();
  const [drawerIncident, setDrawerIncident] = useState<Incident | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);

  const handleSelectIncident = (inc: Incident) => {
    setDrawerIncident(inc);
    setDrawerOpen(true);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col space-y-3">
        {/* Map Toolbar */}
        <div className="glass-panel rounded-2xl p-3 border border-cyan-500/20 bg-navy-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-slate-100">
                Tactical GIS Emergency Command Map
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                CARTO DARK MATTER SATELLITE TILES • HIGH-RESOLUTION TELEMETRY
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                showRoutes 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                  : 'bg-navy-900 border-slate-700 text-slate-400'
              }`}
            >
              {showRoutes ? 'Evacuation Routes: ON' : 'Evacuation Routes: OFF'}
            </button>
          </div>
        </div>

        {/* Full Interactive Map Container */}
        <div className="flex-1 rounded-3xl overflow-hidden border border-cyan-500/20 relative shadow-2xl">
          <MapWrapper
            onSelectIncident={handleSelectIncident}
            showEvacuationRoutes={showRoutes}
          />
        </div>
      </div>

      {/* Incident Details Drawer */}
      <IncidentDrawer
        incident={drawerIncident}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </AppLayout>
  );
}
