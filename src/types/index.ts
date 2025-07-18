export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  year: number;
  client?: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'other';
  icon?: string;
  color?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
  type: 'work' | 'education' | 'volunteer';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AnimationVariants {
  hidden: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
  };
  visible: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
    };
  };
}