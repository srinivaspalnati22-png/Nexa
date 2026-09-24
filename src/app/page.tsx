'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Radio, 
  ShieldAlert, 
  Cpu, 
  Map, 
  Truck, 
  WifiOff, 
  Mic, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Compass, 
  Boxes,
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const hazards = [
    { title: 'Urban Flash Flood', tag: 'Hydrodynamic Surge', icon: '🌊', color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40' },
    { title: 'Wildland Interface Fire', tag: 'Thermal Hotspots', icon: '🔥', color: 'border-red-500/40 text-red-400 bg-red-950/40' },
    { title: 'Chemical Plume Dispersion', tag: 'Toxic Vapor Gas', icon: '☣️', color: 'border-amber-500/40 text-amber-400 bg-amber-950/40' },
    { title: 'Arterial Landslide Collapse', tag: 'Geotechnical Shear', icon: '⛰️', color: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/40' },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: 'AI Emergency Commander',
      desc: 'Deterministic multi-vector action synthesis. Synthesizes IoT telemetry, meteorological radars, and hospital capacity into actionable directives.'
    },
    {
      icon: Radio,
      title: 'Multi-Stream Verification',
      desc: 'Autonomous cross-checking across citizen calls, CCTV vision, IoT sensors, and Doppler feeds to eliminate phantom alarms.'
    },
    {
      icon: Map,
      title: 'Geospatial Radar & GIS',
      desc: 'High-precision dark-mode tactical mapping with dynamic hazard envelopes, safe evacuation routes, and unit telematics.'
    },
    {
      icon: Boxes,
      title: 'Emergency Digital Twin',
      desc: '3D spatial simulation modeling structural elevation, flood basin depth, and drone search vectors.'
    },
    {
      icon: WifiOff,
      title: 'Offline Resilience Engine',
      desc: 'Fault-tolerant local dispatching. Seamlessly caches geographic layers and queues citizen SOS beacons during total network blackout.'
    },
    {
      icon: Mic,
      title: 'Multilingual Voice Triage',
      desc: 'Voice dispatch in 5 languages: English, Telugu, Hindi, Tamil, and Kannada with live speech waveform synthesis.'
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Top Header */}
      <header className="h-20 border-b border-blue-500/20 bg-navy-950/80 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                NEXUS AI 2.0
              </span>
              <span className="text-[10px] font-mono uppercase bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 px-1.5 py-0.5 rounded font-bold">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">
              AUTONOMOUS MULTI-HAZARD EMERGENCY PLATFORM
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/sos"
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold uppercase transition-all"
          >
            🆘 CITIZEN SOS
          </Link>
          <Link
            href="/command"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-heading font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center gap-1.5"
          >
            <span>LAUNCH COMMAND</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 lg:px-12 flex flex-col items-center text-center max-w-6xl mx-auto">
        {/* Radar Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Tagline Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>DETECT • PREDICT • DECIDE • RESPOND • SAVE LIVES</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-100 max-w-4xl leading-[1.1] mb-6">
          Autonomous Emergency Intelligence &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
            Rapid Response
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-sans">
          Built for modern disaster-response command centers. Unifying multi-hazard IoT telemetry, predictive fluid simulations, geospatial digital twins, and autonomous AI command coordination.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="/command"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <span>EXPLORE COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/simulator"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel bg-navy-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>RUN EMERGENCY SIMULATION</span>
          </Link>
        </div>

        {/* Animated Multi-Hazard Detection Signals Strip */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {hazards.map((h, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border ${h.color} glass-panel flex items-start space-x-3 transition-all hover:scale-[1.02]`}
            >
              <span className="text-2xl">{h.icon}</span>
              <div>
                <div className="font-heading font-bold text-sm text-slate-100">{h.title}</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">{h.tag}</div>
                <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Monitoring
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Core Pillars Section */}
      <section className="py-20 px-6 lg:px-12 bg-navy-900/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              NEXT-GENERATION RESILIENCE
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-100">
              The NEXUS Emergency Intelligence Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Every phase of disaster operations is automated with explainable AI models and deterministic human-in-the-loop safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-xl bg-navy-950/70"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-4 text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-100 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-12 border-t border-slate-800 bg-navy-950 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <div>
          NEXUS AI 2.0 • Autonomous Multi-Hazard Emergency Intelligence Platform
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/command" className="hover:text-cyan-400 transition-colors">Command Center</Link>
          <Link href="/map" className="hover:text-cyan-400 transition-colors">Live Map</Link>
          <Link href="/sos" className="hover:text-red-400 transition-colors">Citizen SOS</Link>
          <Link href="/simulator" className="hover:text-cyan-400 transition-colors">Simulator</Link>
        </div>
      </footer>
    </div>
  );
}
