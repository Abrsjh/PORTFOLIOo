import { motion } from 'framer-motion';
import { Code, Users, Award, Calendar } from 'lucide-react';
import { projects } from '@/data/portfolio';

const ProjectStats = () => {
  const stats = [
    {
      icon: Code,
      label: 'Projects Completed',
      value: projects.filter(p => p.status === 'completed').length,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Users,
      label: 'Happy Clients',
      value: new Set(projects.filter(p => p.client).map(p => p.client)).size,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Award,
      label: 'Featured Projects',
      value: projects.filter(p => p.featured).length,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: Calendar,
      label: 'Years Experience',
      value: new Date().getFullYear() - Math.min(...projects.map(p => p.year)) + 1,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <stat.icon size={32} />
          </motion.div>
          
          <motion.div
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + 0.3,
              type: "spring",
              stiffness: 200 
            }}
            viewport={{ once: true }}
          >
            {stat.value}+
          </motion.div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectStats;