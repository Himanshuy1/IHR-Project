'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Activity, Users, Map as MapIcon, FileText, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Activity },
  { name: 'Incidents', path: '/incidents', icon: Shield },
  { name: 'Network Map', path: '/map', icon: MapIcon },
  { name: 'Access Logs', path: '/logs', icon: FileText },
  { name: 'Threat Intel', path: '/intel', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
          <Shield className="text-emerald-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>
        <h1 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text drop-shadow-md uppercase">
          SecureShield
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.path} className="relative group block">
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={cn(
                  'relative z-10 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'text-white' : 'text-text-muted group-hover:text-white'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  )}
                />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">System Online</span>
        </div>
      </div>
    </div>
  );
};
