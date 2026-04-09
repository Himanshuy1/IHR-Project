import React from 'react';
import { cn } from '../../utils/cn'; // reuse utility

export const Badge = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-surface border-border text-textMuted',
    high: 'bg-red-500/10 border-red-500/20 text-red-500',
    medium: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    low: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    info: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
