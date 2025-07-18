import { motion } from 'framer-motion';
import { ExternalLink, Heart, MessageCircle, Share, Calendar } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'github';
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  url: string;
  image?: string;
}

const SocialMediaFeed = () => {
  // Mock social media posts - in a real app, these would come from APIs
  const socialPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'twitter',
      content: 'Just shipped a new React component library with TypeScript! The developer experience is incredible. 🚀 #ReactJS #TypeScript #WebDev',
      timestamp: '2 hours ago',
      likes: 42,
      comments: 8,
      shares: 12,
      url: 'https://twitter.com/johndoe/status/123',
    },
    {
      id: '2',
      platform: 'linkedin',
      content: 'Excited to share that our latest project achieved a 98% Lighthouse performance score! Here are the key optimization strategies we used...',
      timestamp: '1 day ago',
      likes: 156,
      comments: 23,
      shares: 45,
      url: 'https://linkedin.com/posts/johndoe/activity-123',
    },
    {
      id: '3',
      platform: 'github',
      content: 'Released v2.0 of my open-source portfolio template! New features include dark mode, animations, and better accessibility.',
      timestamp: '3 days ago',
      likes: 89,
      comments: 15,
      shares: 34,
      url: 'https://github.com/johndoe/portfolio-template',
    },
    {
      id: '4',
      platform: 'twitter',
      content: 'Working on an exciting new project involving AI and web development. Can\'t wait to share more details soon! 🤖✨',
      timestamp: '5 days ago',
      likes: 67,
      comments: 12,
      shares: 8,
      url: 'https://twitter.com/johndoe/status/456',
    },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return '🐦';
      case 'linkedin':
        return '💼';
      case 'github':
        return '🐙';
      default:
        return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'linkedin':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'github':
        return 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Latest Updates
        </h3>
        <motion.a
          href="https://twitter.com/johndoe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Follow for more
          <ExternalLink size={14} className="ml-1" />
        </motion.a>
      </motion.div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {socialPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ y: -2 }}
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getPlatformColor(post.platform)}`}>
                  {getPlatformIcon(post.platform)}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {post.platform}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {post.timestamp}
                  </div>
                </div>
              </div>
              
              <motion.a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            </div>

            {/* Post Content */}
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
              {post.content}
            </p>

            {/* Post Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="flex items-center hover:text-red-500 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={14} className="mr-1" />
                  {post.likes}
                </motion.div>
                
                <motion.div 
                  className="flex items-center hover:text-blue-500 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={14} className="mr-1" />
                  {post.comments}
                </motion.div>
                
                <motion.div 
                  className="flex items-center hover:text-green-500 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share size={14} className="mr-1" />
                  {post.shares}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <motion.div
        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-center space-x-4">
          {[
            { name: 'Twitter', url: 'https://twitter.com/johndoe', icon: '🐦', color: 'hover:text-blue-400' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: '💼', color: 'hover:text-blue-600' },
            { name: 'GitHub', url: 'https://github.com/johndoe', icon: '🐙', color: 'hover:text-gray-700 dark:hover:text-gray-300' },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-200 hover:shadow-md`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              title={`Follow on ${social.name}`}
            >
              <span className="text-xl">{social.icon}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialMediaFeed;