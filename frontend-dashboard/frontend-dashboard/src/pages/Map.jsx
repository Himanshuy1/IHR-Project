import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { fetchMapData } from '../services/api';
import { Maximize2, ShieldAlert } from 'lucide-react';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const Map = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMapData();
      setMarkers(data);
    };
    loadData();
    const interval = setInterval(loadData, 10000); // 10 second refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10 h-full">
      <div className="flex flex-col mb-2">
        <h1 className="text-3xl font-extrabold tracking-widest text-white drop-shadow-md pb-1 uppercase flex items-center gap-3">
          <ShieldAlert className="text-red-500 w-8 h-8 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          Global Threat <span className="text-red-500 font-mono ml-1">MAP</span>
        </h1>
        <p className="text-textMuted text-sm mt-1">Real-time geographical origin of intrusion attempts.</p>
      </div>

      <div className="bg-[#1e1f26] border border-[#2a2b36] rounded-xl flex-grow flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        <div className="border-b border-[#2a2b36] p-4 flex justify-between items-center bg-[#24252e]">
          <h3 className="font-semibold text-textMain flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Live Attack Geolocation
          </h3>
          <Maximize2 className="w-4 h-4 text-textMuted cursor-pointer hover:text-white" />
        </div>
        
        <div className="flex-grow flex items-center justify-center p-4 bg-[#14151a] relative">
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} width={800} height={400} style={{ width: "100%", height: "auto" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1f2028"
                    stroke="#2e303a"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#2a2b36", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            
            {markers.map((marker, index) => (
              <Marker key={`${marker.lat}-${marker.lon}-${index}`} coordinates={[marker.lon, marker.lat]}>
                <circle r={4} fill="#ef4444" stroke="#7f1d1d" strokeWidth={1} />
                <circle r={12} fill="#ef4444" opacity={0.2} className="animate-ping" />
                <text
                  textAnchor="middle"
                  y={15}
                  style={{ fontFamily: "system-ui", fill: "#f87171", fontSize: "10px", fontWeight: "bold" }}
                >
                  {marker.country}
                </text>
              </Marker>
            ))}
          </ComposableMap>

          <div className="absolute bottom-4 right-4 bg-surface/80 p-3 flex flex-col gap-2 rounded text-xs border border-border/50">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Attacker Coordinates</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1f2028] border border-[#2e303a]"></div> Unaffected Regions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
