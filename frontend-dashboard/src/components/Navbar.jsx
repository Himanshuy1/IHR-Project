import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldAlert color="#00ffcc" size={28} />
        <h1>SecureShieldAI</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/logs">Raw Logs</NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
