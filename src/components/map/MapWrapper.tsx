'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Incident } from '@/types';
import { Loader2 } from 'lucide-react';

const LiveEmergencyMap = dynamic(
  () => import('./LiveEmergencyMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-2xl bg-navy-950 flex flex-col items-center justify-center border border-cyan-500/20 text-cyan-400">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <span className="text-xs font-mono tracking-widest uppercase">INITIALIZING GEOSPATIAL RADAR...</span>
      </div>
    )
  }
);

interface MapWrapperProps {
  onSelectIncident?: (incident: Incident) => void;
  showEvacuationRoutes?: boolean;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <LiveEmergencyMap {...props} />;
}
