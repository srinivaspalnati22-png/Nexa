'use client';

import React, { useState } from 'react';
import { Incident } from '@/types';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Users, 
  Clock, 
  Radio, 
  CheckCircle2, 
  Navigation, 
  ExternalLink,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface IncidentDrawerProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IncidentDrawer({ incident, isOpen, onClose }: IncidentDrawerProps) {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TIMELINE' | 'SENSORS' | 'ACTIONS'>('OVERVIEW');
  const { verifyIncident } = useEmergency();

  if (!isOpen || !incident) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[9999] w-full sm:w-[480px] glass-panel bg-navy-950/95 border-l border-cyan-500/30 shadow-2xl flex flex-col">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-navy-900/60">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-cyan-400 font-bold text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
            {incident.code}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
            incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300'
          }`}>
            {incident.severity}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {incident.status}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Incident Title & Geography */}
      <div className="p-4 border-b border-slate-800/80">
        <h3 className="font-heading font-bold text-base sm:text-lg text-slate-100 mb-1">
          {incident.title}
        </h3>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          {incident.locationName}
        </p>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center font-mono">
          <div className="p-2 rounded-xl bg-navy-900/80 border border-slate-800">
            <span className="text-[9px] text-slate-400 uppercase block">Risk Score</span>
            <span className="font-bold text-red-400 text-sm">{incident.riskScore}/100</span>
          </div>
          <div className="p-2 rounded-xl bg-navy-900/80 border border-slate-800">
            <span className="text-[9px] text-slate-400 uppercase block">Civilians</span>
            <span className="font-bold text-slate-200 text-sm">{incident.populationAtRisk.toLocaleString()}</span>
          </div>
          <div className="p-2 rounded-xl bg-navy-900/80 border border-slate-800">
            <span className="text-[9px] text-slate-400 uppercase block">Radius</span>
            <span className="font-bold text-cyan-300 text-sm">{incident.affectedRadiusMeters}m</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-navy-950 text-xs font-heading font-medium">
        {(['OVERVIEW', 'TIMELINE', 'SENSORS', 'ACTIONS'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-4 text-xs">
            <div>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                METEOROLOGICAL CONDITIONS
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2.5 rounded-lg bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Precipitation</span>
                  <span className="text-cyan-300 font-bold text-xs">{incident.weather.rainfall} mm/hr</span>
                </div>
                <div className="p-2.5 rounded-lg bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Wind Velocity</span>
                  <span className="text-cyan-300 font-bold text-xs">{incident.weather.windSpeed} km/h</span>
                </div>
                <div className="p-2.5 rounded-lg bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Atmospheric Temp</span>
                  <span className="text-cyan-300 font-bold text-xs">{incident.weather.temp}°C</span>
                </div>
                <div className="p-2.5 rounded-lg bg-navy-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Weather State</span>
                  <span className="text-cyan-300 font-bold text-xs">{incident.weather.condition}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                ASSIGNED TACTICAL UNITS
              </span>
              <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800 flex flex-wrap gap-1.5">
                {incident.assignedResources.map((resId) => (
                  <span
                    key={resId}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold"
                  >
                    {resId.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'TIMELINE' && (
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
              AUTONOMOUS INCIDENT LOG
            </span>
            <div className="relative pl-4 border-l-2 border-slate-800 space-y-4">
              {incident.timeline.map((event) => (
                <div key={event.id} className="relative group">
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between mb-0.5">
                    <span>{event.timestamp}</span>
                    <span className="text-cyan-400 font-bold">{event.source}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    {event.event}
                  </p>
                  {event.actionTaken && (
                    <div className="mt-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {event.actionTaken}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'SENSORS' && (
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
              PERIMETER IOT SENSOR TELEMETRY
            </span>
            {incident.sensorReadings.map((sensor) => (
              <div
                key={sensor.sensorId}
                className="p-3 rounded-xl bg-navy-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-heading font-bold text-slate-200">{sensor.type}</div>
                  <div className="font-mono text-[10px] text-slate-400">ID: {sensor.sensorId}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-cyan-300 text-xs">{sensor.reading}</div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                    sensor.status === 'ALERT' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {sensor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ACTIONS' && (
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
              AI COMMANDER DIRECTIVES
            </span>
            {incident.recommendedActions.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-navy-900/60 border border-slate-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="text-cyan-400 font-mono">[{act.stepNumber}]</span> {act.title}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold">
                    {act.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pl-6">{act.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation Link */}
      <div className="p-4 border-t border-slate-800 bg-navy-900/80 flex items-center justify-between">
        <Link
          href={`/incidents/${incident.id}`}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          OPEN FULL INCIDENT DOSSIER
        </Link>
      </div>
    </div>
  );
}
