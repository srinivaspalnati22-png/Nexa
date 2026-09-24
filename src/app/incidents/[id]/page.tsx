'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { useEmergency } from '@/context/EmergencyContext';
import NexusRiskGauge from '@/components/risk/NexusRiskGauge';
import PredictiveRiskChart from '@/components/risk/PredictiveRiskChart';
import AIEmergencyCommander from '@/components/commander/AIEmergencyCommander';
import MapWrapper from '@/components/map/MapWrapper';
import { 
  ShieldAlert, 
  MapPin, 
  Users, 
  Clock, 
  Radio, 
  CheckCircle2, 
  ArrowLeft, 
  Layers, 
  Navigation, 
  CloudRain, 
  Truck, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function IncidentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { incidents, ambulances, rescueTeams, hospitals, shelters } = useEmergency();

  const incidentId = (params?.id as string) || 'inc-001';
  const incident = incidents.find(i => i.id === incidentId) || incidents[0];

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'RISK' | 'COMMANDER' | 'TIMELINE' | 'EVIDENCE' | 'RESOURCES'>('OVERVIEW');

  if (!incident) {
    return (
      <AppLayout>
        <div className="p-8 text-center text-slate-400 font-mono">
          INCIDENT DOSSIER NOT FOUND
        </div>
      </AppLayout>
    );
  }

  const tabs = [
    { id: 'OVERVIEW', label: 'Dossier Overview' },
    { id: 'RISK', label: 'Risk & Prediction' },
    { id: 'COMMANDER', label: 'AI Commander' },
    { id: 'TIMELINE', label: 'Event Timeline' },
    { id: 'EVIDENCE', label: 'Verification Evidence' },
    { id: 'RESOURCES', label: 'Tactical Units' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Link href="/command" className="hover:text-cyan-300">Command Center</Link>
            <span>/</span>
            <Link href="/incidents" className="hover:text-cyan-300">Incidents</Link>
            <span>/</span>
            <span className="text-cyan-400 font-bold">{incident.code}</span>
          </div>
        </div>

        {/* Master Incident Header */}
        <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-navy-950/90 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <span className="font-mono text-cyan-300 font-bold text-sm px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                INCIDENT #{incident.code}
              </span>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded font-bold ${
                incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300'
              }`}>
                STATUS: {incident.severity}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {incident.status}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100">
              {incident.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              {incident.locationName}
            </p>
          </div>

          {/* Quick Header KPIs */}
          <div className="flex items-center gap-3 font-mono text-center">
            <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 min-w-[90px]">
              <span className="text-[10px] text-slate-400 uppercase block">Risk Score</span>
              <span className="font-heading font-bold text-xl text-red-400">{incident.riskScore}/100</span>
            </div>
            <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 min-w-[90px]">
              <span className="text-[10px] text-slate-400 uppercase block">Population</span>
              <span className="font-heading font-bold text-xl text-slate-100">{incident.populationAtRisk.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 min-w-[90px]">
              <span className="text-[10px] text-slate-400 uppercase block">AI Verify</span>
              <span className="font-heading font-bold text-xl text-emerald-400">{incident.verificationConfidence}%</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-navy-950 text-xs font-heading font-bold overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[450px]">
          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <div className="h-80 rounded-2xl overflow-hidden border border-slate-800">
                  <MapWrapper />
                </div>

                <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-navy-950/80 space-y-3">
                  <h3 className="font-heading font-bold text-base text-slate-100">
                    Hydrological & Meteorological Telemetry
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Precipitation</span>
                      <strong className="text-cyan-300 text-sm">{incident.weather.rainfall} mm/h</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Wind Velocity</span>
                      <strong className="text-cyan-300 text-sm">{incident.weather.windSpeed} km/h</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Temperature</span>
                      <strong className="text-cyan-300 text-sm">{incident.weather.temp}°C</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-navy-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Humidity</span>
                      <strong className="text-cyan-300 text-sm">{incident.weather.humidity}%</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <NexusRiskGauge score={incident.riskScore} factors={incident.riskFactors} />
              </div>
            </div>
          )}

          {activeTab === 'RISK' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <NexusRiskGauge score={incident.riskScore} factors={incident.riskFactors} />
              </div>
              <div className="lg:col-span-7">
                <PredictiveRiskChart forecast={incident.predictiveForecast} hazardType={incident.hazardType} />
              </div>
            </div>
          )}

          {activeTab === 'COMMANDER' && (
            <div className="max-w-4xl mx-auto">
              <AIEmergencyCommander incident={incident} />
            </div>
          )}

          {activeTab === 'TIMELINE' && (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-navy-950/80 max-w-4xl mx-auto space-y-6">
              <h3 className="font-heading font-bold text-base text-slate-100 uppercase tracking-wider">
                Full Incident Progression & Audit Log
              </h3>
              <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                {incident.timeline.map((event) => (
                  <div key={event.id} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-navy-950 shadow-[0_0_10px_rgba(0,240,255,0.8)]"></span>
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-between mb-1">
                      <span>{event.timestamp}</span>
                      <span className="text-cyan-300 font-bold">{event.source}</span>
                    </div>
                    <p className="text-sm text-slate-200 font-sans">{event.event}</p>
                    {event.actionTaken && (
                      <div className="mt-1 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Action: {event.actionTaken}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'EVIDENCE' && (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-navy-950/80 max-w-4xl mx-auto space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-100 uppercase tracking-wider mb-2">
                Multi-Stream Cross-Verification Evidence Matrix
              </h3>
              <div className="space-y-3">
                {incident.verificationChecks.map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 flex items-start justify-between">
                    <div>
                      <div className="font-heading font-bold text-slate-100 text-sm mb-1">{v.label}</div>
                      <p className="text-xs text-slate-300">{v.evidence}</p>
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">Logged: {v.timestamp}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                      {v.confidence}% MATCH
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'RESOURCES' && (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 bg-navy-950/80 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-100 uppercase tracking-wider mb-2">
                Assigned Fleet Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {incident.assignedResources.map((resId) => (
                  <div key={resId} className="p-4 rounded-2xl bg-navy-900/70 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between items-center text-cyan-300 font-bold">
                      <span>{resId.toUpperCase()}</span>
                      <span className="text-emerald-400">DISPATCHED</span>
                    </div>
                    <div className="text-slate-400">Tactical Emergency Response Unit</div>
                    <div className="text-slate-500 text-[10px]">Priority radio link secured</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
