'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useEmergency } from '@/context/EmergencyContext';
import { HazardType, SeverityLevel } from '@/types';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Radio,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function IncidentsDirectoryPage() {
  const { incidents, setSelectedIncidentId } = useEmergency();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'ALL'>('ALL');
  const [hazardFilter, setHazardFilter] = useState<HazardType | 'ALL'>('ALL');

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || inc.severity === severityFilter;
    const matchesHazard = hazardFilter === 'ALL' || inc.hazardType === hazardFilter;
    return matchesSearch && matchesSeverity && matchesHazard;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                Active Emergency Incidents Feed
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Real-time multi-hazard telemetry & coordinated disaster dossiers
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
            TOTAL TRACKED: {filteredIncidents.length} OF {incidents.length}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 bg-navy-950/80 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code (NX-2048), title, or location..."
              className="w-full bg-navy-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Severity Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">SEVERITY:</span>
            {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  severityFilter === sev
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold'
                    : 'bg-navy-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Incidents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIncidents.map((inc) => (
            <div
              key={inc.id}
              className="glass-panel rounded-3xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group bg-navy-950/70 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                    {inc.code}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    inc.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {inc.severity}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors mb-1">
                  {inc.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  {inc.locationName}
                </p>

                {/* Metrics ribbon */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-navy-900/60 border border-slate-800 text-center font-mono text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block">Risk</span>
                    <strong className="text-red-400">{inc.riskScore}/100</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block">Civilians</span>
                    <strong className="text-slate-200">{inc.populationAtRisk.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block">Verified</span>
                    <strong className="text-emerald-400">{inc.verificationConfidence}%</strong>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-500">
                  Updated: {inc.updatedAt}
                </span>

                <Link
                  href={`/incidents/${inc.id}`}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>VIEW DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
