
import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  formatter?: (value: number) => string;
}

const defaultFormatter = (value: number) => {
  if (value === 0) return '0.00';
  if (value < 10 && value !== Math.round(value)) {
      return value.toFixed(2);
  }
  if (value < 100 && value !== Math.round(value)) {
      return value.toFixed(1);
  }
  return Math.round(value).toLocaleString();
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className, formatter = defaultFormatter }) => {
  const count = useCountUp(value);

  return <span className={className}>{formatter(count)}</span>;
};

export default AnimatedNumber;
