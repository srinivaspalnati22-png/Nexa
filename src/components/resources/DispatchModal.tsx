'use client';

import React from 'react';
import { ResourceUnit } from '@/types';
import { 
  ShieldAlert, 
  Truck, 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DispatchModalProps {
  unit: ResourceUnit | null;
  incidentCode: string;
  incidentTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DispatchModal({
  unit,
  incidentCode,
  incidentTitle,
  isOpen,
  onClose,
  onConfirm
}: DispatchModalProps) {
  if (!isOpen || !unit) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel w-full max-w-md rounded-2xl border border-cyan-500/40 p-6 shadow-2xl bg-navy-950/95"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <Truck className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-100">
                Confirm Tactical Unit Dispatch
              </h3>
              <p className="text-[10px] font-mono text-slate-400">
                AUTHORIZATION PROTOCOL #DP-{unit.id.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Incident & Unit Details */}
        <div className="py-4 space-y-3">
          <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
              TARGET INCIDENT
            </span>
            <div className="font-heading font-bold text-slate-200 text-sm">
              [{incidentCode}] {incidentTitle}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-mono">CALLSIGN:</span>
              <span className="font-bold text-cyan-300 font-mono">{unit.callSign}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-mono">ESTIMATED ETA:</span>
              <span className="font-bold text-amber-300 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {unit.etaMinutes || 6} MINS ({unit.distanceKm || 2.4} KM)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-mono">PERSONNEL:</span>
              <span className="text-slate-200 font-mono">{unit.personnelCount} Tactical Specialists</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-mono">BASE STATION:</span>
              <span className="text-slate-200">{unit.baseStation}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Dispatching will immediately commit this unit and activate audible sirens & dynamic signal priority routes.
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-heading font-bold uppercase transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-heading font-bold uppercase shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            Authorize Dispatch
          </button>
        </div>
      </motion.div>
    </div>
  );
}
