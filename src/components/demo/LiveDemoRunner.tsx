'use client';

import React from 'react';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  Play, 
  Square, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  Navigation,
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveDemoRunner() {
  const { 
    isDemoRunning, 
    demoStep, 
    demoStepTitle, 
    demoStepDescription, 
    stopLiveDemo 
  } = useEmergency();

  if (!isDemoRunning) return null;

  const totalSteps = 17;
  const progressPercent = Math.round((demoStep / totalSteps) * 100);

  return (
    <div className="fixed top-20 right-6 z-[9998] w-96 max-w-[calc(100vw-2rem)]">
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        className="glass-panel rounded-2xl border-2 border-cyan-500/50 p-4 shadow-[0_0_35px_rgba(0,240,255,0.25)] bg-navy-950/95"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-cyan-300">
              SIGNATURE 17-STEP DEMO SEQUENCE
            </span>
          </div>

          <button
            onClick={stopLiveDemo}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-mono flex items-center gap-1 transition-colors"
          >
            <Square className="w-2.5 h-2.5 fill-slate-400" />
            ABORT
          </button>
        </div>

        {/* Current Step Counter & Title */}
        <div className="py-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span className="text-cyan-400 font-bold">STAGE {demoStep} / {totalSteps}</span>
            <span>{progressPercent}% COMPLETE</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
            />
          </div>

          <h4 className="font-heading font-bold text-sm text-slate-100 mb-1">
            {demoStepTitle}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {demoStepDescription}
          </p>
        </div>

        {/* Dynamic Telemetry Radar Sweep Graphic */}
        <div className="mt-2 p-2 rounded-xl bg-navy-900/80 border border-cyan-500/20 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-slate-400">PIPELINE:</span>
            <span className="text-cyan-300 uppercase font-bold">
              {demoStep <= 3 ? 'SIGNAL DETECTION' : demoStep <= 6 ? 'AI VERIFICATION' : demoStep <= 10 ? 'DECISION SYNTHESIS' : 'ORCHESTRATED RESPONSE'}
            </span>
          </div>
          <span className="text-emerald-400 animate-pulse font-bold">SYNCED</span>
        </div>
      </motion.div>
    </div>
  );
}
