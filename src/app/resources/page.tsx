'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useEmergency } from '@/context/EmergencyContext';
import { ResourceUnit } from '@/types';
import DispatchModal from '@/components/resources/DispatchModal';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Send, 
  Filter,
  Search,
  Activity,
  PhoneCall
} from 'lucide-react';

export default function ResourcesPage() {
  const { ambulances, rescueTeams, selectedIncident, dispatchResource } = useEmergency();
  const [activeTab, setActiveTab] = useState<'ALL' | 'AMBULANCE' | 'RESCUE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedUnit, setSelectedUnit] = useState<ResourceUnit | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const allUnits = [...ambulances, ...rescueTeams];

  const filteredUnits = allUnits.filter(u => {
    const matchesTab = activeTab === 'ALL' || 
      (activeTab === 'AMBULANCE' && u.type === 'AMBULANCE') || 
      (activeTab === 'RESCUE' && (u.type === 'RESCUE_TEAM' || u.type === 'FIRE_TRUCK'));
    const matchesSearch = u.callSign.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.baseStation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDispatchClick = (unit: ResourceUnit) => {
    setSelectedUnit(unit);
    setModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                Resource Orchestrator & Tactical Fleet
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                AI-assisted resource proximity matching, dispatch authorization, and capacity monitoring
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
            TOTAL UNITS: {filteredUnits.length}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 bg-navy-950/80 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search callsign or base station..."
              className="w-full bg-navy-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            {(['ALL', 'AMBULANCE', 'RESCUE'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === tab
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold'
                    : 'bg-navy-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Units Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnits.map((unit) => {
            const isDispatched = unit.status === 'DISPATCHED';

            return (
              <div
                key={unit.id}
                className="glass-panel rounded-3xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between bg-navy-950/70"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-base text-slate-100">
                      {unit.callSign}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isDispatched 
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' 
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    }`}>
                      {unit.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-slate-300 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">TYPE:</span>
                      <span className="text-slate-200">{unit.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">BASE STATION:</span>
                      <span className="text-slate-200 truncate">{unit.baseStation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PERSONNEL:</span>
                      <span className="text-slate-200">{unit.personnelCount} Tactical Specialists</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ESTIMATED ETA:</span>
                      <span className="text-amber-300 font-bold">{unit.etaMinutes || 6} MINS ({unit.distanceKm || 2.4} KM)</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={`tel:${unit.contactNumber}`}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{unit.contactNumber}</span>
                  </a>

                  <button
                    onClick={() => handleDispatchClick(unit)}
                    disabled={isDispatched}
                    className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      isDispatched
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>{isDispatched ? 'COMMITTED' : 'DISPATCH UNIT'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <DispatchModal
        unit={selectedUnit}
        incidentCode={selectedIncident?.code || 'NX-2048'}
        incidentTitle={selectedIncident?.title || 'Active Hazard'}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedUnit && selectedIncident) {
            dispatchResource(selectedIncident.id, selectedUnit.id);
          }
        }}
      />
    </AppLayout>
  );
}
