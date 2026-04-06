import React from 'react';

const AttackTable = ({ logs, limit }) => {
  const displayLogs = limit ? logs.slice(0, limit) : logs;
  
  return (
    <div className="glass-panel">
      <div className="header-row">
        <h3>{limit ? "Recent Attacks" : "All Attack Logs"}</h3>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>IP Address</th>
              <th>Method</th>
              <th>Target Path</th>
            </tr>
          </thead>
          <tbody>
            {!displayLogs || displayLogs.length === 0 ? (
              <tr><td colSpan="4" style={{textAlign:'center', color:'#8b949e'}}>No attacks logged yet. Waiting for honeypot triggers.</td></tr>
            ) : (
              displayLogs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td style={{fontFamily:'monospace', color:'#ff4d4d'}}>{log.ip_address}</td>
                  <td><span className={`badge method-${log.request_method}`}>{log.request_method}</span></td>
                  <td style={{fontFamily:'monospace'}}>{log.attack_path}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttackTable;
