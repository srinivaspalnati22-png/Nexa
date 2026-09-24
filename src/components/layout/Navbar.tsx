'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  ShieldAlert, 
  Play, 
  Wifi, 
  WifiOff, 
  Mic, 
  Bell, 
  User, 
  Radio, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Layers,
  Sparkles,
  Activity
} from 'lucide-react';
import { UserRole } from '@/types';

interface NavbarProps {
  onOpenVoiceModal?: () => void;
  onOpenNotifications?: () => void;
}

export default function Navbar({ onOpenVoiceModal }: NavbarProps) {
  const { 
    userRole, 
    setUserRole, 
    networkStatus, 
    toggleNetworkFailure, 
    startLiveDemo, 
    isDemoRunning,
    notifications,
    incidents,
    citizenReports
  } = useEmergency();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const activeIncidentsCount = incidents.filter(i => i.status === 'ACTIVE' || i.status === 'DETECTED').length;
  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL').length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'OPERATOR', label: 'Emergency Operator', desc: 'Full dispatch & command access' },
    { role: 'ADMIN', label: 'Command Chief (Admin)', desc: 'Strategic planning & audit' },
    { role: 'RESPONDER', label: 'Field Tactical Unit', desc: 'Assigned units & navigation' },
    { role: 'CITIZEN', label: 'Citizen View', desc: 'Distress SOS & shelter guidance' },
  ];

  return (
    <header className="h-16 border-b border-blue-500/20 bg-navy-950/90 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between">
      {/* Brand & Live Indicator */}
      <div className="flex items-center space-x-4">
        <Link href="/command" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.25)] group-hover:border-cyan-300 transition-all">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                NEXUS AI
              </span>
              <span className="text-[10px] font-mono uppercase bg-red-500/20 border border-red-500/40 text-red-300 px-1.5 py-0.5 rounded font-bold">
                DEFCON 2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              AUTONOMOUS EMERGENCY INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Global Live Ticker Bar */}
        <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-slate-800">
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-navy-900/80 border border-slate-800 text-xs font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-slate-400">ACTIVE HAZARDS:</span>
            <span className="text-red-400 font-bold">{criticalCount} CRITICAL</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">{activeIncidentsCount} TOTAL</span>
          </div>

          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-navy-900/80 border border-slate-800 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">CITIZEN SOS:</span>
            <span className="text-amber-400 font-bold">{citizenReports.length} BEACONS</span>
          </div>
        </div>
      </div>

      {/* Action Controls & Triggers */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* SIGNATURE 17-STEP LIVE DEMO BUTTON */}
        <button
          onClick={startLiveDemo}
          disabled={isDemoRunning}
          className={`relative group px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg ${
            isDemoRunning 
              ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 cursor-wait'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
          }`}
          title="Run the automated 17-step end-to-end emergency simulation sequence"
        >
          <Play className={`w-3.5 h-3.5 ${isDemoRunning ? 'animate-spin' : 'fill-slate-950'}`} />
          <span>{isDemoRunning ? 'Simulating...' : 'RUN LIVE DEMO'}</span>
          <span className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-slate-950/30 rounded font-mono text-slate-900">
            17 STEPS
          </span>
        </button>

        {/* Multilingual Voice Assistant Button */}
        <button
          onClick={onOpenVoiceModal}
          className="p-2 rounded-lg bg-navy-900/80 hover:bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-colors relative"
          title="Multilingual AI Voice Assistant (English, Telugu, Hindi, Tamil, Kannada)"
        >
          <Mic className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        </button>

        {/* Offline Mode Simulator Toggle */}
        <button
          onClick={toggleNetworkFailure}
          className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition-colors ${
            networkStatus !== 'ONLINE'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-navy-900/80 border-slate-700 hover:border-slate-600 text-slate-300'
          }`}
          title="Simulate network outage and offline resilience"
        >
          {networkStatus === 'ONLINE' ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline text-[11px]">NET: ONLINE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold">OFFLINE</span>
            </>
          )}
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="p-2 rounded-lg bg-navy-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {unreadNotifs}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-xl shadow-2xl z-50 p-3 border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300">
                  Incident Intelligence Alerts
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  {notifications.length} EVENTS
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.slice(0, 5).map(n => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border text-xs ${
                      n.type === 'CRITICAL'
                        ? 'bg-red-950/40 border-red-500/40 text-red-200'
                        : n.type === 'WARNING'
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                        : 'bg-navy-900/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold font-heading">{n.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-navy-900/90 border border-slate-700 hover:border-slate-600 text-xs font-mono text-slate-200 transition-all"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline font-medium">{userRole}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl z-50 p-2 border border-slate-700">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
                Switch Operational Persona
              </div>
              <div className="space-y-1">
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setUserRole(r.role);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between ${
                      userRole === r.role ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold font-heading">{r.label}</div>
                      <div className="text-[10px] text-slate-400">{r.desc}</div>
                    </div>
                    {userRole === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
