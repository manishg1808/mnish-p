# 🚀 Manish Kumar - Professional Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC.svg)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**A modern, responsive portfolio website showcasing professional web development skills**

[🌐 Live Demo](https://your-portfolio-link.com) • [📧 Contact](mailto:mnishg49@gmail.com)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Available Scripts](#-available-scripts)
- [🎨 Customization](#-customization)
- [📱 Sections Overview](#-sections-overview)
- [🔗 API Integration](#-api-integration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---

## ✨ Features

### 🎯 **Core Features**
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Automatic theme switching with user preference
- **Smooth Animations** - Professional transitions and hover effects
- **SEO Optimized** - Meta tags and semantic HTML structure
- **Performance Focused** - Fast loading with optimized assets

### 🎨 **UI/UX Features**
- **Modern Glass Morphism** - Contemporary design with backdrop blur effects
- **Gradient Accents** - Beautiful color gradients throughout
- **Interactive Elements** - Hover animations and micro-interactions
- **Professional Typography** - Clean, readable font hierarchy
- **Accessibility** - WCAG compliant design patterns

### 🚀 **Technical Features**
- **Component-Based Architecture** - Modular, reusable React components
- **Context API** - Efficient state management
- **Dynamic Content** - API-driven project and service data
- **Error Boundaries** - Robust error handling
- **Performance Monitoring** - Built-in analytics integration

---

## 🛠️ Tech Stack

### **Frontend Framework**
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite)

### **Styling & UI**
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Remix Icon](https://img.shields.io/badge/Remix_Icon-4.7.0-000000?style=for-the-badge)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.19-DB7093?style=for-the-badge&logo=styled-components)

### **Development Tools**
![PostCSS](https://img.shields.io/badge/PostCSS-8.4.38-DD3735?style=for-the-badge&logo=postcss)
![Autoprefixer](https://img.shields.io/badge/Autoprefixer-10.4.19-DD3735?style=for-the-badge&logo=autoprefixer)

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-react-tailwind.git
   cd portfolio-react-tailwind
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Build for Production**
```bash
npm run build
# or
yarn build
```

---

## 📁 Project Structure

```
portfolio-react-tailwind/
├── public/                    # Static assets
│   └── favicon.png           # Favicon
├── src/
│   ├── assets/               # Images and media files
│   │   ├── m.JPG             # Profile image
│   │   ├── mtr logo.png      # Logo/favicon
│   │   └── ...               # Other assets
│   ├── components/           # Reusable UI components
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   ├── Footer.jsx        # Site footer
│   │   ├── ProjectCard.jsx   # Project display cards
│   │   └── ...               # Other components
│   ├── config/               # Configuration files
│   │   └── portfolioConfig.js # Portfolio settings
│   ├── context/              # React context providers
│   │   └── DataContext.jsx   # Global state management
│   ├── data/                 # Static data files
│   │   ├── projects.json     # Project data
│   │   ├── skills.json       # Skills data
│   │   └── projectImages.js  # Image configurations
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Projects.jsx      # Projects showcase
│   │   ├── Skills.jsx        # Skills section
│   │   └── ...               # Other pages
│   ├── sections/             # Section components
│   │   ├── Hero.jsx          # Hero section
│   │   ├── About.jsx         # About section
│   │   ├── Services.jsx      # Services section
│   │   ├── Portfolio.jsx     # Portfolio section
│   │   └── ...               # Other sections
│   ├── utils/                # Utility functions
│   │   └── portfolioHelpers.js # Helper functions
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
└── README.md                 # Documentation
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🎨 Customization

### **Personal Information**
Edit `src/components/Sidebar.jsx` to update:
- Profile image (currently `m.JPG`)
- Name and contact details
- Social media links

### **Portfolio Content**
Modify `src/config/portfolioConfig.js` to customize:
- Project categories and filters
- Default project counts
- API endpoints for dynamic content

### **Styling**
Update `tailwind.config.js` and `src/index.css` for:
- Color schemes
- Typography
- Animation durations
- Responsive breakpoints

### **Content Management**
Edit JSON files in `src/data/` for:
- Projects (`projects.json`)
- Skills (`skills.json`)
- Service descriptions

---

## 📱 Sections Overview

### **🏠 Hero Section**
- Eye-catching introduction with animated elements
- Call-to-action buttons
- Responsive background design

### **👨‍💻 About Section**
- Professional background and experience
- Skills overview with progress bars
- Personal story and achievements

### **🛠️ Services Section**
- Professional service cards with hover effects
- Gradient backgrounds and glass morphism
- 15+ service categories including:
  - Static Website Development
  - Portfolio Development
  - WordPress Development
  - UI/UX Design
  - Backend Development

### **💼 Portfolio Section**
- Filterable project gallery
- Categories: Personal Projects, Client Work, WordPress
- Live project links and descriptions

### **🎯 Skills Section**
- Interactive skill visualization
- Progress bars and animations
- Technical expertise showcase

### **👥 Team Section**
- Team member profiles
- Social media integration
- Professional presentations

### **📜 Certificates Section**
- Achievement showcase
- Certification displays
- Professional credentials

### **💬 Testimonials Section**
- Client feedback and reviews
- Carousel/slider implementation
- Social proof integration

### **📞 Contact Section**
- Contact form with validation
- Social media links
- Location information

---

## 🔗 API Integration

The portfolio supports dynamic content loading via REST API:

### **Backend Configuration**
```javascript
// src/config/portfolioConfig.js
api: {
  baseUrl: 'http://localhost:5000',
  projectsEndpoint: '/api/projects',
  uploadsPath: '/uploads/projects'
}
```

### **Supported Endpoints**
- `GET /api/projects` - Fetch project data
- `POST /api/contact` - Handle contact form submissions
- `GET /api/skills` - Retrieve skills data

### **Fallback System**
- Automatic fallback to static JSON data
- Graceful error handling
- Offline functionality support

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow React best practices
- Maintain consistent code style
- Add proper TypeScript types
- Update documentation
- Test across different devices

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Manish Kumar**

<div align="center">

[![Email](https://img.shields.io/badge/Email-mnishg49@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mnishg49@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/er-mnish-kumar-8227572b8)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/er.mnish_g_420)
[![Facebook](https://img.shields.io/badge/Facebook-Connect-1877F2?style=for-the-badge&logo=facebook)](https://www.facebook.com/share/17ZpmcKtd9/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Message-25D366?style=for-the-badge&logo=whatsapp)](https://wa.me/918986010819)

**Phone:** +91 8092970688

</div>

---

## 🙏 Acknowledgments

- **React** - For the amazing frontend framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool
- **Remix Icon** - For the beautiful icon library
- **Unsplash** - For the high-quality stock images

---

<div align="center">

**Made with ❤️ by Manish Kumar**

⭐ **Star this repo if you found it helpful!**

[⬆️ Back to Top](#-manish-kumar---professional-portfolio)

</div>
