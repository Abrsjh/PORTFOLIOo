import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Video, MapPin, Clock, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const ContactMethods = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      subtitle: 'Best for detailed discussions',
      value: 'hello@johndoe.com',
      action: 'mailto:hello@johndoe.com',
      actionText: 'Send Email',
      copyable: true,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      available: true,
      responseTime: 'Usually within 2-4 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      subtitle: 'For urgent matters',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      actionText: 'Call Now',
      copyable: true,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      available: true,
      responseTime: 'Available 9 AM - 6 PM PST',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Quick messages and updates',
      value: '+1 (555) 123-4567',
      action: 'https://wa.me/15551234567',
      actionText: 'Message',
      copyable: false,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      available: true,
      responseTime: 'Usually within 1 hour',
    },
    {
      icon: Video,
      title: 'Video Call',
      subtitle: 'Face-to-face discussions',
      value: 'Schedule a meeting',
      action: '#calendar',
      actionText: 'Schedule',
      copyable: false,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      available: true,
      responseTime: 'Available by appointment',
    },
  ];

  const officeInfo = {
    address: 'San Francisco, CA',
    timezone: 'Pacific Standard Time (PST)',
    workingHours: 'Monday - Friday, 9:00 AM - 6:00 PM',
  };

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleAction = (method: typeof contactMethods[0]) => {
    if (method.action.startsWith('#')) {
      // Scroll to calendar section
      const element = document.querySelector(method.action);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(method.action, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {/* Contact Methods Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            className="bg-white dark:bg-dark-surface rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center ${method.color} group-hover:scale-110 transition-transform duration-200`}>
                  <method.icon size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {method.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {method.subtitle}
                  </p>
                </div>
              </div>
              
              {method.available && (
                <div className="flex items-center text-green-500 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Available
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white font-medium">
                  {method.value}
                </span>
                {method.copyable && (
                  <motion.button
                    onClick={() => copyToClipboard(method.value, method.title)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Copy to clipboard"
                  >
                    {copiedItem === method.title ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-500"
                      >
                        ✓
                      </motion.div>
                    ) : (
                      <Copy size={16} />
                    )}
                  </motion.button>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {method.responseTime}
              </p>
            </div>

            <motion.button
              onClick={() => handleAction(method)}
              className={`w-full px-4 py-2 ${method.color} border-2 border-current rounded-lg font-medium hover:bg-current hover:text-white transition-all duration-200 flex items-center justify-center`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {method.actionText}
              <ExternalLink size={16} className="ml-2" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Office Information */}
      <motion.div
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center mb-4">
          <MapPin className="text-primary-500 mr-3" size={24} />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Office Information
          </h4>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </h5>
            <p className="text-gray-900 dark:text-white">{officeInfo.address}</p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Timezone
            </h5>
            <p className="text-gray-900 dark:text-white">{officeInfo.timezone}</p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Working Hours
            </h5>
            <p className="text-gray-900 dark:text-white">{officeInfo.workingHours}</p>
          </div>
        </div>

        {/* Current Time */}
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Clock className="text-gray-500 mr-2" size={16} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Current time: {new Date().toLocaleTimeString('en-US', {
              timeZone: 'America/Los_Angeles',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </span>
        </motion.div>
      </motion.div>

      {/* Quick Response Promise */}
      <motion.div
        className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
          Quick Response Guarantee
        </h4>
        <p className="text-primary-700 dark:text-primary-300">
          I typically respond to all inquiries within 2-4 hours during business hours. 
          For urgent matters, please call or send a WhatsApp message.
        </p>
      </motion.div>
    </div>
  );
};

export default ContactMethods;