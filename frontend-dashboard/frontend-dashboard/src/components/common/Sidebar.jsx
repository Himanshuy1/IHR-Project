import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Map, Network, FileText, Settings, HelpCircle, ShieldAlert } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const NavItem = ({ to, icon: Icon, exact = false }) => {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group relative ${
          isActive 
            ? 'bg-surface text-textMain shadow-[0_2px_10px_rgba(0,0,0,0.5)]' 
            : 'text-textMuted hover:text-textMain hover:bg-surface/50'
        }`
      }
    >
      <Icon size={22} strokeWidth={1.5} />
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-[88px] h-full bg-[#1e1f26] border-r border-[#2a2b36] flex flex-col items-center py-6 shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      {/* Logo Area */}
      <div className="mb-10 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
        <ShieldAlert className="text-primary w-6 h-6" />
      </div>

      {/* Primary Nav */}
      <nav className="flex flex-col gap-4 flex-grow">
        <NavItem to="/" icon={Home} exact />
        <NavItem to="/incidents" icon={LayoutGrid} />
        <NavItem to="/map" icon={Map} />
        <NavItem to="/network" icon={Network} />
        <NavItem to="/logs" icon={FileText} />
      </nav>

      {/* Bottom Nav */}
      <nav className="flex flex-col gap-4 mt-auto">
        <NavItem to="/settings" icon={Settings} />
        <NavItem to="/help" icon={HelpCircle} />
      </nav>
    </aside>
  );
};

export default Sidebar;
