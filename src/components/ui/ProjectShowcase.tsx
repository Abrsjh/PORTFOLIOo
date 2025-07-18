import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react';
import { projects } from '@/data/portfolio';

const ProjectShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = projects.filter(p => p.featured);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const currentProject = featuredProjects[currentIndex];

  if (!currentProject) return null;

  return (
    <motion.div
      className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-3xl p-8 md:p-12 mb-16 overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Featured Project Spotlight
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Highlighting my most impactful work
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Image/Demo */}
          <motion.div
            className="relative"
            key={currentProject.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Project Preview */}
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                {currentProject.image}
              </div>

              {/* Play Button Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="text-white ml-1" size={32} />
                </motion.div>
              </motion.div>

              {/* Navigation Arrows */}
              <motion.button
                onClick={prevProject}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                onClick={nextProject}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-500 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            className="space-y-6"
            key={`details-${currentProject.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <motion.h4
                className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2"
                layoutId={`showcase-title-${currentProject.id}`}
              >
                {currentProject.title}
              </motion.h4>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>{currentProject.year}</span>
                {currentProject.client && (
                  <>
                    <span>•</span>
                    <span>{currentProject.client}</span>
                  </>
                )}
                <span>•</span>
                <span className="capitalize">{currentProject.category}</span>
              </div>
            </div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              layoutId={`showcase-description-${currentProject.id}`}
            >
              {currentProject.longDescription || currentProject.description}
            </motion.p>

            {/* Technologies */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                Technologies Used
              </h5>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {currentProject.liveUrl && (
                <motion.a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="mr-2" size={18} />
                  View Live
                </motion.a>
              )}
              
              {currentProject.githubUrl && (
                <motion.a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="mr-2" size={18} />
                  Source Code
                </motion.a>
              )}
            </div>

            {/* Testimonial */}
            {currentProject.testimonial && (
              <motion.div
                className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{currentProject.testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {currentProject.testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentProject.testimonial.position}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;