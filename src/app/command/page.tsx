'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import MapWrapper from '@/components/map/MapWrapper';
import AIEmergencyCommander from '@/components/commander/AIEmergencyCommander';
import NexusRiskGauge from '@/components/risk/NexusRiskGauge';
import PredictiveRiskChart from '@/components/risk/PredictiveRiskChart';
import IncidentDrawer from '@/components/incident/IncidentDrawer';
import { useEmergency } from '@/context/EmergencyContext';
import { DEMO_SCENARIOS } from '@/data/demoData';
import { Incident } from '@/types';
import { 
  Play, 
  Layers, 
  Compass, 
  ShieldAlert, 
  Sparkles, 
  Activity,
  Flame,
  Droplets,
  AlertTriangle,
  Sliders,
  Filter
} from 'lucide-react';

export default function CommandPage() {
  const { 
    selectedIncident, 
    setSelectedIncidentId, 
    incidents, 
    playScenario, 
    activeScenarioId,
    startLiveDemo,
    isDemoRunning
  } = useEmergency();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerIncident, setDrawerIncident] = useState<Incident | null>(null);

  const handleSelectIncident = (inc: Incident) => {
    setDrawerIncident(inc);
    setDrawerOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Scenario Quick Selector Banner */}
        <div className="glass-panel rounded-2xl p-3.5 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 bg-navy-950/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                TACTICAL DEMO SCENARIOS
              </span>
              <h2 className="font-heading font-bold text-sm text-slate-100">
                Multi-Hazard Response Simulations
              </h2>
            </div>
          </div>

          {/* 5 Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {DEMO_SCENARIOS.map((sc) => {
              const isActive = activeScenarioId === sc.id || (selectedIncident?.hazardType === sc.hazardType && !activeScenarioId);
              return (
                <button
                  key={sc.id}
                  onClick={() => playScenario(sc.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'bg-navy-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300'
                  }`}
                >
                  <Play className={`w-3 h-3 ${isActive ? 'text-cyan-400 fill-cyan-400' : 'text-slate-400'}`} />
                  <span>{sc.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Command Center Core Grid: Center Map & Right AI Commander */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 min-h-[580px]">
          {/* CENTER: Live Emergency GIS Map */}
          <div className="xl:col-span-8 flex flex-col h-[580px] xl:h-auto min-h-[500px]">
            <div className="flex-1 relative">
              <MapWrapper onSelectIncident={handleSelectIncident} />
            </div>
          </div>

          {/* RIGHT: AI Emergency Commander Panel */}
          <div className="xl:col-span-4 flex flex-col min-h-[500px]">
            <AIEmergencyCommander incident={selectedIncident} />
          </div>
        </div>

        {/* Real-Time Risk Intelligence: Gauge & Predictive Diffusion Forecast */}
        {selectedIncident && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <NexusRiskGauge
                score={selectedIncident.riskScore}
                factors={selectedIncident.riskFactors}
              />
            </div>
            <div className="lg:col-span-7">
              <PredictiveRiskChart
                forecast={selectedIncident.predictiveForecast}
                hazardType={selectedIncident.hazardType}
              />
            </div>
          </div>
        )}
      </div>

      {/* Incident Detail Drawer */}
      <IncidentDrawer
        incident={drawerIncident}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </AppLayout>
  );
}
