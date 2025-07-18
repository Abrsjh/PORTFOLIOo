import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal, Calendar, Award } from 'lucide-react';
import { Project } from '@/types';

interface SearchAndFilterProps {
  projects: Project[];
  onFilteredProjects: (projects: Project[]) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  projects,
  onFilteredProjects,
  activeCategory,
  onCategoryChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'web', name: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'design', name: 'Design', count: projects.filter(p => p.category === 'design').length },
  ];

  // Get unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();

  // Get unique years
  const allYears = Array.from(
    new Set(projects.map(project => project.year.toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  // Filter projects based on all criteria
  useEffect(() => {
    let filtered = projects;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Technology filter
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter(project =>
        selectedTechnologies.every(tech =>
          project.technologies.includes(tech)
        )
      );
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(project => project.year.toString() === selectedYear);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(project => project.featured);
    }

    onFilteredProjects(filtered);
  }, [
    projects,
    activeCategory,
    searchTerm,
    selectedTechnologies,
    selectedYear,
    selectedStatus,
    showFeaturedOnly,
    onFilteredProjects
  ]);

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTechnologies([]);
    setSelectedYear('');
    setSelectedStatus('');
    setShowFeaturedOnly(false);
    onCategoryChange('all');
  };

  const hasActiveFilters = searchTerm || selectedTechnologies.length > 0 || 
    selectedYear || selectedStatus || showFeaturedOnly || activeCategory !== 'all';

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects, technologies, or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchTerm && (
            <motion.button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="mr-2" size={16} />
            {category.name}
            <span className="ml-2 px-2 py-0.5 text-xs bg-black/10 dark:bg-white/10 rounded-full">
              {category.count}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Advanced Filters Toggle */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal className="mr-2" size={16} />
          Advanced Filters
          <motion.div
            className="ml-2"
            animate={{ rotate: isFilterOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.div>
        </motion.button>

        {hasActiveFilters && (
          <motion.button
            onClick={clearAllFilters}
            className="flex items-center px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <X className="mr-1" size={14} />
            Clear All
          </motion.button>
        )}
      </motion.div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured Projects Toggle */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <Award className="mr-2" size={16} />
                Featured Projects Only
              </label>
              <motion.button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  showFeaturedOnly ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: showFeaturedOnly ? 24 : 2 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>

            {/* Year Filter */}
            <div>
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-3">
                <Calendar className="mr-2" size={16} />
                Year
              </label>
              <div className="flex flex-wrap gap-2">
                {allYears.map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => setSelectedYear(selectedYear === year ? '' : year)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedYear === year
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-3">
                Project Status
              </label>
              <div className="flex flex-wrap gap-2">
                {['completed', 'in-progress', 'planned'].map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setSelectedStatus(selectedStatus === status ? '' : status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                      selectedStatus === status
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status === 'in-progress' ? 'In Progress' : status}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-3">
                Technologies ({selectedTechnologies.length} selected)
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allTechnologies.map((tech) => (
                  <motion.button
                    key={tech}
                    onClick={() => toggleTechnology(tech)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTechnologies.includes(tech)
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAndFilter;