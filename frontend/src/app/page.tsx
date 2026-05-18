'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, AlertTriangle, Activity, Server, FileText, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { fetchStats } from '@/services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const mockRisks = [
  { issue: 'Suspicious SSH Login Attempts', desc: 'Multiple failed logins from IP 192.168.1.5', sev: 'High' },
  { issue: 'Unusual FTP Activity', desc: 'Large file transfer on restricted port', sev: 'Medium' },
  { issue: 'Port Scanning Detected', desc: 'Sequential port probing from external subnet', sev: 'Low' },
  { issue: 'High Server Load', desc: 'CPU usage spiked to 95% during off-hours', sev: 'Medium' },
];

const mockNetworkActivity = [
  { name: '00:00', requests: 120, transfers: 40, app: 20 },
  { name: '04:00', requests: 200, transfers: 60, app: 30 },
  { name: '08:00', requests: 150, transfers: 50, app: 25 },
  { name: '12:00', requests: 400, transfers: 120, app: 80 },
  { name: '16:00', requests: 300, transfers: 90, app: 60 },
  { name: '20:00', requests: 250, transfers: 80, app: 50 },
  { name: '24:00', requests: 180, transfers: 55, app: 35 },
];

const mockVulnerableEndpoints = [
  { name: '/api/v1/auth', value: 400 },
  { name: '/api/v1/data', value: 300 },
  { name: '/wp-admin', value: 300 },
  { name: '/admin/config', value: 200 },
];

export default function Dashboard() {
  const [stats, setStats] = useState<any>({ total_attacks: 0, unique_ips: 0, severity_counts: { High: 0, Medium: 0, Low: 0 } });

  useEffect(() => {
    const loadData = async () => {
      const s = await fetchStats();
      setStats(s);
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalOpenIncidents = (stats?.severity_counts?.High || 0) + (stats?.severity_counts?.Medium || 0) + (stats?.severity_counts?.Low || 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 max-w-7xl mx-auto pb-10"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Command Center</h2>
          <p className="text-zinc-400 text-sm">Real-time threat monitoring and incident response.</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Generate Report
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open Incidents KPI */}
        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="h-full border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Activity className="w-32 h-32 text-red-500" />
            </div>
            <CardHeader action={<Maximize2 className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />}>
              Open Incidents
            </CardHeader>
            <CardContent className="pt-0 flex-grow flex flex-col justify-between">
              <div className="text-7xl font-bold text-white mb-6 tracking-tighter drop-shadow-md">
                {totalOpenIncidents > 0 ? totalOpenIncidents : 14}
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                <div>
                  <div className="text-xl font-bold text-red-500">{stats?.severity_counts?.High || 3}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-widest mt-1">High</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-400">{stats?.severity_counts?.Medium || 7}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-widest mt-1">Medium</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats?.severity_counts?.Low || 4}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-widest mt-1">Low</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risks Assessment */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader action={<Maximize2 className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />}>
              Risks Assessment
            </CardHeader>
            <CardContent className="pt-0 flex-grow">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-zinc-500 border-b border-white/5">
                      <th className="pb-3 font-medium w-1/3 tracking-wide">Issue</th>
                      <th className="pb-3 font-medium w-1/2 tracking-wide">Description</th>
                      <th className="pb-3 font-medium text-right tracking-wide">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockRisks.map((risk, i) => (
                      <motion.tr
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="hover:bg-white/5 transition-colors group cursor-pointer"
                      >
                        <td className="py-3.5 flex items-center gap-3 text-zinc-200 font-medium">
                          <AlertTriangle className="w-4 h-4 text-orange-500/70" />
                          {risk.issue}
                        </td>
                        <td className="py-3.5 text-zinc-400">{risk.desc}</td>
                        <td className="py-3.5 text-right">
                          <Badge variant={risk.sev.toLowerCase() as any}>{risk.sev}</Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader action={<Maximize2 className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />}>
              Network Activity
            </CardHeader>
            <CardContent className="pt-0 h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockNetworkActivity} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f4f4f5' }}
                  />
                  <Line type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#6366f1', stroke: '#18181b', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="transfers" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-xs text-zinc-400 font-medium">
                <span className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div> Server requests
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div> File transfers
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vulnerable Endpoints */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader action={<Maximize2 className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />}>
              Vulnerable Endpoints (Last 24h)
            </CardHeader>
            <CardContent className="pt-0 h-[300px] flex items-center">
              <div className="w-1/2 h-full flex flex-col justify-center gap-4 pl-4">
                {mockVulnerableEndpoints.map((entry, index) => (
                  <motion.div
                    whileHover={{ x: 5 }}
                    key={`legend-${index}`}
                    className="flex items-center justify-between text-sm group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-3 text-zinc-400 group-hover:text-white font-medium transition-colors">
                      <div className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 0 10px ${COLORS[index % COLORS.length]}80` }}></div>
                      {entry.name}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 text-indigo-400 text-xs font-semibold flex items-center gap-1">
                      Isolate <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="w-1/2 h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockVulnerableEndpoints}
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {mockVulnerableEndpoints.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-extrabold text-white drop-shadow-md">
                    {mockVulnerableEndpoints.reduce((a, b) => a + b.value, 0)}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-1">Total Hits</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
