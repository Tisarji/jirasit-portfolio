# 🌟 Jirasit Portfolio

A modern, responsive portfolio website built with Next.js 14 and pure Tailwind CSS. Features smooth animations, dark/light theme toggle, and showcases my projects and skills as a software developer.

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive**: Fully responsive design that works on all devices
- **Pure Tailwind CSS**: No custom CSS - built entirely with Tailwind utility classes
- **Performance Optimized**: Fast loading with Next.js 14 optimizations
- **Interactive Components**: Hover effects, loading screens, and smooth transitions
- **Project Showcase**: Detailed project cards with technologies and links
- **Skills Section**: Organized skill categories with visual indicators
- **Contact Integration**: Working contact form and social media links
- **Resume Download**: Direct PDF download functionality

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
jirasit-portfolio/
├── project/                    # Main Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css     # Tailwind imports and base styles
│   │   │   ├── layout.tsx      # Root layout with metadata
│   │   │   ├── page.tsx        # Home page
│   │   │   └── not-found.tsx   # 404 page
│   │   └── components/
│   │       ├── About.tsx       # About section with profile image
│   │       ├── Footer.tsx      # Footer with social links
│   │       ├── Intro.tsx       # Hero section with animations
│   │       ├── LoadingScreen.tsx # Loading animation
│   │       ├── Navigation.tsx  # Navigation bar with icon logo
│   │       ├── Projects.tsx    # Project showcase
│   │       ├── Skills.tsx      # Skills grid
│   │       └── ThemeToggle.tsx # Dark/light theme switcher
│   ├── public/
│   │   ├── images/
│   │   │   ├── icon.png        # Logo icon
│   │   │   ├── profile.jpg     # Profile picture
│   │   │   └── push-swap.png   # Project image
│   │   ├── resume.pdf          # Downloadable resume
│   │   └── favicon.ico         # Favicon
│   ├── tailwind.config.ts      # Extended Tailwind configuration
│   ├── package.json           # Dependencies and scripts
│   └── tsconfig.json          # TypeScript configuration
└── README.md                  # This file
```

## 🎨 Custom Animations

The portfolio includes 7 custom Tailwind animations defined in `tailwind.config.ts`:

- **float**: Gentle floating animation for cards
- **fadeInUp**: Fade in with upward motion
- **slideInRight**: Slide in from the right
- **shimmer**: Shimmer effect for loading states
- **spin-slow**: Slow rotation animation
- **bounce-gentle**: Subtle bounce effect
- **glow**: Glowing border animation

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Tisarji/jirasit-portfolio.git
cd jirasit-portfolio
```

```bash
# Navigate to the project directory
cd project
```

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

```bash
# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📝 Customization

### Personal Information
Update the following components with your information:

- **`src/components/Intro.tsx`**: Name, title, and description
- **`src/components/About.tsx`**: About text, skills, and contact information
- **`src/components/Projects.tsx`**: Your projects with descriptions and links
- **`src/components/Skills.tsx`**: Your technical skills
- **`src/components/Footer.tsx`**: Social media links and contact info
- **`src/components/Navigation.tsx`**: Logo and navigation items

### Assets
- Replace `public/images/profile.jpg` with your profile picture
- Replace `public/images/icon.png` with your logo
- Replace `public/resume.pdf` with your resume
- Update `public/favicon.ico` for your favicon

### Styling
- Modify `tailwind.config.ts` to adjust animations and extend the theme
- Update color schemes in component files using Tailwind utility classes

## 🌈 Theme Configuration

The portfolio supports both dark and light themes with:
- Automatic system preference detection
- Manual toggle with persistent storage
- Smooth transitions between themes
- Consistent styling across all components
- Icon logo that adapts to theme colors

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are optimized for touch interactions on mobile devices.

```bash
# Build for production
npm run build

# Start production server
npm run start

# Export static files (if needed)
npm run build && npx next export
```

## 🧩 Component Overview

### Core Components
- **Navigation**: Fixed navbar with icon logo and theme toggle
- **LoadingScreen**: Animated loading screen with brand elements
- **Intro**: Hero section with animated text and call-to-action
- **About**: Personal information with profile image
- **Skills**: Categorized skills grid with hover effects
- **Projects**: Project showcase with technology tags
- **Footer**: Contact information and social links
- **ThemeToggle**: Dark/light theme switcher

### Features
- Smooth scroll navigation
- Mobile-responsive hamburger menu
- Image optimization with Next.js Image
- Form validation and submission
- Dynamic theme switching
- Custom Tailwind animations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jirasit Karunwong**
- Email: jirasitkarunwong@gmail.com
- GitHub: [@Tisarji](https://github.com/Tisarji)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Images optimized with [Next.js Image](https://nextjs.org/docs/api-reference/next/image)
- Deployed on [Vercel](https://vercel.com/)

---

⭐ If you found this portfolio helpful, please give it a star!
