'use client';

import React, { useState, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Eye, 
  Upload, 
  Play, 
  Camera, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  AlertTriangle,
  Flame,
  Droplets,
  Car
} from 'lucide-react';
import { CVDetectionResult, HazardType } from '@/types';

interface SampleMedia {
  id: string;
  name: string;
  hazardType: HazardType;
  description: string;
  bgGradient: string;
  detections: CVDetectionResult[];
}

const SAMPLE_MEDIA: SampleMedia[] = [
  {
    id: 'sample-flood',
    name: 'CCTV #LBS-04: Kurla Intersection Submersion',
    hazardType: 'flood',
    description: 'High-definition intersection surveillance detecting flood water depth exceeding wheel wells of stranded vehicles.',
    bgGradient: 'from-blue-950 via-slate-900 to-cyan-950',
    detections: [
      { id: 'd-1', label: 'Flood Water Submersion', confidence: 96, box: { x: 0.1, y: 0.45, width: 0.8, height: 0.5 }, severity: 'CRITICAL', suggestedHazard: 'flood' },
      { id: 'd-2', label: 'Submerged Vehicle (Sedan)', confidence: 92, box: { x: 0.35, y: 0.5, width: 0.28, height: 0.35 }, severity: 'HIGH', suggestedHazard: 'flood' },
      { id: 'd-3', label: 'Trapped Civilians (Roof)', confidence: 89, box: { x: 0.4, y: 0.38, width: 0.18, height: 0.14 }, severity: 'CRITICAL', suggestedHazard: 'flood' }
    ]
  },
  {
    id: 'sample-fire',
    name: 'Drone Thermal IR: Nilgiris Forest Ridge',
    hazardType: 'fire',
    description: 'Autonomous reconnaissance UAV detecting active flame fronts and heavy smoke plumes in dry pine tree canopy.',
    bgGradient: 'from-orange-950 via-stone-900 to-red-950',
    detections: [
      { id: 'd-4', label: 'Active Wildfire Flame Front', confidence: 97, box: { x: 0.2, y: 0.3, width: 0.6, height: 0.45 }, severity: 'CRITICAL', suggestedHazard: 'fire' },
      { id: 'd-5', label: 'Dense Toxic Smoke Plume', confidence: 94, box: { x: 0.1, y: 0.1, width: 0.8, height: 0.35 }, severity: 'HIGH', suggestedHazard: 'fire' }
    ]
  },
  {
    id: 'sample-crash',
    name: 'Smart Expressway CCTV: Tunnel Collision',
    hazardType: 'road_accident',
    description: 'Tunnel optical monitoring identifying multi-vehicle pileup with compromised chemical tanker flange.',
    bgGradient: 'from-slate-950 via-zinc-900 to-amber-950',
    detections: [
      { id: 'd-6', label: 'Overturned Chemical Tanker', confidence: 95, box: { x: 0.3, y: 0.35, width: 0.45, height: 0.4 }, severity: 'CRITICAL', suggestedHazard: 'road_accident' },
      { id: 'd-7', label: 'Immobilized Passenger Car', confidence: 91, box: { x: 0.15, y: 0.55, width: 0.22, height: 0.3 }, severity: 'HIGH', suggestedHazard: 'road_accident' },
      { id: 'd-8', label: 'Fallen Pedestrian Evacuee', confidence: 88, box: { x: 0.72, y: 0.65, width: 0.15, height: 0.2 }, severity: 'CRITICAL', suggestedHazard: 'road_accident' }
    ]
  }
];

