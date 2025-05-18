import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export function LoadingSpinner({ className, size = 24 }: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn('animate-spin text-primary', className)}
      style={{ width: size, height: size }}
      aria-label="Loading..."
    />
  );
}
