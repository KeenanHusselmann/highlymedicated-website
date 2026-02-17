'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  glossy?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  glossy = true,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: glossy
      ? 'btn-glossy text-white focus:ring-primary'
      : 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: glossy
      ? 'btn-glossy btn-glossy-secondary text-white focus:ring-secondary'
      : 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
    accent: glossy
      ? 'btn-glossy btn-glossy-accent text-white focus:ring-accent'
      : 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost:
      'text-dark hover:bg-dark/5 focus:ring-dark',
  };

  return (
    <motion.button
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
      {glossy && variant !== 'outline' && variant !== 'ghost' && (
        <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      )}
    </motion.button>
  );
}
