# 🚀 Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ **Performance Optimization**
- [x] Bundle optimization with code splitting
- [x] Image lazy loading implemented
- [x] Service Worker for caching
- [x] Core Web Vitals monitoring
- [x] Error boundaries for graceful failures
- [x] SEO meta tags and structured data
- [x] Progressive Web App (PWA) features

### ✅ **Content Updates**
- [ ] Update personal information in `src/data/portfolio.ts`
- [ ] Replace placeholder images with actual project screenshots
- [ ] Update contact information and social links
- [ ] Customize colors and branding in `tailwind.config.js`
- [ ] Add real project data and descriptions

### ✅ **Configuration**
- [ ] Update domain in `public/sitemap.xml`
- [ ] Update URLs in `src/components/ui/SEOHead.tsx`
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure contact form backend

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended)**

#### **Quick Deploy**
1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

#### **Manual Setup**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

#### **Vercel Configuration** (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### **Option 2: Netlify**

#### **Quick Deploy**
1. Build the project: `npm run build`
2. Drag and drop `dist` folder to Netlify

#### **Git Integration**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

#### **Netlify Configuration** (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### **Option 3: GitHub Pages**

#### **Setup**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Deploy: `npm run deploy`

### **Option 4: Custom Server**

#### **Build for Production**
```bash
npm run build
```

#### **Serve with Node.js**
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## 🔧 Environment Configuration

### **Environment Variables**
Create `.env.production`:
```env
VITE_APP_TITLE=John Doe Portfolio
VITE_APP_URL=https://johndoe.dev
VITE_CONTACT_EMAIL=hello@johndoe.dev
VITE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### **Build Scripts**
Update `package.json`:
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:analyze": "tsc && vite build --config vite.config.production.ts",
    "preview": "vite preview",
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "netlify deploy --prod --dir=dist"
  }
}
```

## 📊 Performance Monitoring

### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s ✅
- **FID (First Input Delay)**: < 100ms ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅

### **Lighthouse Scores**
- **Performance**: 95+ ✅
- **Accessibility**: 100 ✅
- **Best Practices**: 100 ✅
- **SEO**: 95+ ✅

### **Monitoring Tools**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools

## 🔒 Security Headers

### **Content Security Policy**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https:;
">
```

### **Additional Headers**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 📈 SEO Optimization

### **Meta Tags Checklist**
- [x] Title tags (< 60 characters)
- [x] Meta descriptions (< 160 characters)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Structured data (JSON-LD)

### **Technical SEO**
- [x] XML Sitemap
- [x] Robots.txt
- [x] Mobile-friendly design
- [x] Fast loading times
- [x] HTTPS enabled
- [x] Clean URL structure

## 🔄 CI/CD Pipeline

### **GitHub Actions** (`.github/workflows/deploy.yml`)
```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🎯 Post-Deployment

### **Testing**
- [ ] Test all interactive features
- [ ] Verify responsive design on multiple devices
- [ ] Check form submissions
- [ ] Test dark/light theme toggle
- [ ] Verify all links work correctly

### **Analytics Setup**
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Social media analytics
- [ ] Performance monitoring

### **Maintenance**
- [ ] Regular dependency updates
- [ ] Performance monitoring
- [ ] Content updates
- [ ] Security patches

## 🚨 Troubleshooting

### **Common Issues**

#### **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

#### **Performance Issues**
```bash
# Analyze bundle size
npm run build:analyze

# Check for unused dependencies
npx depcheck
```

#### **Deployment Failures**
- Check build logs for errors
- Verify environment variables
- Ensure all dependencies are installed
- Check file permissions

### **Support Resources**
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Your portfolio is now ready for production deployment! 🎉**