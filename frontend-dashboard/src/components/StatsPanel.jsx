import React from 'react';
import { Shield, Target, AlertTriangle, Activity } from 'lucide-react';

const StatsPanel = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="glass-panel stat-card">
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span className="stat-title">Total Attacks</span>
          <Target color="#ff4d4d" size={20} />
        </div>
        <span className="stat-value">{stats.total_attacks || 0}</span>
      </div>
      
      <div className="glass-panel stat-card">
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span className="stat-title">Unique Target IPs</span>
          <Shield color="#00ffcc" size={20} />
        </div>
        <span className="stat-value">{stats.unique_ips || 0}</span>
      </div>

      <div className="glass-panel stat-card">
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span className="stat-title">Status</span>
          <Activity color="#00aaff" size={20} />
        </div>
        <span className="stat-value" style={{color: '#00ffcc', fontSize: '1.5rem', marginTop: 'auto'}}>Monitoring Active</span>
      </div>
    </div>
  );
}
export default StatsPanel;
