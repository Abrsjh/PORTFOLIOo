import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe, Smartphone, Database } from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { icon: Code, position: { top: '10%', left: '10%' }, delay: 0 },
    { icon: Palette, position: { top: '20%', right: '15%' }, delay: 0.5 },
    { icon: Zap, position: { bottom: '30%', left: '8%' }, delay: 1 },
    { icon: Globe, position: { top: '60%', right: '10%' }, delay: 1.5 },
    { icon: Smartphone, position: { bottom: '20%', right: '20%' }, delay: 2 },
    { icon: Database, position: { top: '40%', left: '5%' }, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/60"
          style={element.position}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            delay: element.delay,
            duration: 1,
            y: {
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ 
            scale: 1.2, 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transition: { duration: 0.2 }
          }}
        >
          <element.icon size={24} />
        </motion.div>
      ))}
      
      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-4 h-4 bg-accent-400/30 rotate-45"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 border-2 border-primary-300/40 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-2/3 left-1/4 w-8 h-1 bg-white/20"
        animate={{
          rotate: [0, 180, 360],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default FloatingElements;