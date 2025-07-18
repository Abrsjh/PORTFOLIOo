# 🎨 Portfolio Frontend

A modern, responsive, and visually stunning portfolio website built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Performance Optimized**: Fast loading with optimized images and code splitting
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support
- **SEO Friendly**: Optimized for search engines with proper meta tags
- **Interactive Elements**: Engaging animations and micro-interactions
- **Contact Form**: Functional contact form with validation

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand (if needed)
- **Testing**: Vitest + React Testing Library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-frontend.git
cd portfolio-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── sections/       # Page sections
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles
├── assets/             # Images, icons, etc.
├── data/               # Static data
├── types/              # TypeScript type definitions
└── test/               # Test utilities
```

## 🎨 Customization

### Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
  // ... more colors
}
```

### Content

Update your personal information in `src/data/portfolio.ts`:

```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your@email.com',
  // ... more info
};
```

### Animations

Customize animations in `src/utils/animations.ts` or create new ones using Framer Motion.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI

## 📈 Performance

- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

If you have any questions or need help, feel free to:

- Open an issue on GitHub
- Contact me at [your@email.com](mailto:your@email.com)
- Connect with me on [LinkedIn](https://linkedin.com/in/yourprofile)

---

Made with ❤️ and lots of ☕