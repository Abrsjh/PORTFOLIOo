import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';

const TechnologyCloud = () => {
  // Get all technologies with their frequency
  const techFrequency = projects.reduce((acc, project) => {
    project.technologies.forEach(tech => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort technologies by frequency and get top ones
  const topTechnologies = Object.entries(techFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  const getSize = (frequency: number) => {
    const maxFreq = Math.max(...Object.values(techFrequency));
    const minSize = 0.8;
    const maxSize = 2;
    return minSize + (frequency / maxFreq) * (maxSize - minSize);
  };

  const getColor = (index: number) => {
    const colors = [
      'text-blue-500',
      'text-green-500',
      'text-purple-500',
      'text-red-500',
      'text-yellow-500',
      'text-indigo-500',
      'text-pink-500',
      'text-teal-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h3
        className="text-2xl font-serif font-semibold text-center text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Technology Stack
      </motion.h3>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {topTechnologies.map(([tech, frequency], index) => (
          <motion.span
            key={tech}
            className={`font-semibold cursor-pointer transition-all duration-300 hover:scale-110 ${getColor(index)}`}
            style={{ fontSize: `${getSize(frequency)}rem` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 200 
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.2,
              rotate: Math.random() * 10 - 5,
            }}
            title={`Used in ${frequency} project${frequency > 1 ? 's' : ''}`}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="text-center text-gray-600 dark:text-gray-400 mt-6 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        Size indicates frequency of use across projects
      </motion.p>
    </motion.div>
  );
};

export default TechnologyCloud;