import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Calendar, User, Award } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="group relative bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Featured Badge */}
      {project.featured && (
        <motion.div
          className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-accent-400 to-accent-600 text-white text-xs font-semibold rounded-full"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
        >
          <Award className="inline mr-1" size={12} />
          Featured
        </motion.div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
        {/* Placeholder with project emoji/icon */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {project.image.startsWith('http') ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ 
                scale: imageLoaded ? 1 : 1.2, 
                opacity: imageLoaded ? 1 : 0 
              }}
              transition={{ duration: 0.6 }}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <motion.span
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {project.image}
            </motion.span>
          )}
        </div>

        {/* Overlay with Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/70 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => onViewDetails(project)}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Eye size={20} />
              </motion.button>

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ExternalLink size={20} />
                </motion.a>
              )}

              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Github size={20} />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        <div className="absolute top-4 left-4">
          <motion.div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === 'completed'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : project.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {project.status === 'completed' ? '✓ Complete' : 
             project.status === 'in-progress' ? '⚡ In Progress' : '📋 Planned'}
          </motion.div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        {/* Title and Year */}
        <div className="flex items-start justify-between">
          <motion.h3
            className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200"
            layoutId={`title-${project.id}`}
          >
            {project.title}
          </motion.h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} className="mr-1" />
            {project.year}
          </div>
        </div>

        {/* Client */}
        {project.client && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <User size={14} className="mr-2" />
            {project.client}
          </div>
        )}

        {/* Description */}
        <motion.p
          className="text-gray-600 dark:text-gray-300 leading-relaxed"
          layoutId={`description-${project.id}`}
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.5 + techIndex * 0.05,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <motion.span
              className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.7,
                type: "spring",
                stiffness: 200
              }}
            >
              +{project.technologies.length - 4} more
            </motion.span>
          )}
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={() => onViewDetails(project)}
          className="w-full mt-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center">
            View Details
            <motion.div
              className="ml-2"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.div>
          </span>
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
          filter: 'blur(20px)',
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;