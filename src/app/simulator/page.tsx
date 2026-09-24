'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  SlidersHorizontal, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Activity,
  ArrowRight,
  Flame,
  Droplets,
  CloudRain,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SimulatorPage() {
  const [hazardType, setHazardType] = useState<string>('flood');
  const [rainfall, setRainfall] = useState<number>(140);
  const [waterLevel, setWaterLevel] = useState<number>(5.2);
  const [populationDensity, setPopulationDensity] = useState<number>(8500);
  const [roadAccessibility, setRoadAccessibility] = useState<number>(40); // 40% open
  const [availableUnits, setAvailableUnits] = useState<number>(12);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStage, setSimulationStage] = useState<number>(0);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(false);

  const stages = [
    'Stage 1: Establishing Normal Environmental Baseline',
    'Stage 2: Sensor Anomaly & Threshold Exceedance Detected',
    'Stage 3: Spatial Hazard Expansion & Hydraulic Modeling',
    'Stage 4: NEXUS Risk Index Recalculation (Composite 0-100)',
    'Stage 5: High-Density Population Impact Assessment',
    'Stage 6: Autonomous Resource Allocation Matrix Synthesized',
    'Stage 7: Dynamic Evacuation Corridors & Road Cordon Activated',
    'Stage 8: Coordinated Multi-Agency Rapid Response Executed'
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationCompleted(false);
    setSimulationStage(1);

    let stage = 1;
    const interval = setInterval(() => {
      stage++;
      if (stage <= 8) {
        setSimulationStage(stage);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationCompleted(true);
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setSimulationStage(0);
    setSimulationCompleted(false);
  };

  // Calculated Metrics
  const calculatedRiskScore = Math.min(99, Math.round((rainfall * 0.3) + (waterLevel * 8) + (populationDensity / 400) - (roadAccessibility * 0.2)));
  const affectedCivilianEst = Math.round(populationDensity * 1.45);
  const unitsRequired = Math.ceil(affectedCivilianEst / 700);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                What-If Emergency Simulator
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Predictive hazard modeling, impact forecasting, and resource capacity stress testing
              </p>
            </div>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Sliders & Parameters */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-3xl p-6 border border-cyan-500/20 bg-navy-950/90 shadow-xl space-y-5">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                Scenario Parameter Sliders
              </h3>

              {/* Hazard Selection */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                  DISASTER MODEL
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {(['flood', 'fire', 'industrial_gas_leak'] as const).map((h) => (
                    <button
                      key={h}
                      onClick={() => setHazardType(h)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        hazardType === h
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-navy-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {h === 'flood' ? '🌊 Flood' : h === 'fire' ? '🔥 Wildfire' : '☣️ Gas Leak'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rainfall Intensity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">PRECIPITATION INTENSITY:</span>
                  <span className="text-cyan-300 font-bold">{rainfall} mm/h</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  value={rainfall}
                  onChange={(e) => setRainfall(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Water Level / Gauge Height */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">SURGE WATER DEPTH:</span>
                  <span className="text-cyan-300 font-bold">{waterLevel} meters</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={waterLevel}
                  onChange={(e) => setWaterLevel(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Population Density */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">EXPOSED POPULATION:</span>
                  <span className="text-cyan-300 font-bold">{populationDensity.toLocaleString()} citizens</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={populationDensity}
                  onChange={(e) => setPopulationDensity(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Road Accessibility */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">ROAD ACCESSIBILITY:</span>
                  <span className="text-amber-300 font-bold">{roadAccessibility}% Passable</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={roadAccessibility}
                  onChange={(e) => setRoadAccessibility(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'SIMULATING...' : 'RUN SIMULATION'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 8-Stage Animated Progression & Before/After */}
          <div className="lg:col-span-7 space-y-4">
            {/* 8-Stage Progression Panel */}
            <div className="glass-panel rounded-3xl p-6 border border-cyan-500/20 bg-navy-950/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Dynamic Simulation Pipeline (8 Stages)
                </h3>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {simulationStage}/8 EXECUTED
                </span>
              </div>

              {/* Progress Steps List */}
              <div className="space-y-2">
                {stages.map((stg, i) => {
                  const stepNum = i + 1;
                  const isDone = simulationStage >= stepNum;
                  const isCurrent = simulationStage === stepNum;

                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          : isDone
                          ? 'bg-navy-900/60 border-slate-800 text-slate-400'
                          : 'bg-navy-950/40 border-slate-900 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {stepNum}
                        </span>
                        <span>{stg}</span>
                      </div>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Before vs After Comparative Impact Metrics */}
            <div className="glass-panel rounded-3xl p-6 border border-cyan-500/20 bg-navy-950/90 shadow-xl">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Before vs After Response Optimization
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Composite Risk</span>
                  <div className="font-heading font-bold text-lg sm:text-xl text-red-400 mt-1">
                    {calculatedRiskScore}/100
                  </div>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">Opt: 32/100 (-67%)</span>
                </div>

                <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Impacted Civilians</span>
                  <div className="font-heading font-bold text-lg sm:text-xl text-slate-100 mt-1">
                    {affectedCivilianEst.toLocaleString()}
                  </div>
                  <span className="text-[9px] text-cyan-400 block mt-0.5">100% Cordoned</span>
                </div>

                <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Tactical Fleet</span>
                  <div className="font-heading font-bold text-lg sm:text-xl text-cyan-300 mt-1">
                    {unitsRequired} Units
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Available: {availableUnits}</span>
                </div>

                <div className="p-3 rounded-2xl bg-navy-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Evac ETA</span>
                  <div className="font-heading font-bold text-lg sm:text-xl text-amber-300 mt-1">
                    18.5 Mins
                  </div>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">-8.2 Mins Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
