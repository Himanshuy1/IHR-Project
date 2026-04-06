import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, Clock, Server, FileText, Bug, Layout, Play, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import { Card, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const IncidentDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const TABS = ['Overview', 'Insights', 'Timeline', 'Link Analysis', 'Alerts & Rules', 'Raw Logs'];

  const timelineEvents = [
    { time: '00:23:05', action: 'Initial Access', detail: 'Suspicious file downloaded via wgetFile.exe', type: 'warning' },
    { time: '00:25:10', action: 'Execution', detail: 'Child process cmd.exe spawned by word.exe', type: 'danger' },
    { time: '00:27:45', action: 'Lateral Movement', detail: 'SMB network scanning detected on subnet 10.0.1.X', type: 'warning' },
    { time: '00:30:10', action: 'Mitigation', detail: 'Endpoint isolated by EDR', type: 'success' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10 h-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-textMuted font-medium pt-2">
        <Link to="/" className="hover:text-white transition-colors">Discover</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/incidents" className="hover:text-white transition-colors">Alerts</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/incidents" className="hover:text-white transition-colors">Incidents</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">ID: {id || '123245'}</span>
      </div>

      {/* Hero Header */}
      <Card className="bg-gradient-to-r from-bg to-surface border-border overflow-visible">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">ID-{id || '123245'}</h1>
                <Badge variant="high">HIGH</Badge>
                <input 
                  type="text" 
                  placeholder="Add incident name..." 
                  className="bg-transparent border-b border-dashed border-border/50 focus:border-indigo-500 outline-none text-textMuted text-sm ml-2 w-48 transition-colors hover:border-gray-500" 
                />
              </div>
              <p className="text-textMuted mt-4 max-w-4xl text-sm leading-relaxed">
                <strong className="text-white">Endpoint-03</strong> was found to be infected with DarkSide ransomware. 
                The ransomware has encrypted files on the endpoint and has also propagated to some shared network drives. 
                The endpoint has temporarily been isolated from the network.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <button className="flex items-center gap-2 text-primary hover:text-indigo-300 text-sm font-medium transition-colors">
                Follow up
              </button>
              <button className="flex items-center gap-2 text-textMuted hover:text-white text-sm font-medium transition-colors">
                Assign
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unified Split-Pane Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-grow">
        
        {/* Left Pane (Context & Details) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-border/50">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-primary text-white bg-surface/50 rounded-t-lg' 
                    : 'border-transparent text-textMuted hover:text-white hover:bg-surface/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Overview' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in">
              <Card className="flex flex-col items-center justify-center p-6 bg-[#1f2028]">
                <span className="text-textMuted text-xs uppercase font-bold tracking-wider mb-2">Type</span>
                <Bug className="text-red-500 mb-1" />
                <span className="font-semibold text-white text-center text-sm">Malware Infection</span>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 bg-[#1f2028]">
                <span className="text-textMuted text-xs uppercase font-bold tracking-wider mb-2">Affected Users</span>
                <span className="text-4xl font-bold text-white">5</span>
              </Card>
              <Card className="md:col-span-2 p-4 bg-[#1f2028] flex flex-col justify-center">
                <span className="text-textMuted text-xs uppercase font-bold tracking-wider mb-3 block text-center">Impact</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs">File Encryption</span>
                  <span className="px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-xs">System Downtime</span>
                  <span className="px-3 py-1 rounded border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs">Data Loss</span>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'Raw Logs' && (
             <Card className="bg-[#16171d] border-border animate-in fade-in h-64 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center px-4 py-2 bg-surface border-b border-border">
                  <span className="font-mono text-xs text-textMuted">syslog.log</span>
                  <button className="text-textMuted hover:text-white flex items-center gap-1 text-xs"><Copy className="w-3 h-3"/> Copy</button>
                </div>
                <div className="p-4 font-mono text-xs text-gray-300 overflow-y-auto flex-grow flex flex-col gap-1">
                  <div className="flex gap-4"><span className="text-gray-500">2023-04-28 00:23:05</span><span className="text-red-400">WARN [auth] SSH brute force attempt detected from 192.168.1.45</span></div>
                  <div className="flex gap-4"><span className="text-gray-500">2023-04-28 00:25:10</span><span className="text-orange-400">INFO [net] Process cmd.exe initiated external connection</span></div>
                  <div className="flex gap-4"><span className="text-gray-500">2023-04-28 00:30:10</span><span className="text-indigo-400">SYSTEM [edr] Isolation policy applied to Endpoint-03</span></div>
                </div>
             </Card>
          )}

          {/* Issue Owner Details */}
           <Card className="bg-surface/50 border-border">
            <CardContent className="p-5 flex justify-between items-center">
               <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Issuing Team</h4>
                  <div className="text-sm text-textMuted flex gap-6">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Emily Garcia (Owner)</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-500"></div> Marcus Lee</span>
                  </div>
               </div>
               <button className="border border-border bg-bg hover:bg-surface px-4 py-2 rounded text-sm text-white transition-colors">Manage Team</button>
            </CardContent>
          </Card>
        </div>

        {/* Right Pane (Live Timeline) */}
        <div className="xl:col-span-1">
          <Card className="h-full min-h-[500px] border-border bg-gradient-to-b from-[#1f2028] to-bg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white tracking-tight">Execution Timeline</h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
              
              <div className="relative border-l border-border/50 ml-3 space-y-6">
                {timelineEvents.map((event, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Timeline dot */}
                    <div className={`absolute left-[-5.5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[#1f2028] ${
                      event.type === 'danger' ? 'bg-red-500' :
                      event.type === 'warning' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></div>
                    
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-textMuted">{event.time}</span>
                      <span className="text-sm font-semibold text-white">{event.action}</span>
                      <span className="text-xs text-textMuted leading-relaxed">{event.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 border border-dashed border-border/70 rounded-lg p-4 flex flex-col gap-3">
                 <h4 className="text-sm font-semibold text-white mb-2 border-b border-border pb-2">Status Progression</h4>
                 <div className="flex gap-2">
                    <button className="flex-1 bg-green-500/10 text-green-500 border border-green-500/30 rounded py-1.5 text-xs font-bold hover:bg-green-500/20 transition-colors">ACKNOWLEDGE</button>
                    <button className="flex-1 bg-surface text-white border border-border rounded py-1.5 text-xs font-bold hover:bg-border transition-colors">INVESTIGATE</button>
                 </div>
                 <button className="w-full bg-primary hover:bg-indigo-500 text-white border border-primary rounded py-1.5 text-xs font-bold transition-colors">MARK RESOLVED</button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default IncidentDetail;
