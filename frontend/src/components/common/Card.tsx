import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('glass-panel glass-panel-hover rounded-2xl overflow-hidden', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ className, children, action }: CardProps & { action?: React.ReactNode }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-white/10 flex justify-between items-center', className)}>
      <h3 className="font-semibold text-lg text-foreground tracking-wide">{children}</h3>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent = ({ className, children }: CardProps) => {
  return <div className={cn('p-6', className)}>{children}</div>;
};
