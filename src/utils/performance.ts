// Performance optimization utilities

/**
 * Debounce function to limit the rate of function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func(...args);
    }, wait);
    
    if (callNow) func(...args);
  };
};

/**
 * Throttle function to limit the rate of function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Intersection Observer hook for lazy loading
 */
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string, type?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

/**
 * Preload images
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get device performance tier
 */
export const getDevicePerformanceTier = (): 'low' | 'medium' | 'high' => {
  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  
  // Check for device memory (if available)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Check for connection speed
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType || '4g';
  
  // Simple heuristic for performance tier
  if (cores >= 8 && memory >= 8 && effectiveType === '4g') {
    return 'high';
  } else if (cores >= 4 && memory >= 4) {
    return 'medium';
  } else {
    return 'low';
  }
};

/**
 * Optimize animations based on device performance
 */
export const getOptimizedAnimationConfig = () => {
  const tier = getDevicePerformanceTier();
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      duration: 0.01,
      ease: 'linear',
      stagger: 0,
      particles: 0,
    };
  }

  switch (tier) {
    case 'high':
      return {
        duration: 0.6,
        ease: 'easeOut',
        stagger: 0.1,
        particles: 100,
      };
    case 'medium':
      return {
        duration: 0.4,
        ease: 'easeOut',
        stagger: 0.05,
        particles: 50,
      };
    case 'low':
      return {
        duration: 0.2,
        ease: 'linear',
        stagger: 0.02,
        particles: 20,
      };
    default:
      return {
        duration: 0.4,
        ease: 'easeOut',
        stagger: 0.05,
        particles: 50,
      };
  }
};

/**
 * Measure and report Core Web Vitals
 */
export const measureWebVitals = () => {
  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const observeFID = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    observer.observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  };

  // First Contentful Paint (FCP)
  const observeFCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FCP:', entry.startTime);
      });
    });
    observer.observe({ entryTypes: ['paint'] });
  };

  // Time to First Byte (TTFB)
  const measureTTFB = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const ttfb = navigation.responseStart - navigation.requestStart;
    console.log('TTFB:', ttfb);
  };

  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    measureTTFB();
  }
};

/**
 * Bundle size analyzer helper
 */
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build');
    return;
  }

  // This would typically be used with webpack-bundle-analyzer
  console.log('Use npm run build:analyze to analyze bundle size');
};

/**
 * Memory usage monitor
 */
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
    });
  }
};

/**
 * Network information
 */
export const getNetworkInfo = () => {
  const connection = (navigator as any).connection;
  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  return null;
};