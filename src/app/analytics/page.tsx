'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'24H' | '7D' | '30D'>('7D');

  const hazardDistribution = [
    { name: 'Flood', count: 18, color: '#00F0FF' },
    { name: 'Fire', count: 12, color: '#EF4444' },
    { name: 'Gas Leak', count: 6, color: '#F59E0B' },
    { name: 'Landslide', count: 9, color: '#8B5CF6' },
    { name: 'Accidents', count: 14, color: '#3B82F6' },
    { name: 'Severe Weather', count: 8, color: '#10B981' },
  ];

  const responseTimeTrend = [
    { day: 'Mon', minutes: 11.2, benchmark: 15.0 },
    { day: 'Tue', minutes: 9.8, benchmark: 15.0 },
    { day: 'Wed', minutes: 8.9, benchmark: 15.0 },
    { day: 'Thu', minutes: 9.2, benchmark: 15.0 },
    { day: 'Fri', minutes: 8.4, benchmark: 15.0 },
    { day: 'Sat', minutes: 7.9, benchmark: 15.0 },
    { day: 'Sun', minutes: 8.1, benchmark: 15.0 },
  ];

  const riskReductionTrend = [
    { time: 'T-0m', rawRisk: 92, mitigatedRisk: 92 },
    { time: 'T-10m', rawRisk: 94, mitigatedRisk: 86 },
    { time: 'T-20m', rawRisk: 95, mitigatedRisk: 74 },
    { time: 'T-30m', rawRisk: 93, mitigatedRisk: 58 },
    { time: 'T-45m', rawRisk: 88, mitigatedRisk: 42 },
    { time: 'T-60m', rawRisk: 82, mitigatedRisk: 28 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                Incident Risk & Operational Analytics
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Historical response latency, multi-hazard frequency, and AI mitigation performance
              </p>
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center space-x-1 p-1 bg-navy-900 border border-slate-800 rounded-xl">
            {(['24H', '7D', '30D'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  timeRange === t
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-navy-950/70">
            <div className="flex justify-between items-center text-slate-400 text-xs mb-1">
              <span>AVG DISPATCH LATENCY</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="font-heading font-bold text-2xl text-slate-100">08m 42s</div>
            <span className="text-[10px] text-emerald-400 font-bold">-41% vs Conventional SEOC</span>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-navy-950/70">
            <div className="flex justify-between items-center text-slate-400 text-xs mb-1">
              <span>VERIFICATION ACCURACY</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-heading font-bold text-2xl text-emerald-400">96.4%</div>
            <span className="text-[10px] text-slate-400">5-Vector AI Cross-Check</span>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-navy-950/70">
            <div className="flex justify-between items-center text-slate-400 text-xs mb-1">
              <span>CIVILIANS PROTECTED</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-heading font-bold text-2xl text-slate-100">67,420</div>
            <span className="text-[10px] text-cyan-400">Zero Critical Failure Rate</span>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-navy-950/70">
            <div className="flex justify-between items-center text-slate-400 text-xs mb-1">
              <span>TOTAL DEPLOYMENTS</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-heading font-bold text-2xl text-slate-100">148 Units</div>
            <span className="text-[10px] text-amber-400">NDRF • Ambulances • Fire</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Response Latency Trend (Area/Line) */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-cyan-500/20 bg-navy-950/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200">
                Average Emergency Response Latency Trend (Minutes)
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">TARGET: &lt;15 MINS</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 20]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B1226', 
                      borderColor: '#00F0FF', 
                      borderRadius: '8px', 
                      fontSize: '11px',
                      color: '#fff' 
                    }} 
                  />
                  <Line type="monotone" dataKey="minutes" name="Actual (Mins)" stroke="#00F0FF" strokeWidth={3} dot={{ fill: '#00F0FF' }} />
                  <Line type="monotone" dataKey="benchmark" name="Target (Mins)" stroke="#EF4444" strokeWidth={1.5} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incidents by Hazard Type (Pie/Donut) */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-cyan-500/20 bg-navy-950/90 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200">
              Incidents by Hazard Profile
            </h3>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hazardDistribution}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {hazardDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B1226', 
                      borderColor: '#00F0FF', 
                      borderRadius: '8px', 
                      fontSize: '11px',
                      color: '#fff' 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {hazardDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-400 truncate">{item.name}:</span>
                  <span className="text-slate-100 font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Risk Mitigation Curve */}
          <div className="lg:col-span-12 glass-panel rounded-3xl p-6 border border-cyan-500/20 bg-navy-950/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-200">
                NEXUS AI Intervention vs Unmitigated Hazard Escalation
              </h3>
              <span className="text-xs font-mono text-cyan-300">COMPOSITE HAZARD REDUCTION: -64%</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskReductionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B1226', 
                      borderColor: '#00F0FF', 
                      borderRadius: '8px', 
                      fontSize: '11px',
                      color: '#fff' 
                    }} 
                  />
                  <Line type="monotone" dataKey="rawRisk" name="Unmitigated Hazard Risk" stroke="#EF4444" strokeWidth={2} strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="mitigatedRisk" name="NEXUS Coordinated Response" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Demo Data Disclaimer Badge */}
        <div className="p-3 rounded-2xl bg-navy-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Clear labeling: All analytics reflect simulated telemetry scenarios for disaster training & audit.
          </span>
          <span className="text-slate-500">ISO-22320 DISASTER COMPLIANT</span>
        </div>
      </div>
    </AppLayout>
  );
}
