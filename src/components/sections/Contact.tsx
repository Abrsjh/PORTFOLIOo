import { motion } from 'framer-motion';
import ContactForm from '@/components/ui/ContactForm';
import ContactMethods from '@/components/ui/ContactMethods';
import AvailabilityCalendar from '@/components/ui/AvailabilityCalendar';
import SocialMediaFeed from '@/components/ui/SocialMediaFeed';

const Contact = () => {
  const handleFormSubmit = async (data: any) => {
    // Handle form submission
    console.log('Contact form submitted:', data);
    // Here you would integrate with your backend API
    await new Promise(resolve => setTimeout(resolve, 2000));
  };


  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-dark-surface">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ContactMethods />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactForm onSubmit={handleFormSubmit} />
          </motion.div>

          {/* Social Media Feed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SocialMediaFeed />
          </motion.div>
        </div>

        {/* Availability Calendar */}
        <motion.div
          id="calendar"
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <AvailabilityCalendar />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;