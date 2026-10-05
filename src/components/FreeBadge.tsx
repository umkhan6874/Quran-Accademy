import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FreeBadgeProps {
  className?: string;
}

export const FreeBadge: React.FC<FreeBadgeProps> = ({ className = '' }) => {
  return (
    <span className={`badge-free ${className}`}>
      <CheckCircle2 size={13} />
      <span>100% FREE FOREVER</span>
    </span>
  );
};