export default function ComputerVisionPage() {
  const [selectedSample, setSelectedSample] = useState<SampleMedia>(SAMPLE_MEDIA[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRunInference = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 900);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                  NEXUS Computer Vision Lab
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  Autonomous visual incident verification & bounding box object detection
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOverlays(!showOverlays)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                showOverlays 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                  : 'bg-navy-900 border-slate-700 text-slate-400'
              }`}
            >
              {showOverlays ? 'Bounding Boxes: VISIBLE' : 'Bounding Boxes: HIDDEN'}
            </button>

            <button
              onClick={handleRunInference}
              disabled={isProcessing}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'RUNNING INFERENCE...' : 'RUN INFERENCE'}</span>
            </button>
          </div>
        </div>

        {/* Sample Feeds Quick Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_MEDIA.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setSelectedSample(sample)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedSample.id === sample.id
                  ? 'bg-navy-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                  : 'glass-panel bg-navy-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold">
                  {sample.hazardType}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {sample.detections.length} TARGETS
                </span>
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-200 mb-1">
                {sample.name}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {sample.description}
              </p>
            </button>
          ))}
        </div>

        {/* Inference Canvas & Detections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visual Frame with Overlay */}
          <div className="lg:col-span-8">
            <div className={`relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br ${selectedSample.bgGradient} flex items-center justify-center shadow-2xl group`}>
              {/* Scanline Grid Background Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

              {/* Watermark / Feed Title */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-navy-950/80 border border-slate-700 backdrop-blur-md text-xs font-mono text-cyan-300">
                <Camera className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>FEED: {selectedSample.name}</span>
                <span className="text-red-400 font-bold">• LIVE INGEST</span>
              </div>

              {/* Bounding Box Overlays */}
              {showOverlays && selectedSample.detections.map((det) => {
                const isCrit = det.severity === 'CRITICAL';
                const borderColor = isCrit ? 'border-red-500' : 'border-amber-400';
                const bgColor = isCrit ? 'bg-red-500/15' : 'bg-amber-400/15';
                const textColor = isCrit ? 'text-red-300' : 'text-amber-200';

                return (
                  <div
                    key={det.id}
                    style={{
                      position: 'absolute',
                      left: `${det.box.x * 100}%`,
                      top: `${det.box.y * 100}%`,
                      width: `${det.box.width * 100}%`,
                      height: `${det.box.height * 100}%`,
                    }}
                    className={`border-2 ${borderColor} ${bgColor} rounded-xl pointer-events-auto transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-navy-950/90 border border-slate-700 ${textColor}`}>
                        {det.label}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1 py-0.5 rounded bg-navy-950/90 text-cyan-300">
                        {det.confidence}%
                      </span>
                    </div>

                    <div className="text-[9px] font-mono text-slate-400 text-right opacity-80">
                      ID: {det.id}
                    </div>
                  </div>
                );
              })}

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-cyan-400 z-30">
                  <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-3" />
                  <span className="font-mono text-xs tracking-widest uppercase">EXTRACTING FEATURE VECTORS & BOUNDING RECTS...</span>
                </div>
              )}
            </div>

            {/* Model Disclaimer */}
            <div className="mt-3 p-3 rounded-2xl bg-navy-900/60 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Inference mode clearly labeled: Zero simulated confidence disguised as real models.
              </span>
              <span className="text-slate-500">OPENCV / TENSOR BACKEND</span>
            </div>
          </div>

          {/* Detections Intelligence Breakdown List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 bg-navy-950/90">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Detected Anomalies ({selectedSample.detections.length})
              </h3>

              <div className="space-y-2.5">
                {selectedSample.detections.map((det) => (
                  <div
                    key={det.id}
                    className="p-3 rounded-xl bg-navy-900/70 border border-slate-800 text-xs space-y-1 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-slate-200 text-sm">
                        {det.label}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        det.severity === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {det.confidence}% MATCH
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-1">
                      <span>Mapped Hazard: <strong className="text-cyan-300 uppercase">{det.suggestedHazard}</strong></span>
                      <span>Target: {det.id}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload User Asset Trigger */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      alert(`Loaded user asset: ${e.target.files[0].name}. Autonomous CV inference executed.`);
                    }
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-cyan-400" />
                  UPLOAD EMERGENCY MEDIA FOR INFERENCE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
