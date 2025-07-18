import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import ParticleSystem from '@/components/ui/ParticleSystem';
import FloatingElements from '@/components/ui/FloatingElements';
import TypewriterText from '@/components/ui/TypewriterText';
import GlowButton from '@/components/ui/GlowButton';
import SoundToggle from '@/components/ui/SoundToggle';
import { useMousePositionNormalized } from '@/hooks/useMousePosition';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePositionNormalized();
  
  const titles = [
    'Creative Developer',
    'UI/UX Designer', 
    'Full Stack Engineer',
    'Digital Artist'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #667eea 0%, #764ba2 100%)
            `
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-60"
        />
      </div>
      
      {/* 3D Particle System */}
      <ParticleSystem mouse={mousePosition} />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-400/10 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Greeting */}
          <motion.p
            className="text-lg md:text-xl mb-4 font-light opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hello, I'm
          </motion.p>

          {/* Name with Typewriter Effect */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.1 }}
            >
              J
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.1 }}
            >
              o
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.1 }}
            >
              h
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.1 }}
            >
              n
            </motion.span>
            <motion.span
              className="inline-block ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.1 }}
            >
              D
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.1 }}
            >
              o
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.1 }}
            >
              e
            </motion.span>
          </motion.h1>

          {/* Animated Title */}
          <motion.div
            className="text-xl md:text-3xl lg:text-4xl font-light mb-8 opacity-90 h-16 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <TypewriterText 
              texts={titles}
              speed={150}
              deleteSpeed={100}
              delayBetween={3000}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            I craft beautiful, functional, and user-centered digital experiences 
            that make a difference in people's lives.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
          >
            <GlowButton
              variant="primary"
              size="lg"
              onClick={() => {
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-primary-600 hover:bg-gray-100 shadow-2xl"
              glowColor="rgba(255, 255, 255, 0.4)"
            >
              View My Work
            </GlowButton>
            
            <GlowButton
              variant="secondary"
              size="lg"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Mail className="mr-2" size={20} />
              Get In Touch
            </GlowButton>
          </motion.div>

          {/* Download Resume */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              <Download className="mr-2" size={16} />
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-200"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown size={24} />
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-accent-400/20 rounded-full backdrop-blur-sm border border-accent-400/30"
        animate={{ 
          y: [0, 20, 0], 
          rotate: [0, -180, -360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-primary-400/20 rounded-full backdrop-blur-sm border border-primary-400/30"
        animate={{ 
          y: [0, -15, 0], 
          x: [0, 10, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          rotate: { duration: 10, ease: "linear" }
        }}
        style={{
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * -8}px)`
        }}
      />
      
      {/* Additional geometric shapes */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-white/30 rotate-45"
        animate={{
          rotate: [45, 225, 405],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-8 h-1 bg-white/20 rounded-full"
        animate={{
          rotate: [0, 180, 360],
          scaleX: [1, 1.5, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Sound Toggle */}
      <SoundToggle />
    </section>
  );
};

export default Hero;