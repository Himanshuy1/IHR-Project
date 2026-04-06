import React from 'react';
import { Search, Bell, Mail, User } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="h-16 px-6 shrink-0 flex items-center justify-between border-b border-border/50 bg-bg z-10">
      {/* Left side empty or Breadcrumbs in the future */}
      <div className="flex-grow">
        {/* Connection Pulse */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-green-400 font-mono tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="p-2 text-textMuted hover:text-textMain transition-colors hover:bg-surface rounded-lg">
          <Search size={20} />
        </button>
        
        {/* Notifications */}
        <button className="p-2 text-textMuted hover:text-textMain transition-colors hover:bg-surface rounded-lg relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-bg"></span>
        </button>
        
        {/* Messages */}
        <button className="p-2 text-textMuted hover:text-textMain transition-colors hover:bg-surface rounded-lg">
          <Mail size={20} />
        </button>

        <div className="h-6 gap-0 border-l border-border/50 mx-1"></div>

        {/* Profile */}
        <button className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
          <User size={16} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
