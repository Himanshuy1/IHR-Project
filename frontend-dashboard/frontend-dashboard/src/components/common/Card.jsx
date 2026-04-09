import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div 
      className={cn("bg-surface border border-border/50 rounded-2xl shadow-sm text-textMain overflow-hidden", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, action, ...props }) => {
  return (
    <div className={cn("px-6 py-5 border-b border-border/50 flex items-center justify-between", className)} {...props}>
      <h3 className="font-semibold text-textMain tracking-tight">
        {children}
      </h3>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
};
