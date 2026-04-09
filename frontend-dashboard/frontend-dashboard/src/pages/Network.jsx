import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/common/Card';
import { Maximize2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchNetworkActivity } from '../services/api';

const Network = () => {
  const [networkData, setNetworkData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchNetworkActivity();
      setNetworkData(data || []);
    };
    loadData();
    const interval = setInterval(loadData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
      <div className="mb-2 flex items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest text-indigo-400 drop-shadow-md pb-1 uppercase">
          Network Activity
        </h1>
      </div>
      <Card>
        <CardHeader action={<Maximize2 className="w-4 h-4 text-textMuted cursor-pointer hover:text-white" />}>
          Live Network Traffic
        </CardHeader>
        <CardContent className="pt-0 h-[320px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="timestamp" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '8px' }} itemStyle={{ color: '#f3f4f6' }} />
              <Line type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="transfers" stroke="#a855f7" strokeWidth={2} dot={false} opacity={0.5} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Recent Network Events</CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-textMuted border-b border-border/50">
                <th className="pb-3 font-semibold">Time</th>
                <th className="pb-3 font-semibold">Source IP</th>
                <th className="pb-3 font-semibold">Destination IP</th>
                <th className="pb-3 font-semibold">Action</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {(networkData.slice(-10).reverse() || []).map((event, i) => (
                <tr key={i}>
                  <td className="py-2">{event.timestamp}</td>
                  <td className="py-2">{event.src_ip}</td>
                  <td className="py-2">{event.dst_ip}</td>
                  <td className="py-2">{event.action}</td>
                  <td className="py-2">{event.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Network;
