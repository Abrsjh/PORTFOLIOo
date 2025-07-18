import { useEffect, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export const useScrollAnimation = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return {
    scrollY,
    scrollYProgress,
    isScrolled,
  };
};

export const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

export const useScrollOpacity = (value: MotionValue<number>) => {
  return useTransform(value, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0]);
};

export const useScrollScale = (value: MotionValue<number>) => {
  return useTransform(value, [0, 0.5, 1], [1, 0.95, 0.9]);
};