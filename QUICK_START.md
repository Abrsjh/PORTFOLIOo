# 🚀 Quick Start Guide

## **Get Your Portfolio Running in 5 Minutes!**

### **Prerequisites:**
- Node.js 18+ installed
- npm or yarn package manager

### **1. Install Dependencies**
```bash
npm install
```

### **2. Start Development Server**
```bash
npm run dev
```

### **3. Open in Browser**
Navigate to: `http://localhost:5173`

## **🎨 Immediate Customization**

### **Update Your Information:**
Edit `src/data/portfolio.ts`:
```typescript
// Change these to your details
export const personalInfo = {
  name: 'Your Name',
  titles: [
    'Your Title 1',
    'Your Title 2', 
    'Your Title 3'
  ],
  email: 'your@email.com',
  // ... more details
};
```

### **Change Colors:**
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color', // Main brand color
  },
  accent: {
    400: '#your-accent', // Accent color
  }
}
```

### **Update Projects:**
Edit the projects array in `src/data/portfolio.ts`:
```typescript
export const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    technologies: ['React', 'TypeScript'],
    // ... more details
  }
];
```

## **🛠️ Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests
```

## **📱 Features Ready to Use:**

✅ **Responsive Design** - Works on all devices  
✅ **Dark/Light Theme** - Toggle in header  
✅ **3D Animations** - Interactive particle system  
✅ **Smooth Scrolling** - Between sections  
✅ **Contact Form** - Ready for backend integration  
✅ **SEO Optimized** - Meta tags and structure  
✅ **Accessibility** - WCAG 2.1 AA compliant  

## **🚀 Deploy Instantly**

### **Vercel (Recommended):**
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### **Netlify:**
1. Run `npm run build`
2. Upload `dist` folder to Netlify

### **Manual:**
1. Run `npm run build`
2. Upload `dist` folder to your hosting

## **🎯 What's Included:**

- **Hero Section** with 3D particles and animations
- **About Section** with skills and experience
- **Projects Section** with filtering and animations  
- **Contact Section** with form validation
- **Responsive Navigation** with mobile menu
- **Loading Screen** with progress animation
- **Scroll Effects** and smooth transitions
- **Custom Cursor** with magnetic effects
- **Sound Toggle** for ambient audio (optional)

## **📞 Need Help?**

- Check `DEVELOPMENT_GUIDE.md` for detailed documentation
- Review `task.md` for the complete project plan
- All components are well-documented with TypeScript

**You're ready to showcase your work! 🎉**