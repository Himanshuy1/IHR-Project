import React, { useState, useEffect } from 'react';
import { Search, Filter, ShieldAlert, Eye, Target, MoreHorizontal, AlertTriangle, Bug } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { fetchIncidents } from '../services/api';


const getTypeIcon = (type) => {
  if (type.includes('File')) return <Target className="w-4 h-4 text-orange-500" />;
  if (type.includes('Login')) return <ShieldAlert className="w-4 h-4 text-blue-500" />;
  return <Bug className="w-4 h-4 text-red-500" />;
};

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchIncidents();
      setIncidents(data);
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleRow = (id) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  const toggleAll = () => {
    if (selectedRows.size === incidents.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(incidents.map(i => i.id)));
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-textMuted font-medium">
        <span className="hover:text-white cursor-pointer transition-colors">Discover</span>
        <span>&lt;</span>
        <span className="hover:text-white cursor-pointer transition-colors">Alerts</span>
        <span>&lt;</span>
        <span className="text-white">Incidents</span>
        <span>&lt;</span>
        <span className="bg-surface px-2 py-0.5 rounded border border-border/50 text-white">Severity: High</span>
      </div>

      {/* Header & Controls */}
      <div className="flex justify-between items-center bg-bg sticky top-0 py-2 z-10 w-full">
        <h1 className="text-2xl font-bold tracking-tight text-textMain flex items-center gap-3">
          Incidents 
          <span className="text-sm font-normal text-textMuted bg-surface px-2.5 py-0.5 rounded-full border border-border/50">
            {incidents.length} total
          </span>
        </h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search ID, IP, or Type..." 
              className="pl-9 pr-4 py-1.5 bg-surface border border-border/50 rounded-lg text-sm text-textMain focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border/50 rounded-lg text-sm font-medium hover:bg-border/30 transition-colors text-textMain">
            <Filter className="w-4 h-4 text-textMuted" />
            Filters
          </button>
        </div>
      </div>

      {/* Interactive Table Container */}
      <Card className="flex-grow w-full border-border/40 shadow-xl overflow-hidden">
        <div className="w-full overflow-x-auto min-w-full">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2028] border-b border-border/50 text-textMuted sticky top-0 z-10">
              <tr>
                <th className="p-4 w-12 shrink-0">
                  <input 
                    type="checkbox" 
                    className="rounded bg-black/40 border-gray-700 cursor-pointer w-4 h-4 focus:ring-primary focus:ring-offset-bg accent-primary"
                    checked={selectedRows.size === incidents.length && incidents.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th className="py-3 px-4 font-semibold shrink-0">ID</th>
                <th className="py-3 px-4 font-semibold min-w-[220px]">Type</th>
                <th className="py-3 px-4 font-semibold min-w-[150px]">Affects</th>
                <th className="py-3 px-4 font-semibold min-w-[150px]">Assignee</th>
                <th className="py-3 px-4 font-semibold min-w-[120px]">Status</th>
                <th className="py-3 px-4 font-semibold min-w-[180px]">Incident Time</th>
                <th className="py-3 px-4 font-semibold min-w-[120px]">Severity</th>
                <th className="py-3 w-32 font-semibold text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 max-h-[800px] overflow-y-auto">
              {incidents.map((incident) => {
                const isSelected = selectedRows.has(incident.id);
                return (
                  <tr 
                    key={incident.id} 
                    onClick={() => toggleRow(incident.id)}
                    className={`hover:bg-[#252630] transition-colors group cursor-pointer ${
                      isSelected ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="p-4 w-12 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleRow(incident.id)}
                        className="rounded bg-black/40 border-gray-700 cursor-pointer w-4 h-4 focus:ring-primary focus:ring-offset-bg accent-primary" 
                      />
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-400">#{incident.id}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                       {getTypeIcon(incident.type)}
                      <span className="font-medium text-gray-200">{incident.type}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{incident.affects}</td>
                    <td className="py-3 px-4">
                      {incident.assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold ring-1 ring-indigo-500/30">
                            {incident.assignee.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-gray-300">{incident.assignee}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500/80 italic text-xs uppercase tracking-wider">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{incident.status}</td>
                    <td className="py-3 px-4 font-mono text-xs text-textMuted">{incident.time}</td>
                    <td className="py-3 px-4">
                      <Badge variant={incident.severity.toLowerCase()}>{incident.severity}</Badge>
                    </td>
                    
                    {/* Action Column - Appears on Hover */}
                    <td className="py-2 pr-6">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button 
                          className="p-1.5 hover:bg-black/40 rounded text-gray-400 hover:text-white transition-colors border border-transparent hover:border-gray-700" 
                          title="Quick Preview"
                          onClick={(e) => { e.stopPropagation(); /* simulate open */}}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded shadow-sm transition-colors border border-indigo-500/50"
                          onClick={(e) => { e.stopPropagation(); window.location.href=`/incidents/${incident.id}`}}
                        >
                          Analyze
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bulk Action Sticky Bar (Visible when rows are selected) */}
      {selectedRows.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1f2028] border border-border/70 shadow-2xl px-6 py-3 rounded-2xl flex items-center gap-6 animate-in slide-in-from-bottom-5 w-fit z-50">
          <span className="text-white font-medium text-sm">
            <span className="bg-primary/20 text-indigo-400 px-2 py-0.5 rounded-full mr-2">{selectedRows.size}</span> 
            Selected
          </span>
          <div className="h-6 w-px bg-border/50"></div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-surface hover:bg-white/10 rounded text-sm text-white transition-colors border border-transparent hover:border-white/10">Acknowledge</button>
            <button className="px-3 py-1.5 bg-surface hover:bg-white/10 rounded text-sm text-white transition-colors border border-transparent hover:border-white/10">Assign to me</button>
            <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-sm transition-colors border border-red-500/20">Mark as False Positive</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Incidents;
