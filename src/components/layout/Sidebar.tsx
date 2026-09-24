'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map, 
  AlertOctagon, 
  Cpu, 
  Boxes, 
  Flame, 
  Truck, 
  Eye, 
  LifeBuoy, 
  SlidersHorizontal, 
  BarChart3, 
  BellRing, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  FileText
} from 'lucide-react';
import { useEmergency } from '@/context/EmergencyContext';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { incidents } = useEmergency();

  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL').length;

  const navItems = [
    { label: 'Live Command', href: '/command', icon: LayoutDashboard, badge: 'LIVE' },
    { label: 'Emergency Map', href: '/map', icon: Map },
    { label: 'Incidents Feed', href: '/incidents', icon: AlertOctagon, count: criticalCount },
    { label: '3D Digital Twin', href: '/twin', icon: Boxes, badge: '3D' },
    { label: 'CV Vision Lab', href: '/computer-vision', icon: Eye, badge: 'AI' },
    { label: 'Citizen SOS', href: '/sos', icon: LifeBuoy, urgent: true },
    { label: 'Resource Fleet', href: '/resources', icon: Truck },
    { label: 'What-If Simulator', href: '/simulator', icon: SlidersHorizontal },
    { label: 'Risk Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'System Dossier', href: '/docs', icon: FileText, badge: 'DOCS' },
  ];

  return (
    <aside 
      className={`relative z-30 flex flex-col border-r border-blue-500/20 bg-navy-950/95 backdrop-blur-lg transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-navy-800 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shadow-lg hover:bg-slate-700 transition-all z-40"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Nav Link List */}
      <div className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-heading font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold'
                  : item.urgent
                  ? 'text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : item.urgent ? 'text-red-400 animate-pulse' : 'text-slate-400 group-hover:text-cyan-400 transition-colors'}`} />
              
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 rounded uppercase font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-red-950/80 border border-red-700/60 text-red-300 rounded-full font-bold">
                      {item.count}
                    </span>
                  )}
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-navy-900 border border-slate-700 text-slate-200 text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Mission Status */}
      <div className="p-3 border-t border-slate-800/80">
        {!collapsed ? (
          <div className="p-2.5 rounded-xl bg-navy-900/60 border border-blue-500/15 text-[11px] font-mono">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>CORE STATUS</span>
              <span className="text-emerald-400 font-bold">OPTIMAL</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-[94%]"></div>
            </div>
            <div className="mt-1.5 text-[9px] text-slate-500 flex justify-between">
              <span>SAR Uplink: Active</span>
              <span>4ms latency</span>
            </div>
          </div>
        ) : (
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse mx-auto" title="Status: Optimal" />
        )}
      </div>
    </aside>
  );
}
