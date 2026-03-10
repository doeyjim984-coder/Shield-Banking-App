import { cn } from '../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("animate-pulse bg-white/10 rounded-lg", className)} />
  );
};
