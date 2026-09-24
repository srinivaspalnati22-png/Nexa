'use client';

import React from 'react';
import { useEmergency } from '@/context/EmergencyContext';
import { Wifi, WifiOff, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
  const { networkStatus, toggleNetworkFailure } = useEmergency();

  return (
    <div className="relative z-50">
      <AnimatePresence>
        {networkStatus !== 'ONLINE' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full px-4 py-2 text-xs font-mono flex items-center justify-between border-b ${
              networkStatus === 'OFFLINE_MODE' 
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-200' 
                : networkStatus === 'NETWORK_LOST'
                ? 'bg-red-950/90 border-red-500/40 text-red-200'
                : 'bg-cyan-950/90 border-cyan-500/40 text-cyan-200'
            }`}
          >
            <div className="flex items-center space-x-3 max-w-5xl mx-auto w-full">
              {networkStatus === 'OFFLINE_MODE' && (
                <WifiOff className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
              )}
              {networkStatus === 'NETWORK_LOST' && (
                <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce flex-shrink-0" />
              )}
              {networkStatus === 'SYNCING' && (
                <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
              )}

              <div className="flex-1 flex flex-wrap items-center gap-2">
                <span className="font-bold tracking-wider uppercase">
                  {networkStatus === 'OFFLINE_MODE' && '[OFFLINE EMERGENCY MODE ACTIVE]'}
                  {networkStatus === 'NETWORK_LOST' && '[SIGNAL DISRUPTED - DROPPING TO LOCAL TELEMETRY CACHE]'}
                  {networkStatus === 'SYNCING' && '[SYNCING CACHED SOS DISPATCH QUEUE WITH CLOUD REPOSITORY]'}
                </span>
                <span className="text-slate-300 hidden sm:inline">
                  • Operating on local offline database • Zero network latency • Outgoing SOS reports queued safely
                </span>
              </div>

              <button
                onClick={toggleNetworkFailure}
                className="px-3 py-1 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 text-xs font-sans transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                Restore Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
