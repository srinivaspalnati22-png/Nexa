'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import OfflineBanner from '@/components/offline/OfflineBanner';
import VoiceAssistantModal from '@/components/voice/VoiceAssistantModal';
import LiveDemoRunner from '@/components/demo/LiveDemoRunner';
import FinalResponseModal from '@/components/demo/FinalResponseModal';
import BottomTelemetryBar from '@/components/analytics/BottomTelemetryBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Offline Mode Alert Banner */}
      <OfflineBanner />

      {/* Top Mission Command Header */}
      <Navbar onOpenVoiceModal={() => setVoiceModalOpen(true)} />

      {/* Main Command Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Tactical Sidebar */}
        <Sidebar />

        {/* Dynamic Route Workspace View */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-navy-950 via-navy-900/40 to-navy-950">
          <div className="flex-1 p-4 lg:p-6">
            {children}
          </div>

          {/* Bottom Fixed Real-Time Telemetry Bar */}
          <BottomTelemetryBar />
        </main>
      </div>

      {/* Global Modals & Overlays */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

      {/* Signature 17-Step Live Demo Runner */}
      <LiveDemoRunner />

      {/* Response Completed Summary Modal */}
      <FinalResponseModal />
    </div>
  );
}
