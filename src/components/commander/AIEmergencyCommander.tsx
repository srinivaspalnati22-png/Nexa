'use client';

import React, { useState } from 'react';
import { Incident, ResourceUnit } from '@/types';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  Users, 
  Building2, 
  Navigation, 
  Radio, 
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Flame,
  Droplets,
  CloudRain,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import DispatchModal from '@/components/resources/DispatchModal';
import IncidentVerificationModal from '@/components/verification/IncidentVerificationModal';

interface AIEmergencyCommanderProps {
  incident: Incident | null;
}

export default function AIEmergencyCommander({ incident }: AIEmergencyCommanderProps) {
  const { ambulances, rescueTeams, dispatchResource, verifyIncident } = useEmergency();

  const [selectedUnitForDispatch, setSelectedUnitForDispatch] = useState<ResourceUnit | null>(null);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [actionFilter, setActionFilter] = useState<'ALL' | 'CRITICAL'>('ALL');

  if (!incident) {
    return (
      <div className="glass-panel rounded-2xl p-6 text-center text-slate-400">
        <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
        <p className="text-xs font-mono">SELECT AN ACTIVE INCIDENT TO ACTIVATE AI COMMANDER</p>
      </div>
    );
  }

  const handleActionClick = (targetUnitId?: string) => {
    if (!targetUnitId) return;
    const unit = ambulances.find(a => a.id === targetUnitId) || rescueTeams.find(r => r.id === targetUnitId);
    if (unit) {
      setSelectedUnitForDispatch(unit);
      setDispatchModalOpen(true);
    }
  };

  const filteredActions = actionFilter === 'ALL' 
    ? incident.recommendedActions 
    : incident.recommendedActions.filter(a => a.priority === 'CRITICAL');

  return (
    <div className="glass-panel rounded-2xl border border-cyan-500/25 p-4 flex flex-col h-full bg-navy-950/90 shadow-2xl overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-100 tracking-wide">
                AI EMERGENCY COMMANDER
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
                AUTONOMOUS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400">
              SYNTHESIZING TELEMETRY • POPULATION • RESOURCE DISPATCH
            </p>
          </div>
        </div>

        <button
          onClick={() => setVerifyModalOpen(true)}
          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
          title="Open AI Verification Matrix"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{incident.verificationConfidence}% VERIFIED</span>
        </button>
      </div>

      {/* Incident Summary Card */}
      <div className="mt-3 p-3 rounded-xl bg-navy-900/70 border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
            TACTICAL INCIDENT OVERVIEW
          </span>
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
            incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300'
          }`}>
            {incident.severity} SEVERITY
          </span>
        </div>
        <p className="text-slate-200 text-xs font-sans leading-relaxed">
          <strong className="text-white">{incident.title}:</strong> Impacting {incident.locationName}. Rainfall at {incident.weather.rainfall} mm/h with wind velocity of {incident.weather.windSpeed} km/h. Estimated {incident.populationAtRisk.toLocaleString()} civilians in direct hazard path.
        </p>
      </div>

      {/* Recommended Actions Pipeline */}
      <div className="mt-3 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Recommended Directives ({filteredActions.length})
          </span>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActionFilter('ALL')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                actionFilter === 'ALL' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActionFilter('CRITICAL')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                actionFilter === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CRITICAL ONLY
            </button>
          </div>
        </div>

        {/* Action Cards List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredActions.map((action) => {
            const isAssigned = Boolean(action.targetUnitId && incident.assignedResources.includes(action.targetUnitId));

            return (
              <div
                key={action.id}
                className="p-3 rounded-xl bg-navy-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all text-xs group"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-cyan-400 font-bold text-xs px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-800">
                      {action.stepNumber}
                    </span>
                    <span className="font-heading font-bold text-slate-100 text-xs group-hover:text-cyan-300 transition-colors">
                      {action.title}
                    </span>
                  </div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase font-bold flex-shrink-0 ${
                    action.priority === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {action.priority}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-sans mb-2 pl-7">
                  {action.description}
                </p>

                {/* Directive Action Button */}
                <div className="pl-7 flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-400">
                    CATEGORY: <span className="text-slate-200 uppercase">{action.category}</span>
                  </span>

                  {action.targetUnitId ? (
                    <button
                      onClick={() => handleActionClick(action.targetUnitId)}
                      disabled={isAssigned}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                        isAssigned
                          ? 'bg-emerald-950/70 border border-emerald-600 text-emerald-300 cursor-default'
                          : 'bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      }`}
                    >
                      {isAssigned ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>DISPATCHED</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>AUTHORIZE DISPATCH</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">
                      SYSTEM PROTOCOL
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Guardrail Notice */}
      <div className="mt-3 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          HUMAN-IN-THE-LOOP SAFETY GUARDRAILS ACTIVE
        </span>
        <span className="text-slate-500">NO UNCONFIRMED DISPATCH</span>
      </div>

      {/* Modals */}
      <DispatchModal
        unit={selectedUnitForDispatch}
        incidentCode={incident.code}
        incidentTitle={incident.title}
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        onConfirm={() => {
          if (selectedUnitForDispatch) {
            dispatchResource(incident.id, selectedUnitForDispatch.id);
          }
        }}
      />

      <IncidentVerificationModal
        incident={incident}
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        onVerify={() => verifyIncident(incident.id)}
      />
    </div>
  );
}
