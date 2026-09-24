'use client';

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Map, 
  Users, 
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function DocsPage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/NEXUS_AI_PLATFORM_DOCUMENTATION.md';
    link.download = 'NEXUS_AI_PLATFORM_DOCUMENTATION.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 py-4">
        {/* Header Ribbon */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-navy-950/90 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800">
              OFFICIAL SYSTEM WHITEPAPER & SPECIFICATION
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100">
              NEXUS AI 2.0 Platform Dossier
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Comprehensive architectural whitepaper, problem statements, solutions, and operational guidelines.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="py-3 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD WHITEPAPER (.MD)</span>
          </button>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl glass-panel bg-navy-950/70 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-100">The Problem</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              20–45 min verification latency, single-point-of-failure cloud network dependency, and linguistic barriers during crisis triage.
            </p>
          </div>

          <div className="p-5 rounded-3xl glass-panel bg-navy-950/70 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-100">The Solution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              5-vector AI verification matrix, deterministic AI Commander with human-in-the-loop safety, and fault-tolerant offline operation.
            </p>
          </div>

          <div className="p-5 rounded-3xl glass-panel bg-navy-950/70 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-100">Key Differentiators</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multilingual voice (5 languages), 3D WebGL Digital Twin, explainable risk scoring (0-100), and automated 17-step demo simulation.
            </p>
          </div>
        </div>

        {/* Full Markdown Preview Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-navy-950/80 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          <div>
            <h2 className="font-heading font-bold text-lg text-slate-100 border-b border-slate-800 pb-2 mb-3">
              1. Project Vision & Identity
            </h2>
            <p>
              <strong>NEXUS AI 2.0</strong> is an autonomous multi-hazard emergency intelligence platform designed for state disaster authorities, municipal command centers, and emergency services. It transforms raw sensor signals into verified incident assessments, predictive risk models, and coordinated resource deployments.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-lg text-slate-100 border-b border-slate-800 pb-2 mb-3">
              2. Core Product Principle: The Intelligence Loop
            </h2>
            <div className="p-3 rounded-xl bg-navy-900/80 border border-cyan-500/30 font-mono text-cyan-300 text-xs text-center">
              SIGNAL ──► DETECT ──► VERIFY ──► PREDICT ──► ASSESS ──► DECIDE ──► COORDINATE ──► RESPOND ──► MONITOR ──► LEARN
            </div>
          </div>

          <div>
            <h2 className="font-heading font-bold text-lg text-slate-100 border-b border-slate-800 pb-2 mb-3">
              3. Technology Stack
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 font-mono text-xs">
              <li><strong>Frontend:</strong> Next.js 14 (App Router), React 18, TypeScript Strict Mode</li>
              <li><strong>Styling & Motion:</strong> Tailwind CSS, Framer Motion, Lucide React</li>
              <li><strong>Geospatial & 3D:</strong> Leaflet (Zero-Key OpenStreetMap with Dark Mode CSS), Three.js WebGL</li>
              <li><strong>Data Visualization:</strong> Recharts (70-minute predictive evolution, response latency trends)</li>
              <li><strong>Backend Service:</strong> Python 3.14, FastAPI, Pydantic v2, WebSockets, OpenCV</li>
              <li><strong>Offline & Voice:</strong> Web Speech API (EN, TE, HI, TA, KN), LocalStorage/IndexedDB offline queue</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">
              Format: GitHub Flavored Markdown (.md)
            </span>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              Download Full File
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
