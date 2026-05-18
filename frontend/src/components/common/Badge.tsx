import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'high' | 'medium' | 'low' | 'info' | 'success';
}

export const Badge = ({ className, variant = 'info', children, ...props }: BadgeProps) => {
  const variants = {
    high: 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]',
    medium: 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    info: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider backdrop-blur-md',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
