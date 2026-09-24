'use client';

import React from 'react';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  Users, 
  AlertTriangle, 
  Truck, 
  Hospital, 
  Home, 
  Clock, 
  Activity, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomTelemetryBar() {
  const { incidents, ambulances, rescueTeams, hospitals, shelters } = useEmergency();

  const totalPopAtRisk = incidents.reduce((acc, curr) => acc + curr.populationAtRisk, 0);
  const activeIncidents = incidents.filter(i => i.status === 'ACTIVE' || i.status === 'DETECTED').length;
  const criticalIncidents = incidents.filter(i => i.severity === 'CRITICAL').length;
  const availableAmbulances = ambulances.filter(a => a.status === 'AVAILABLE').length;
  const availableRescue = rescueTeams.filter(r => r.status === 'AVAILABLE').length;
  const totalBedsAvailable = hospitals.reduce((acc, curr) => acc + curr.availableBeds, 0);
  const totalShelterCap = shelters.reduce((acc, curr) => acc + (curr.capacity - curr.currentOccupancy), 0);

  const metrics = [
    {
      label: 'ACTIVE HAZARDS',
      value: `${criticalIncidents} CRIT / ${activeIncidents} ACT`,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      label: 'POPULATION AT RISK',
      value: totalPopAtRisk.toLocaleString(),
      icon: Users,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      label: 'TACTICAL FLEET',
      value: `${availableAmbulances + availableRescue} READY`,
      sub: `${availableAmbulances} Amb • ${availableRescue} Rescue`,
      icon: Truck,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      label: 'TRAUMA BEDS',
      value: `${totalBedsAvailable} VACANT`,
      icon: Hospital,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      label: 'SHELTER SURGE',
      value: `${totalShelterCap} SLOTS`,
      icon: Home,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      label: 'AVG DISPATCH TIME',
      value: '08m 42s',
      sub: '-34% Target',
      icon: Clock,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    }
  ];

  return (
    <div className="w-full glass-panel border-t border-blue-500/20 px-4 py-2.5 bg-navy-950/90 z-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl border ${m.bgColor} ${m.borderColor} flex items-center space-x-2.5 transition-all hover:border-cyan-500/40`}
            >
              <div className={`p-1.5 rounded-lg bg-navy-900/80 ${m.color} flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider truncate">
                  {m.label}
                </div>
                <div className={`font-heading font-bold text-xs sm:text-sm ${m.color} truncate`}>
                  {m.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
