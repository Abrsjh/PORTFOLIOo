import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  glowColor?: string;
}

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  glowColor,
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const glowColors = {
    primary: 'rgba(59, 130, 246, 0.5)',
    secondary: 'rgba(255, 255, 255, 0.3)',
    accent: 'rgba(245, 158, 11, 0.5)',
  };

  const currentGlowColor = glowColor || glowColors[variant];

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
      style={{
        boxShadow: `0 0 20px ${currentGlowColor}`,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${currentGlowColor} 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{
          scale: 1,
          opacity: 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
        }}
      />
    </motion.button>
  );
};

export default GlowButton;