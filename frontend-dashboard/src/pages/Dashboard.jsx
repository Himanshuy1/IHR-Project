import React, { useState, useEffect } from 'react';
import StatsPanel from '../components/StatsPanel';
import ChartPanel from '../components/ChartPanel';
import AttackTable from '../components/AttackTable';
import { fetchLogs, fetchStats } from '../services/api';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ total_attacks: 0, unique_ips: 0 });

  const loadData = async () => {
    const l = await fetchLogs();
    const s = await fetchStats();
    setLogs(l);
    setStats(s);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <StatsPanel stats={stats} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', gap: '1.5rem' }}>
         <ChartPanel logs={logs} />
      </div>
      <AttackTable logs={logs} limit={10} />
    </div>
  );
};
export default Dashboard;
