'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Maximize2, Map as MapIcon, Crosshair } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/common/Card';
import { fetchMapData } from '@/services/api';

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const mockMarkers = [
  { lat: 39.9042, lon: 116.4074, country: 'CN', severity: 'High' },
  { lat: 55.7558, lon: 37.6173, country: 'RU', severity: 'High' },
  { lat: 35.6895, lon: 139.6917, country: 'JP', severity: 'Medium' },
  { lat: 51.5074, lon: -0.1278, country: 'UK', severity: 'Low' },
  { lat: 40.7128, lon: -74.0060, country: 'US', severity: 'High' },
];

export default function MapPage() {
  const [markers, setMarkers] = useState<any[]>(mockMarkers);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMapData();
      if (data && data.length > 0) {
        setMarkers(data);
      }
    };
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-7xl mx-auto pb-10 h-full"
    >
      <div className="flex flex-col mb-2 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-widest text-white drop-shadow-md pb-1 uppercase flex items-center gap-3">
          <MapIcon className="text-emerald-400 w-8 h-8 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
          Global Threat <span className="text-emerald-400 font-mono ml-1">MAP</span>
        </h1>
        <p className="text-zinc-400 text-sm mt-1">Real-time geographical origin of intrusion attempts.</p>
      </div>

      <Card className="flex-grow flex flex-col overflow-hidden min-h-[600px] border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] p-0">
        <CardHeader action={<Maximize2 className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />}>
          <span className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            Live Attack Geolocation
          </span>
        </CardHeader>

        <CardContent className="flex-grow flex items-center justify-center p-0 bg-[#09090b] relative overflow-hidden">
          {/* Tactical Overlay Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} style={{ width: '100%', height: '100%' }}>
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#18181b"
                    stroke="#27272a"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#27272a', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {markers.map((marker, index) => {
              const color = marker.severity === 'High' ? '#ef4444' : marker.severity === 'Medium' ? '#f59e0b' : '#3b82f6';
              return (
                <Marker key={`${marker.lat}-${marker.lon}-${index}`} coordinates={[marker.lon, marker.lat]}>
                  <motion.circle
                    initial={{ r: 0 }}
                    animate={{ r: 4 }}
                    transition={{ type: 'spring' as const }}
                    fill={color}
                    stroke={`${color}80`}
                    strokeWidth={1}
                  />
                  <motion.circle
                    r={15}
                    fill={color}
                    opacity={0.2}
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{ fontFamily: 'var(--font-mono)', fill: color, fontSize: '10px', fontWeight: 'bold' }}
                    className="drop-shadow-md"
                  >
                    {marker.country}
                  </text>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Legend */}
          <div className="absolute bottom-6 right-6 bg-surface/90 backdrop-blur-md p-4 flex flex-col gap-3 rounded-xl border border-white/10 shadow-2xl">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest border-b border-white/10 pb-2 mb-1 flex items-center gap-2">
              <Crosshair className="w-3 h-3 text-emerald-400" /> Target Lock
            </h4>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></div>
              High Severity Threat
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse"></div>
              Medium Severity
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="w-3 h-3 rounded-full bg-[#18181b] border border-[#27272a]"></div>
              Secure Regions
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
