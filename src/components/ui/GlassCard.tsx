'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'dark' | 'subtle';
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className,
  variant = 'default',
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'glass-card',
    dark: 'glass-dark rounded-2xl',
    subtle: 'bg-white/10 backdrop-blur-sm border border-primary/40 rounded-2xl',
  };

  return (
    <motion.div
      className={cn(
        variants[variant],
        'rounded-2xl',
        hover && 'cursor-pointer',
        glow && 'animate-pulse-glow',
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
