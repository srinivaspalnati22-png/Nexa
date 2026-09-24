'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  Boxes, 
  Layers, 
  Eye, 
  RotateCw, 
  ShieldAlert, 
  Sliders, 
  Maximize2,
  Navigation
} from 'lucide-react';

export default function DigitalTwinView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedIncident } = useEmergency();
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [hazardPulse, setHazardPulse] = useState<boolean>(true);
  const [twinStatus, setTwinStatus] = useState<string>('SYNCHRONIZED');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040711);
    scene.fog = new THREE.FogExp2(0x040711, 0.015);

    // Perspective / Isometric Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(40, 50, 60);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Grid helper (Urban baseline)
    const gridHelper = new THREE.GridHelper(90, 45, 0x00F0FF, 0x1E293B);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0x3B82F6, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00F0FF, 2.5);
    dirLight.position.set(30, 60, 20);
    scene.add(dirLight);

    const redLight = new THREE.PointLight(0xEF4444, 4, 60);
    redLight.position.set(0, 8, 0);
    scene.add(redLight);

    // Generate Procedural Urban Blocks
    const buildingsGroup = new THREE.Group();
    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
    
    // Seed buildings
    const buildingCount = 70;
    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      
      // Keep center open for hazard zone
      if (Math.sqrt(x * x + z * z) < 10) continue;

      const height = 4 + Math.random() * 18;
      const widthB = 2.5 + Math.random() * 2;
      const depthB = 2.5 + Math.random() * 2;

      const mat = new THREE.MeshStandardMaterial({
        color: 0x0B1226,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: wireframeMode,
      });

      const building = new THREE.Mesh(buildingGeo, mat);
      building.scale.set(widthB, height, depthB);
      building.position.set(x, height / 2, z);

      // Add edge glow
      const edges = new THREE.EdgesGeometry(buildingGeo);
      const line = new THREE.LineSegments(
        edges, 
        new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.35 })
      );
      line.scale.set(widthB, height, depthB);
      line.position.set(x, height / 2, z);

      buildingsGroup.add(building);
      buildingsGroup.add(line);
    }
    scene.add(buildingsGroup);

    // Hazard Cylinder Inundation / Flame Perimeter
    const hazardRadius = 14;
    const hazardGeo = new THREE.CylinderGeometry(hazardRadius, hazardRadius, 3.5, 32);
    const hazardMat = new THREE.MeshStandardMaterial({
      color: 0xEF4444,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
    });
    const hazardZone = new THREE.Mesh(hazardGeo, hazardMat);
    hazardZone.position.set(0, 1.75, 0);
    scene.add(hazardZone);

    // Hazard Ring Beacon
    const ringGeo = new THREE.RingGeometry(hazardRadius - 0.5, hazardRadius + 0.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xEF4444, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.2, 0);
    scene.add(ring);

    // Aerial Rescue Drone Indicator
    const droneGeo = new THREE.SphereGeometry(1, 16, 16);
    const droneMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF });
    const drone = new THREE.Mesh(droneGeo, droneMat);
    drone.position.set(0, 24, 0);
    scene.add(drone);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow orbit rotation
      scene.rotation.y = elapsedTime * 0.08;

      // Pulse hazard zone
      if (hazardPulse) {
        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
        hazardZone.scale.set(pulse, 1, pulse);
        ring.scale.set(pulse, pulse, 1);
      }

      // Drone flight figure-8
      drone.position.x = Math.sin(elapsedTime * 1.5) * 16;
      drone.position.z = Math.cos(elapsedTime * 1.5) * 16;
      drone.position.y = 20 + Math.sin(elapsedTime * 3) * 2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [wireframeMode, hazardPulse, selectedIncident]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 bg-navy-950/95 flex flex-col">
      {/* Top Overlay Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-3 pointer-events-auto">
        <div className="p-3 rounded-xl glass-panel bg-navy-900/90 border border-slate-700/80 text-xs">
          <div className="flex items-center space-x-2">
            <Boxes className="w-4 h-4 text-cyan-400" />
            <span className="font-heading font-bold text-slate-100 uppercase tracking-wider">
              EMERGENCY DIGITAL TWIN 3D
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
              {twinStatus}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">
            Location: {selectedIncident?.locationName || 'Urban Center'} • Elevation: 14m ASL
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 pointer-events-auto">
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
            wireframeMode 
              ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200' 
              : 'glass-panel bg-navy-900/90 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Toggle Wireframe Structural View"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[11px] font-bold">Wireframe</span>
        </button>

        <button
          onClick={() => setHazardPulse(!hazardPulse)}
          className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
            hazardPulse 
              ? 'bg-red-500/30 border-red-400 text-red-200' 
              : 'glass-panel bg-navy-900/90 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Toggle Hazard Wave Pulse"
        >
          <RotateCw className="w-4 h-4" />
          <span className="text-[11px] font-bold">Dynamic Pulse</span>
        </button>
      </div>

      {/* Bottom Telemetry Legend */}
      <div className="absolute bottom-4 left-4 z-20 glass-panel rounded-xl p-2.5 text-[10px] font-mono border border-slate-700/80 bg-navy-950/90 text-slate-300 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500/70 border border-red-400"></span>
          <span>Inundated Flood Basin / Fire Plume (Dynamic Height)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-900 border border-blue-500"></span>
          <span>Commercial / Residential High-Rise Structures</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span>SAR Aerial Reconnaissance Drone Unit (Active Path)</span>
        </div>
      </div>

      {/* 3D Canvas Mounting Container */}
      <div ref={containerRef} className="w-full h-full flex-1" />
    </div>
  );
}
