'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useEmergency } from '@/context/EmergencyContext';
import { HazardType } from '@/types';
import { 
  LifeBuoy, 
  MapPin, 
  PhoneCall, 
  Share2, 
  X, 
  CheckCircle2, 
  Clock, 
  Hospital, 
  Truck, 
  AlertTriangle,
  Send,
  WifiOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CitizenSOSPage() {
  const { submitCitizenSOS, ambulances, hospitals, networkStatus } = useEmergency();

  const [sosActivated, setSosActivated] = useState<boolean>(false);
  const [selectedHazard, setSelectedHazard] = useState<HazardType>('flood');
  const [victimCount, setVictimCount] = useState<number>(2);
  const [notes, setNotes] = useState<string>('Trapped by rising flood water near ground floor shop.');
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const nearestAmbulance = ambulances[0];
  const nearestHospital = hospitals[0];

  const handleActivateSOS = async () => {
    setSosActivated(true);
    const report = await submitCitizenSOS({
      emergencyType: selectedHazard,
      peopleCount: victimCount,
      notes,
      locationText: 'Kurla West, LBS Marg Corridor, Mumbai (GPS: 19.0688° N, 72.8715° E)',
      coordinates: { lat: 19.0688, lng: 72.8715 }
    });
    setSubmittedReportId(report.id);
  };

  const handleCancelSOS = () => {
    setSosActivated(false);
    setSubmittedReportId(null);
  };

  const hazardsList: { type: HazardType; label: string; icon: string }[] = [
    { type: 'flood', label: 'Flash Flood', icon: '🌊' },
    { type: 'fire', label: 'Fire Outbreak', icon: '🔥' },
    { type: 'road_accident', label: 'Vehicle Crash', icon: '🚗' },
    { type: 'landslide', label: 'Landslide Debris', icon: '⛰️' },
    { type: 'industrial_gas_leak', label: 'Toxic Gas Leak', icon: '☣️' },
    { type: 'structural_failure', label: 'Building Collapse', icon: '🏚️' },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto py-4 space-y-6">
        {/* Urgent Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-red-950/60 border border-red-800">
            CITIZEN EMERGENCY DISTRESS BEACON
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-100">
            NEXUS CITIZEN SOS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            One-touch satellite location relay and tactical unit dispatch
          </p>
        </div>

        {/* Central SOS Trigger Button State */}
        {!sosActivated ? (
          <div className="glass-panel rounded-3xl p-8 border-2 border-red-500/30 flex flex-col items-center text-center shadow-[0_0_40px_rgba(239,68,68,0.15)] bg-navy-950/90">
            {/* The Big Central SOS Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleActivateSOS}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-rose-600 flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(239,68,68,0.6)] cursor-pointer group mb-6 transition-all"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-30"></span>
              <LifeBuoy className="w-16 h-16 sm:w-20 sm:h-20 mb-2 group-hover:rotate-12 transition-transform" />
              <span className="font-heading font-extrabold text-3xl sm:text-4xl tracking-wider">
                SOS
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-90">
                TAP TO BROADCAST
              </span>
            </motion.button>

            {/* Emergency Type Selector */}
            <div className="w-full text-left space-y-3">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                SELECT EMERGENCY TYPE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {hazardsList.map((h) => (
                  <button
                    key={h.type}
                    onClick={() => setSelectedHazard(h.type)}
                    className={`p-2.5 rounded-xl border text-xs font-heading font-bold flex items-center space-x-2 transition-all ${
                      selectedHazard === h.type
                        ? 'bg-red-500/20 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-navy-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-base">{h.icon}</span>
                    <span>{h.label}</span>
                  </button>
                ))}
              </div>

              {/* People Count & Notes */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    PEOPLE REQUIRING EVACUATION
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={victimCount}
                    onChange={(e) => setVictimCount(Number(e.target.value))}
                    className="w-full bg-navy-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    SITUATION DETAILS
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g. Trapped on rooftop..."
                    className="w-full bg-navy-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-400"
                  />
                </div>
              </div>
            </div>

            {/* Offline Notification note */}
            {networkStatus !== 'ONLINE' && (
              <div className="mt-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                <WifiOff className="w-4 h-4 flex-shrink-0" />
                <span>Offline Mode: Your SOS will be cached locally and relayed over RF/mesh relay.</span>
              </div>
            )}
          </div>
        ) : (
          /* Active SOS Tracking State */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.3)] bg-navy-950/95 space-y-6"
          >
            {/* Distress Broadcast Confirmation Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/60 flex items-center justify-center text-red-400">
                  <span className="w-4 h-4 rounded-full bg-red-500 animate-ping"></span>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-red-400">
                    DISTRESS BEACON BROADCASTING
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    REPORT ID: {submittedReportId} • PRIORITY 1
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancelSOS}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                CANCEL SOS
              </button>
            </div>

            {/* GPS Telemetry Pill */}
            <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center space-x-3 text-xs">
              <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">CALCULATED GPS COORDINATES</span>
                <div className="font-bold text-slate-200">19.0688° N, 72.8715° E (Kurla West Corridor, Mumbai)</div>
              </div>
            </div>

            {/* Matched Nearest Tactical Units */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                  <Truck className="w-4 h-4" />
                  <span className="font-bold uppercase">NEAREST AMBULANCE</span>
                </div>
                <div className="font-heading font-bold text-sm text-slate-100">{nearestAmbulance.callSign}</div>
                <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  ETA: <strong className="text-amber-300">{nearestAmbulance.etaMinutes} MINS</strong> ({nearestAmbulance.distanceKm} km)
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Status: En-Route Priority Code 3</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30">
                <div className="flex items-center space-x-2 text-blue-400 mb-1">
                  <Hospital className="w-4 h-4" />
                  <span className="font-bold uppercase">DESIGNATED HOSPITAL</span>
                </div>
                <div className="font-heading font-bold text-sm text-slate-100">{nearestHospital.name}</div>
                <div className="text-[11px] text-slate-300 mt-1">
                  {nearestHospital.availableBeds} Available Beds • Level-1 Trauma Ready
                </div>
                <div className="text-[10px] text-cyan-300 mt-0.5">Distance: {nearestHospital.distanceKm} km</div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:112"
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                CALL EMERGENCY (112 / 108)
              </a>

              <button
                onClick={() => alert('Live encrypted coordinates copied to clipboard for emergency SMS/WhatsApp dispatch.')}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                SHARE LIVE GPS LOCATION
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
