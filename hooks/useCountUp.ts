import { useState, useEffect, useRef } from 'react';

export const useCountUp = (endValue: number, duration: number = 1200) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startValueRef.current = count; // Start animation from the current displayed value
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Use a smoother ease-out quint function
      const easedPercentage = 1 - Math.pow(1 - percentage, 5);
      
      const currentVal = startValueRef.current + (endValue - startValueRef.current) * easedPercentage;
      setCount(currentVal);

      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endValue, duration]);

  return count;
};