'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Terminal, Play, CheckCircle, Clock, Server, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

export default function IncidentDetail() {
  const { id } = useParams();
  const router = useRouter();

  const mockIncident = {
    id,
    type: 'Login Bruteforce',
    severity: 'High',
    status: 'Open',
    time: '10:45 AM, May 18 2026',
    assignee: 'Admin',
    description: 'Multiple failed SSH login attempts from an unknown IP address targeting the root user account.',
    sourceIp: '192.168.1.5',
    targetAsset: 'Primary Database Server (10.0.0.50)',
    mitreTactics: ['Initial Access', 'Credential Access'],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 max-w-7xl mx-auto pb-10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                Incident #{id}
              </h1>
              <Badge variant={mockIncident.severity.toLowerCase() as any} className="ml-2">
                {mockIncident.severity}
              </Badge>
              <Badge variant="info">{mockIncident.status}</Badge>
            </div>
            <p className="text-zinc-400 text-sm ml-11">{mockIncident.type} - Detected {mockIncident.time}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface/50 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors border border-white/10">
            Acknowledge
          </button>
          <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-colors border border-emerald-500/30">
            Resolve Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Left Column: Details */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>Overview</CardHeader>
            <CardContent className="text-zinc-300 text-sm leading-relaxed">
              {mockIncident.description}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>Intelligence Analysis</CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Source IP</p>
                <div className="font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 inline-block">
                  {mockIncident.sourceIp}
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Target Asset</p>
                <div className="flex items-center gap-2 text-zinc-200">
                  <Server className="w-4 h-4 text-emerald-500" /> {mockIncident.targetAsset}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">MITRE ATT&CK Tactics</p>
                <div className="flex gap-2">
                  {mockIncident.mitreTactics.map((t) => (
                    <span key={t} className="px-3 py-1 bg-surface/80 rounded-lg text-xs text-zinc-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader action={<button className="text-indigo-400 text-xs hover:text-indigo-300">View Full Log</button>}>
              Raw Logs
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-black/50 border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto">
                <div className="text-emerald-500 mb-2"># Accessing secure log stream...</div>
                <div className="text-zinc-500">May 18 10:45:01 server sshd[1234]: Failed password for root from 192.168.1.5 port 54321 ssh2</div>
                <div className="text-zinc-500">May 18 10:45:02 server sshd[1234]: Failed password for root from 192.168.1.5 port 54321 ssh2</div>
                <div className="text-zinc-500">May 18 10:45:04 server sshd[1234]: Failed password for root from 192.168.1.5 port 54321 ssh2</div>
                <div className="text-red-400 mt-2">{'>>>'} POTENTIAL BRUTEFORCE DETECTED {'<<<'}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Playbooks & Timeline */}
        <motion.div variants={itemVariants} className="col-span-1 flex flex-col gap-6">
          <Card className="border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]">
            <CardHeader className="border-b border-indigo-500/10">Recommended Action Playbook</CardHeader>
            <CardContent className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-between p-3 bg-surface/50 hover:bg-white/5 rounded-xl border border-white/5 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">Block IP Address</p>
                    <p className="text-xs text-zinc-500">Add 192.168.1.5 to firewall denylist</p>
                  </div>
                </div>
                <Play className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-surface/50 hover:bg-white/5 rounded-xl border border-white/5 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">Isolate Asset</p>
                    <p className="text-xs text-zinc-500">Disconnect target from network</p>
                  </div>
                </div>
                <Play className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>Timeline</CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-white/10 ml-3 pl-6 flex flex-col gap-6">
                <div className="relative">
                  <div className="absolute -left-[31px] bg-red-500 w-3 h-3 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                  <p className="text-sm font-semibold text-zinc-200">Incident Detected</p>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> 10:45 AM</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] bg-indigo-500 w-3 h-3 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                  <p className="text-sm font-semibold text-zinc-200">Alert Triggered</p>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> 10:45 AM</p>
                </div>
                <div className="relative opacity-50">
                  <div className="absolute -left-[31px] bg-zinc-600 w-3 h-3 rounded-full"></div>
                  <p className="text-sm font-semibold text-zinc-200">Mitigation Applied</p>
                  <p className="text-xs text-zinc-500 mt-1">Pending action...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
