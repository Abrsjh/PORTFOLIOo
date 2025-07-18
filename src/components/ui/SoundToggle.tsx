import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Create a subtle ambient sound using Web Audio API
    const createAmbientSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(220, audioContext.currentTime);
        
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(330, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (isPlaying) {
          oscillator1.start();
          oscillator2.start();
          
          // Add some variation
          setInterval(() => {
            if (audioContext.state === 'running') {
              oscillator1.frequency.setValueAtTime(
                220 + Math.sin(Date.now() * 0.001) * 10,
                audioContext.currentTime
              );
              oscillator2.frequency.setValueAtTime(
                330 + Math.cos(Date.now() * 0.0015) * 15,
                audioContext.currentTime
              );
            }
          }, 100);
        } else {
          oscillator1.stop();
          oscillator2.stop();
        }

        setIsLoaded(true);
      } catch (error) {
        console.log('Web Audio API not supported');
        setIsLoaded(false);
      }
    };

    createAmbientSound();
  }, [isPlaying]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) {
    return null; // Don't show the toggle if audio isn't supported
  }

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <motion.button
        onClick={toggleSound}
        className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={20} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound waves animation */}
        {isPlaying && (
          <div className="absolute -inset-2 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-white/30 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
    </motion.div>
  );
};

export default SoundToggle;