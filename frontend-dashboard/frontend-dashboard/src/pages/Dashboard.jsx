import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Users, Server, Maximize2, ServerCrash, AlertTriangle, ArrowUpRight, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { fetchLogs, fetchStats } from '../services/api';
// Normally we would use Recharts here for the visual charts
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#ef4444', '#f97316', '#3b82f6'];

const Dashboard = () => {
  const [, setLogs] = useState([]);
  const [stats, setStats] = useState({ total_attacks: 0, unique_ips: 0 });

  useEffect(() => {
    const loadData = async () => {
      const l = await fetchLogs();
      const s = await fetchStats();
      setLogs(l);
      setStats(s);
    };
    loadData();
    const interval = setInterval(loadData, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
      
      {/* Top Banner Context */}
      <div className="mb-2 flex items-center gap-3">
        <div className="p-1.5 bg-emerald-500/10 rounded-md border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
          <Shield className="text-emerald-400 w-6 h-6 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text drop-shadow-md pb-1 uppercase">
          SecureShield<span className="font-mono text-emerald-400/80 text-xl md:text-2xl ml-1">AI</span>
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-textMain">Overview</h2>
          <p className="text-textMuted text-sm mt-1">Real-time threat monitoring and incident response.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface hover:bg-border/50 border border-border/50 rounded-lg text-sm font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Row 1: KPI & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open Incidents KPI */}
        <Card className="col-span-1 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] focus-within:ring-1">
          <CardHeader action={<Maximize2 className="w-4 h-4 text-textMuted cursor-pointer hover:text-white" />}>
            Open Incidents
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-6xl font-bold text-textMain mb-6">{(stats?.severity_counts?.High || 0) + (stats?.severity_counts?.Medium || 0) + (stats?.severity_counts?.Low || 0)}</div>
            <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-4">
              <div>
                <div className="text-lg font-bold text-red-500">{stats?.severity_counts?.High || 0}</div>
                <div className="text-xs text-textMuted uppercase font-semibold tracking-wider">High</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-400">{stats?.severity_counts?.Medium || 0}</div>
                <div className="text-xs text-textMuted uppercase font-semibold tracking-wider">Medium</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-400">{stats?.severity_counts?.Low || 0}</div>
                <div className="text-xs text-textMuted uppercase font-semibold tracking-wider">Low</div>
              </div>
            </div>
            {/* Real Data Integration Example */}
            <div className="mt-4 text-xs text-textMuted flex justify-between items-center bg-surface/50 p-2 rounded">
              <span>Total Attacks Logged:</span>
              <span className="font-mono text-indigo-400">{stats.total_attacks}</span>
            </div>
          </CardContent>
        </Card>

        {/* Risks Assessment */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col">
          <CardHeader action={<Maximize2 className="w-4 h-4 text-textMuted cursor-pointer hover:text-white" />}>
            Risks Assessment (4)
          </CardHeader>
          <CardContent className="pt-0 flex-grow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-textMuted border-b border-border/50">
                    <th className="pb-3 font-semibold w-1/3">Issue</th>
                    <th className="pb-3 font-semibold w-1/2">Description</th>
                    <th className="pb-3 font-semibold text-right">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {(stats?.risks_assessment || []).map((risk, i) => (
                    <tr key={i} className="hover:bg-surface/50 transition-colors group cursor-pointer">
                      <td className="py-3 items-center gap-2 text-gray-200">
                        <AlertTriangle className="w-4 h-4 inline mr-2 text-orange-500/70" />
                        {risk.issue}
                      </td>
                      <td className="py-3 text-textMuted">{risk.desc}</td>
                      <td className="py-3 text-right">
                        <Badge variant={risk.sev.toLowerCase()}>{risk.sev}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Network Activity */}
        <Card>
          <CardHeader action={<Maximize2 className="w-4 h-4 text-textMuted cursor-pointer hover:text-white" />}>
            Network Activity
          </CardHeader>
          <CardContent className="pt-0 h-[260px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.network_activity || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f3f4f6' }}
                />
                <Line type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="transfers" stroke="#a855f7" strokeWidth={2} dot={false} opacity={0.5} />
                <Line type="monotone" dataKey="app" stroke="#6366f1" strokeWidth={2} dot={false} opacity={0.2} />
              </LineChart>
            </ResponsiveContainer>
            {/* Added Legend per Actionable feedback */}
            <div className="flex justify-center gap-6 mt-2 text-xs text-textMuted">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Server requests</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500 opacity-50"></div> File transfers</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500 opacity-20"></div> App usage</span>
            </div>
          </CardContent>
        </Card>

        {/* Vulnerable Endpoints (Actionable) */}
        <Card>
          <CardHeader action={<Maximize2 className="w-4 h-4 text-textMuted cursor-pointer hover:text-white" />}>
            Vulnerable endpoints - Last 24h
          </CardHeader>
          <CardContent className="pt-0 h-[260px] flex items-center">
             <div className="w-1/2 h-full flex flex-col justify-center gap-3">
                {(stats?.vulnerable_endpoints || []).map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center justify-between text-sm group cursor-pointer">
                    <span className="flex items-center gap-2 text-textMuted group-hover:text-white transition-colors">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      {entry.name}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 text-indigo-400 text-xs">Isolate</button>
                  </div>
                ))}
            </div>
            <div className="w-1/2 h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats?.vulnerable_endpoints || []} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {(stats?.vulnerable_endpoints || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-bold text-white">{(stats?.vulnerable_endpoints || []).reduce((a, b) => a + b.value, 0)}</span>
                 <span className="text-xs text-textMuted uppercase tracking-wider">Total</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
