import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'John Doe - Creative Developer & Designer',
  description = 'Passionate full-stack developer specializing in React, TypeScript, and modern web technologies. Creating beautiful, functional, and user-centered digital experiences.',
  keywords = ['web developer', 'react developer', 'typescript', 'frontend developer', 'ui/ux designer', 'portfolio'],
  image = '/og-image.jpg',
  url = 'https://johndoe.dev',
  type = 'website',
  author = 'John Doe',
  publishedTime,
  modifiedTime,
  section,
  tags,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'John Doe Portfolio', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@johndoe');
    updateMetaTag('twitter:site', '@johndoe');

    // Additional article meta tags
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, true);
      if (author) updateMetaTag('article:author', author, true);
      if (section) updateMetaTag('article:section', section, true);
      if (tags) {
        tags.forEach(tag => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.content = tag;
          document.head.appendChild(meta);
        });
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Robots meta tag
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Viewport meta tag (if not already present)
    if (!document.querySelector('meta[name="viewport"]')) {
      updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    }

    // Theme color
    updateMetaTag('theme-color', '#3b82f6');
    updateMetaTag('msapplication-TileColor', '#3b82f6');

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'John Doe',
      jobTitle: 'Full Stack Developer',
      description: description,
      url: url,
      image: image,
      sameAs: [
        'https://github.com/johndoe',
        'https://linkedin.com/in/johndoe',
        'https://twitter.com/johndoe',
      ],
      knowsAbout: [
        'Web Development',
        'React',
        'TypeScript',
        'Node.js',
        'UI/UX Design',
        'Frontend Development',
        'Backend Development',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'University of California, Berkeley',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

  return null;
};

export default SEOHead;