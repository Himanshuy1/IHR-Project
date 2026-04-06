import React, { useState, useEffect } from 'react';
import AttackTable from '../components/AttackTable';
import { fetchLogs } from '../services/api';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  const loadData = async () => {
    const l = await fetchLogs();
    setLogs(l);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="glass-panel" style={{marginBottom: '0'}}>
        <h2 style={{marginTop:0}}>Complete Attack Logs</h2>
        <p style={{color:'var(--text-muted)', marginBottom: '0'}}>All intercepted malicious requests against the honeypot are displayed below.</p>
      </div>
      <AttackTable logs={logs} />
    </div>
  );
};
export default Logs;
