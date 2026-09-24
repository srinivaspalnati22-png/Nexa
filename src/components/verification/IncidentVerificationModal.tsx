'use client';

import React from 'react';
import { Incident, VerificationCheck } from '@/types';
import { 
  CheckCircle2, 
  Clock, 
  X, 
  ShieldCheck, 
  Cpu, 
  Camera, 
  Radio, 
  CloudRain, 
  History, 
  Users,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface IncidentVerificationModalProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

export default function IncidentVerificationModal({
  incident,
  isOpen,
  onClose,
  onVerify
}: IncidentVerificationModalProps) {
  if (!isOpen || !incident) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'citizen_report': return <Users className="w-4 h-4 text-cyan-400" />;
      case 'cctv_vision': return <Camera className="w-4 h-4 text-blue-400" />;
      case 'sensor_anomaly': return <Radio className="w-4 h-4 text-amber-400" />;
      case 'weather_feed': return <CloudRain className="w-4 h-4 text-indigo-400" />;
      case 'historical_pattern': return <History className="w-4 h-4 text-purple-400" />;
      default: return <Cpu className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel w-full max-w-2xl rounded-2xl border border-cyan-500/40 p-6 shadow-2xl bg-navy-950/95 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                AI Incident Verification Matrix
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                  {incident.verificationConfidence}% CONFIDENCE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Cross-checking 5 autonomous intelligence streams for [{incident.code}]
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Summary Ribbon */}
        <div className="py-4">
          <div className="p-3.5 rounded-xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">INCIDENT TITLE</span>
              <div className="font-heading font-bold text-slate-100 text-sm">{incident.title}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">STATUS</span>
              <div className="font-mono font-bold text-emerald-400 text-sm flex items-center gap-1.5 justify-end">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {incident.status === 'VERIFIED' || incident.status === 'ACTIVE' ? 'AI VERIFIED' : 'CROSS-CHECK IN PROGRESS'}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Evidence Check Cards */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mb-4">
          {incident.verificationChecks.map((check) => (
            <div
              key={check.id}
              className="p-3 rounded-xl bg-navy-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start space-x-3 text-xs"
            >
              <div className="p-2 rounded-lg bg-slate-800/80 mt-0.5">
                {getSourceIcon(check.source)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading font-bold text-slate-200 text-xs sm:text-sm">
                    {check.label}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    {check.confidence}% MATCH
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {check.evidence}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-[10px] font-mono text-slate-400">
                  <span>Detected: {check.timestamp}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Integrity Validated
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">
            Automated verification prevents dispatch hallucinations
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-heading font-bold uppercase transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onVerify();
                onClose();
              }}
              className="py-2 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-heading font-bold uppercase shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Re-Verify Telemetry
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
