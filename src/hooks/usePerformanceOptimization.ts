import { useEffect, useState, useCallback } from 'react';
import { getDevicePerformanceTier, getOptimizedAnimationConfig, prefersReducedMotion } from '@/utils/performance';

interface PerformanceConfig {
  tier: 'low' | 'medium' | 'high';
  reducedMotion: boolean;
  animationConfig: {
    duration: number;
    ease: string;
    stagger: number;
    particles: number;
  };
  shouldOptimize: boolean;
}

export const usePerformanceOptimization = (): PerformanceConfig => {
  const [config, setConfig] = useState<PerformanceConfig>(() => ({
    tier: 'medium',
    reducedMotion: false,
    animationConfig: getOptimizedAnimationConfig(),
    shouldOptimize: false,
  }));

  useEffect(() => {
    const updateConfig = () => {
      const tier = getDevicePerformanceTier();
      const reducedMotion = prefersReducedMotion();
      const animationConfig = getOptimizedAnimationConfig();
      const shouldOptimize = tier === 'low' || reducedMotion;

      setConfig({
        tier,
        reducedMotion,
        animationConfig,
        shouldOptimize,
      });
    };

    updateConfig();

    // Listen for changes in motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => updateConfig();
    
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return config;
};

export const useOptimizedAnimation = (baseConfig: any) => {
  const { animationConfig, shouldOptimize } = usePerformanceOptimization();

  return useCallback(() => {
    if (shouldOptimize) {
      return {
        ...baseConfig,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        transition: {
          ...baseConfig.transition,
          duration: animationConfig.duration,
          ease: animationConfig.ease,
        },
      };
    }
    return baseConfig;
  }, [baseConfig, animationConfig, shouldOptimize]);
};

export const useOptimizedParticles = (baseCount: number) => {
  const { animationConfig } = usePerformanceOptimization();
  
  return Math.min(baseCount, animationConfig.particles);
};

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
};