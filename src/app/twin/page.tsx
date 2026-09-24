'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DigitalTwinView from '@/components/twin/DigitalTwinView';
import { useEmergency } from '@/context/EmergencyContext';
import { Boxes, ShieldAlert, Layers, MapPin, Activity } from 'lucide-react';

export default function DigitalTwinPage() {
  const { selectedIncident } = useEmergency();

  return (
    <AppLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col space-y-3">
        {/* Header */}
        <div className="glass-panel rounded-2xl p-3 border border-cyan-500/20 bg-navy-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-slate-100">
                Urban Emergency Digital Twin (3D WebGL)
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                SPATIAL INFRASTRUCTURE • FLOOD / PLUME PERIMETER SIMULATION
              </span>
            </div>
          </div>

          <div className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
            FOCUSED: {selectedIncident?.code || 'NX-2048'}
          </div>
        </div>

        {/* 3D Canvas Container */}
        <div className="flex-1 rounded-3xl overflow-hidden border border-cyan-500/20 relative shadow-2xl">
          <DigitalTwinView />
        </div>
      </div>
    </AppLayout>
  );
}
