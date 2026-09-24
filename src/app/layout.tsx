import type { Metadata } from 'next';
import './globals.css';
import { EmergencyProvider } from '@/context/EmergencyContext';

export const metadata: Metadata = {
  title: 'NEXUS AI | Autonomous Multi-Hazard Emergency Intelligence Platform',
  description: 'Detect. Predict. Decide. Respond. Save Lives. Startup-grade multi-hazard emergency intelligence command center powered by autonomous verification, digital twins, and AI coordination.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 antialiased">
        <EmergencyProvider>
          {children}
        </EmergencyProvider>
      </body>
    </html>
  );
}
