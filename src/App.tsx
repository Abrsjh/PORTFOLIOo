import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ScrollToTop from '@/components/ui/ScrollToTop';
import MouseFollower from '@/components/ui/MouseFollower';
import LiveChat from '@/components/ui/LiveChat';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import ServiceWorkerUpdate from '@/components/ui/ServiceWorkerUpdate';
import SEOHead from '@/components/ui/SEOHead';
import { ThemeProvider } from '@/hooks/useTheme';
import { measureWebVitals } from '@/utils/performance';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Measure Core Web Vitals
    if (typeof window !== 'undefined') {
      measureWebVitals();
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SEOHead />
        <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Header />
                <main>
                  <Hero />
                  <About />
                  <Projects />
                  <Contact />
                </main>
                <Footer />
                <ScrollToTop />
                <MouseFollower />
                <LiveChat />
                <ServiceWorkerUpdate />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;