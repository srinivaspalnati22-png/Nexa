'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info, HelpCircle } from 'lucide-react';

interface NexusRiskGaugeProps {
  score: number; // 0-100
  factors: {
    hazard: number;
    population: number;
    infrastructure: number;
    weather: number;
    accessibility: number;
  };
}

export default function NexusRiskGauge({ score, factors }: NexusRiskGaugeProps) {
  const getLevel = (s: number) => {
    if (s >= 76) return { label: 'CRITICAL', color: '#EF4444', textColor: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    if (s >= 51) return { label: 'HIGH', color: '#F59E0B', textColor: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    if (s >= 26) return { label: 'MODERATE', color: '#3B82F6', textColor: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    return { label: 'LOW', color: '#10B981', textColor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
  };

  const currentLevel = getLevel(score);

  // SVG Circular Gauge calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const factorList = [
    { label: 'Hazard Severity', value: factors.hazard, weight: '30%', impact: 'Active hydrodynamic inundation' },
    { label: 'Population Exposure', value: factors.population, weight: '25%', impact: 'High residential density in basin' },
    { label: 'Infrastructure Fragility', value: factors.infrastructure, weight: '20%', impact: 'Flooded electrical substations' },
    { label: 'Weather Instability', value: factors.weather, weight: '15%', impact: '142mm/h convective cloudburst' },
    { label: 'Egress / Accessibility', value: factors.accessibility, weight: '10%', impact: 'LBS Marg arterial road severed' },
  ];

  return (
    <div className="glass-panel rounded-2xl border border-cyan-500/20 p-4 bg-navy-950/80 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
            NEXUS RISK INDEX (0–100)
          </h4>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${currentLevel.bg} ${currentLevel.textColor} ${currentLevel.border}`}>
          {currentLevel.label} THREAT
        </span>
      </div>

      {/* Circular Gauge Center Display */}
      <div className="py-4 flex flex-col sm:flex-row items-center justify-around gap-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            {/* Background Ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#1E293B"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Gauge Ring */}
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              stroke={currentLevel.color}
              strokeWidth="10"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-heading font-extrabold text-3xl text-slate-100">
              {score}
            </span>
            <span className={`text-[10px] font-mono font-bold tracking-widest ${currentLevel.textColor}`}>
              {currentLevel.label}
            </span>
            <span className="text-[9px] font-mono text-slate-500">INDEX SCORE</span>
          </div>
        </div>

        {/* Explainable AI (XAI) Attribution Breakdown */}
        <div className="flex-1 w-full space-y-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>EXPLAINABLE AI ATTRIBUTION</span>
            <span className="text-cyan-400">WHY IS RISK HIGH?</span>
          </div>

          <div className="space-y-1.5">
            {factorList.map((f, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between items-center text-[11px] mb-0.5">
                  <span className="text-slate-300 font-sans">{f.label}</span>
                  <span className="font-mono font-bold text-slate-200">{f.value}/100</span>
                </div>
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full ${
                      f.value > 85 ? 'bg-red-500' : f.value > 70 ? 'bg-amber-400' : 'bg-cyan-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threshold Guide */}
      <div className="pt-2 border-t border-slate-800/80 grid grid-cols-4 gap-1 text-center font-mono text-[9px]">
        <div className="p-1 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900">0-25 LOW</div>
        <div className="p-1 rounded bg-blue-950/40 text-blue-400 border border-blue-900">26-50 MOD</div>
        <div className="p-1 rounded bg-amber-950/40 text-amber-400 border border-amber-900">51-75 HIGH</div>
        <div className="p-1 rounded bg-red-950/40 text-red-400 border border-red-900">76-100 CRIT</div>
      </div>
    </div>
  );
}
