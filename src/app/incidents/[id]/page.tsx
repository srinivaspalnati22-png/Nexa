import IncidentDetailClient from '@/components/incident/IncidentDetailClient';
import { DEMO_INCIDENTS } from '@/data/demoData';

export function generateStaticParams() {
  return DEMO_INCIDENTS.map((inc) => ({
    id: inc.id,
  }));
}

export default function IncidentPage({ params }: { params: { id: string } }) {
  return <IncidentDetailClient id={params.id} />;
}
