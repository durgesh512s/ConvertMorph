'use client';

import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function Progress({
  value,
  max = 100,
  className,
  showPercentage = true,
  size = 'md',
  variant = 'default'
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
          <span>{Math.round(percentage)}%</span>
          <span className="text-xs">
            {value} / {max}
          </span>
        </div>
      )}
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  showPercentage = true,
  variant = 'default'
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const variantColors = {
    default: 'stroke-primary',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    error: 'stroke-red-500'
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-out', variantColors[variant])}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

interface ProgressWithStatusProps {
  value: number;
  max?: number;
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
  className?: string;
}

export function ProgressWithStatus({
  value,
  max = 100,
  status,
  message,
  className
}: ProgressWithStatusProps) {
  const getVariant = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'processing':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        );
      case 'success':
        return (
          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {message || status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round((value / max) * 100)}%
        </span>
      </div>
      <Progress
        value={value}
        max={max}
        variant={getVariant()}
        showPercentage={false}
      />
    </div>
  );
}
