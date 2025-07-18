import { Project, Skill, Experience, SocialLink } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React, Node.js, and MongoDB.',
    longDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, advanced search and filtering, user authentication, order tracking, and a powerful admin dashboard. The platform handles thousands of products and supports multiple payment methods.',
    image: '/projects/ecommerce.jpg',
    images: ['/projects/ecommerce-1.jpg', '/projects/ecommerce-2.jpg', '/projects/ecommerce-3.jpg'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS'],
    category: 'web',
    featured: true,
    liveUrl: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/johndoe/ecommerce-platform',
    status: 'completed',
    year: 2023,
    client: 'TechCorp Inc.',
    testimonial: {
      text: 'John delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization was outstanding.',
      author: 'Sarah Johnson',
      position: 'CTO, TechCorp Inc.'
    }
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    longDescription: 'A comprehensive project management tool featuring real-time collaboration, advanced task filtering, team management, time tracking, file attachments, and detailed analytics. Built with modern technologies for optimal performance and user experience.',
    image: '/projects/taskmanager.jpg',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'WebSocket'],
    category: 'web',
    featured: true,
    liveUrl: 'https://taskmanager-demo.com',
    githubUrl: 'https://github.com/johndoe/task-manager',
    status: 'completed',
    year: 2023
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with interactive maps and forecasts.',
    image: '/projects/weather.jpg',
    technologies: ['Vue.js', 'D3.js', 'OpenWeather API', 'Tailwind CSS'],
    category: 'web',
    featured: false,
    liveUrl: 'https://weather-dashboard-demo.com',
    githubUrl: 'https://github.com/johndoe/weather-dashboard',
    status: 'completed',
    year: 2022
  },
  {
    id: '4',
    title: 'Mobile Fitness App',
    description: 'A React Native fitness tracking app with workout plans and progress tracking.',
    image: '/projects/fitness.jpg',
    technologies: ['React Native', 'Expo', 'Redux', 'Firebase', 'HealthKit'],
    category: 'mobile',
    featured: true,
    liveUrl: 'https://apps.apple.com/fitness-tracker',
    githubUrl: 'https://github.com/johndoe/fitness-app',
    status: 'completed',
    year: 2023
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: '🔷', color: '#3178C6' },
  { name: 'Vue.js', level: 85, category: 'frontend', icon: '💚', color: '#4FC08D' },
  { name: 'Next.js', level: 88, category: 'frontend', icon: '▲', color: '#000000' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend', icon: '🎨', color: '#06B6D4' },
  
  // Backend
  { name: 'Node.js', level: 87, category: 'backend', icon: '🟢', color: '#339933' },
  { name: 'Python', level: 82, category: 'backend', icon: '🐍', color: '#3776AB' },
  { name: 'PostgreSQL', level: 80, category: 'backend', icon: '🐘', color: '#336791' },
  { name: 'MongoDB', level: 85, category: 'backend', icon: '🍃', color: '#47A248' },
  
  // Tools
  { name: 'Git', level: 90, category: 'tools', icon: '📝', color: '#F05032' },
  { name: 'Docker', level: 75, category: 'tools', icon: '🐳', color: '#2496ED' },
  { name: 'AWS', level: 78, category: 'tools', icon: '☁️', color: '#FF9900' },
  { name: 'Figma', level: 85, category: 'design', icon: '🎨', color: '#F24E1E' }
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    startDate: '2022-01',
    endDate: undefined,
    current: true,
    description: [
      'Lead development of customer-facing web applications using React and TypeScript',
      'Implemented design system and component library used across 5+ products',
      'Mentored junior developers and conducted code reviews',
      'Improved application performance by 40% through optimization techniques'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'AWS'],
    type: 'work'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    startDate: '2020-06',
    endDate: '2021-12',
    current: false,
    description: [
      'Built and maintained full-stack web applications using MERN stack',
      'Designed and implemented RESTful APIs and database schemas',
      'Collaborated with design team to create responsive user interfaces',
      'Deployed applications on AWS with CI/CD pipelines'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    type: 'work'
  },
  {
    id: '3',
    title: 'Computer Science',
    company: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    startDate: '2016-09',
    endDate: '2020-05',
    current: false,
    description: [
      'Bachelor of Science in Computer Science',
      'Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems',
      'GPA: 3.8/4.0',
      'Dean\'s List for 6 semesters'
    ],
    technologies: ['Java', 'Python', 'C++', 'SQL'],
    type: 'education'
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/johndoe',
    icon: 'github',
    color: '#333'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/johndoe',
    icon: 'linkedin',
    color: '#0077B5'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/johndoe',
    icon: 'twitter',
    color: '#1DA1F2'
  },
  {
    name: 'Email',
    url: 'mailto:hello@johndoe.com',
    icon: 'mail',
    color: '#EA4335'
  }
];