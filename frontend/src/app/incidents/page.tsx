'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShieldAlert, Eye, Target, AlertTriangle, Bug } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { fetchIncidents } from '@/services/api';
import { cn } from '@/utils/cn';

const mockIncidents = [
  { id: 'INC-8491', type: 'Login Bruteforce', affects: 'SSH (Port 22)', assignee: 'Admin', status: 'Open', time: '10:45 AM', severity: 'High' },
  { id: 'INC-8490', type: 'File Upload', affects: 'FTP (Port 21)', assignee: 'System', status: 'In Progress', time: '09:20 AM', severity: 'Medium' },
  { id: 'INC-8489', type: 'Port Scan', affects: 'Multiple', assignee: '', status: 'Open', time: '08:15 AM', severity: 'Low' },
  { id: 'INC-8488', type: 'Malware Payload', affects: 'HTTP (Port 80)', assignee: 'Security Team', status: 'Closed', time: 'Yesterday', severity: 'High' },
];

const getTypeIcon = (type: string) => {
  if (type.includes('File')) return <Target className="w-4 h-4 text-orange-500" />;
  if (type.includes('Login')) return <ShieldAlert className="w-4 h-4 text-blue-500" />;
  if (type.includes('Scan')) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  return <Bug className="w-4 h-4 text-red-500" />;
};

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>(mockIncidents);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchIncidents();
      if (data && data.length > 0) {
        setIncidents(data);
      }
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleRow = (id: string) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  const toggleAll = () => {
    if (selectedRows.size === incidents.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(incidents.map((i) => i.id)));
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium tracking-wide">
        <span className="hover:text-white cursor-pointer transition-colors">Command Center</span>
        <span>/</span>
        <span className="text-white">Incidents</span>
        <span className="ml-2 bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded-full border border-red-500/20 text-xs shadow-[0_0_8px_rgba(239,68,68,0.2)]">
          Severity: High
        </span>
      </div>

      <div className="flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 py-4 z-20 w-full rounded-b-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-4 drop-shadow-sm">
          Active Incidents
          <span className="text-sm font-semibold text-zinc-400 bg-surface px-3 py-1 rounded-full border border-white/10 shadow-inner">
            {incidents.length} total
          </span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-400 transition-colors" />
            <input
              type="text"
              placeholder="Search ID, Type..."
              className="pl-10 pr-4 py-2 bg-surface/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 w-64 transition-all shadow-inner"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors text-white shadow-sm"
          >
            <Filter className="w-4 h-4" /> Filters
          </motion.button>
        </div>
      </div>

      <Card className="flex-grow w-full border-white/10 shadow-2xl overflow-hidden p-0 rounded-2xl">
        <div className="w-full overflow-x-auto min-w-full">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-surface/80 border-b border-white/10 text-zinc-400 font-semibold tracking-wide backdrop-blur-xl">
              <tr>
                <th className="p-4 w-12 shrink-0">
                  <input
                    type="checkbox"
                    className="rounded bg-black/40 border-white/20 cursor-pointer w-4 h-4 accent-emerald-500 transition-all"
                    checked={selectedRows.size === incidents.length && incidents.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th className="py-4 px-4 shrink-0">Incident ID</th>
                <th className="py-4 px-4 min-w-[200px]">Threat Type</th>
                <th className="py-4 px-4 min-w-[150px]">Target</th>
                <th className="py-4 px-4 min-w-[150px]">Assignee</th>
                <th className="py-4 px-4 min-w-[120px]">Status</th>
                <th className="py-4 px-4 min-w-[150px]">Timestamp</th>
                <th className="py-4 px-4 min-w-[120px]">Severity</th>
                <th className="py-4 w-32 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {incidents.map((incident, i) => {
                  const isSelected = selectedRows.has(incident.id);
                  return (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      key={incident.id}
                      onClick={() => toggleRow(incident.id)}
                      className={cn(
                        'hover:bg-white/5 transition-all group cursor-pointer',
                        isSelected ? 'bg-emerald-500/10' : ''
                      )}
                    >
                      <td className="p-4 w-12 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(incident.id)}
                          className="rounded bg-black/40 border-white/20 cursor-pointer w-4 h-4 accent-emerald-500 transition-all"
                        />
                      </td>
                      <td className="py-4 px-4 font-mono text-zinc-400 font-medium">#{incident.id}</td>
                      <td className="py-4 px-4 flex items-center gap-3">
                        <div className="p-1.5 bg-white/5 rounded-lg shadow-sm border border-white/5">{getTypeIcon(incident.type)}</div>
                        <span className="font-semibold text-zinc-200">{incident.type}</span>
                      </td>
                      <td className="py-4 px-4 text-zinc-400">{incident.affects}</td>
                      <td className="py-4 px-4">
                        {incident.assignee ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold ring-1 ring-indigo-500/50 shadow-inner">
                              {incident.assignee.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-zinc-300 font-medium">{incident.assignee}</span>
                          </div>
                        ) : (
                          <span className="text-zinc-500/80 italic text-xs uppercase tracking-widest font-semibold">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-zinc-300 font-medium">{incident.status}</span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-zinc-500">{incident.time}</td>
                      <td className="py-4 px-4">
                        <Badge variant={incident.severity.toLowerCase() as any}>{incident.severity}</Badge>
                      </td>
                      <td className="py-4 pr-6">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/20"
                            title="Quick Preview"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <a
                            href={`/incidents/${incident.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all border border-emerald-500/30 hover:border-emerald-500/50"
                          >
                            Analyze
                          </a>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bulk Action Sticky Bar */}
      <AnimatePresence>
        {selectedRows.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 100, opacity: 0, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-surface/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.15)] px-6 py-4 rounded-2xl flex items-center gap-6 z-50"
          >
            <span className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                {selectedRows.size}
              </span>
              Selected
            </span>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white transition-colors border border-white/10 hover:border-white/20">
                Acknowledge
              </button>
              <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl text-sm font-semibold text-emerald-400 transition-colors border border-emerald-500/30">
                Assign to me
              </button>
              <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold transition-colors border border-red-500/20">
                False Positive
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
