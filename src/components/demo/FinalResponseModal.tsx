'use client';

import React from 'react';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Truck, 
  Navigation, 
  Clock, 
  TrendingDown, 
  FileText, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FinalResponseModal() {
  const { isDemoCompleted, stopLiveDemo, setSelectedIncidentId } = useEmergency();

  if (!isDemoCompleted) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass-panel w-full max-w-xl rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.25)] bg-navy-950/95"
      >
        {/* Celebration Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 mb-2">
            MISSION DIRECTIVE CONCLUDED
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100">
            NEXUS RESPONSE COMPLETED
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
            Autonomous emergency intelligence loop successfully verified, isolated, and dispatched multi-agency units to stabilize the incident.
          </p>
        </div>

        {/* 5 Response Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 text-center">
            <div className="flex justify-center mb-1">
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="font-heading font-bold text-xl sm:text-2xl text-slate-100">
              8,421
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Population Protected
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 text-center">
            <div className="flex justify-center mb-1">
              <Truck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-heading font-bold text-xl sm:text-2xl text-slate-100">
              17
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Resources Deployed
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 text-center">
            <div className="flex justify-center mb-1">
              <Navigation className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="font-heading font-bold text-xl sm:text-2xl text-slate-100">
              6
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Emergency Routes
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 text-center">
            <div className="flex justify-center mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-heading font-bold text-xl sm:text-2xl text-slate-100">
              08:42
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Avg Response Time
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800 text-center col-span-2 sm:col-span-2">
            <div className="flex justify-center mb-1">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-400">
              -64% REDUCTION
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Simulated Hazard Risk Index
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/incidents/inc-001"
            onClick={() => {
              setSelectedIncidentId('inc-001');
              stopLiveDemo();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            <FileText className="w-4 h-4" />
            VIEW INCIDENT REPORT
          </Link>

          <button
            onClick={stopLiveDemo}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            CLOSE DEMO
          </button>
        </div>
      </motion.div>
    </div>
  );
}
