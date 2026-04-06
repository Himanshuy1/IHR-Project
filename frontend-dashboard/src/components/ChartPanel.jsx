import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ChartPanel = ({ logs }) => {
  
  const chartData = useMemo(() => {
    if (!logs || logs.length === 0) return [];
    const pathCounts = {};
    logs.forEach(log => {
      pathCounts[log.attack_path] = (pathCounts[log.attack_path] || 0) + 1;
    });
    
    return Object.keys(pathCounts).map(path => ({
      name: path.length > 15 ? path.substring(0,15)+"..." : path,
      attacks: pathCounts[path]
    })).sort((a,b) => b.attacks - a.attacks).slice(0, 5);
  }, [logs]);

  return (
    <div className="glass-panel">
      <div className="header-row">
        <h3>Top Targeted Endpoints</h3>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#8b949e" />
            <YAxis stroke="#8b949e" allowDecimals={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0d1117', borderColor: 'rgba(255,255,255,0.1)' }}
              itemStyle={{ color: '#00ffcc' }}
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
            />
            <Bar dataKey="attacks" fill="#00ffcc" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartPanel;
