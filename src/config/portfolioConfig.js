// Portfolio Section Configuration
// Easily customize portfolio settings here

export const PORTFOLIO_CONFIG = {
  // Section Title
  title: {
    text: 'Projects',
    prefix: '//',
    suffix: '//',
    prefixColor: 'text-green-500 dark:text-green-400',
    textColor: 'text-gray-900 dark:text-white'
  },

  // Filter Categories
  categories: ['All', 'Personal Projects', 'Client', 'WordPress'],

  // Category Button Gradients (in order of categories)
  categoryGradients: [
    'bg-gradient-to-r from-blue-500 to-purple-600',      // All
    'bg-gradient-to-r from-pink-500 to-rose-600',        // Personal Projects
    'bg-gradient-to-r from-green-500 to-emerald-600',    // Client
    'bg-gradient-to-r from-orange-500 to-red-600'        // WordPress
  ],

  // Grid Layout Settings
  grid: {
    defaultCols: 1,      // Mobile
    mdCols: 2,          // Tablet
    lgCols: 4,          // Desktop (4 cards per row)
    gap: 6              // Gap between cards
  },

  // Default Projects Count (3 Personal + 4 Client + 4 WordPress = 11)
  defaultProjectsCount: 11,

  // Backend API Settings
  api: {
    baseUrl: 'http://localhost:5000',
    projectsEndpoint: '/api/projects',
    uploadsPath: '/uploads/projects'
  }
}

// Default Projects Configuration
// Easily add/remove/modify default projects here
export const DEFAULT_PROJECTS_CONFIG = {
  // Distribution of projects by category
  distribution: {
    'Personal Projects': 3,
    'Client': 4,  // Updated to 4 for Client projects
    'WordPress': 4  // Updated to 4 for WordPress projects
  },

  // Custom Personal Projects (will override generated ones)
  customPersonalProjects: [
    {
      title: 'Password Generator',
      description: 'Advanced password generator with customizable options - includes uppercase, lowercase, numbers, symbols, and strength indicator',
      link: 'https://password-generator-alpha-two-91.vercel.app/',
      image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'Password Generator Pro',
      description: 'Secure password generator with multiple options - generate strong passwords with customizable length and character sets',
      link: 'https://psswrd-p-g.vercel.app/',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'Tic Tac Toe Game',
      description: 'Classic Tic Tac Toe game - play against the computer or challenge a friend in this interactive game',
      link: 'https://tttgme.tiiny.site/',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=800&fit=crop&q=80'
    }
  ],

  // Default project template
  defaultProject: {
    description: 'Lorem ipsum, dolor sit amet consectetur',
    link: '#'
  },

  // Available placeholder images
  placeholderImages: [
    'project1.jpg',
    'project2.jpg',
    'project3.jpg',
    'project4.jpg',
    'placeholder1.svg',
    'placeholder2.svg'
  ],

  // Custom WordPress Projects (will override generated ones)
  customWordPressProjects: [
    {
      title: 'TSC Printers India',
      description: 'WordPress website for TSC Printers, supplies & technical expertise in India',
      link: 'https://www.tscprintersindia.com/',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'Thermal Transfer Ribbons',
      description: 'WordPress website for Thermal Transfer Ribbons and TTR/TTO solutions',
      link: 'https://thermaltransferribbons.tscprinters.co.in/',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'Mindware Thermal Transfer Ribbons',
      description: 'WordPress website for Made in India Thermal Transfer Ribbons by Mindware',
      link: 'https://www.thermaltransferribbons.mindwareindia.com/',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'TSC Printers Solutions',
      description: 'WordPress website for TSC Barcode Printers and Label Solutions',
      link: 'https://www.tscprintersindia.com/',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80'
    }
  ],

  // Custom Client Projects (will override generated ones)
  customClientProjects: [
    {
      title: 'SecureReach Digital Solutions',
      description: 'Accelerate Your Business with Security & Strategy - Digital marketing with enterprise-grade cybersecurity',
      link: 'https://rama-overseas-a.vercel.app/',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'Godex Printers India',
      description: 'Godex printer sales and service center for barcode labels, ribbons, and thermal transfer printing solutions',
      link: 'https://godexprinterindia.in/',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'Zebra Printers India',
      description: 'Premium Zebra Labels & Ribbons - Durable, high-quality supplies for consistent printing results',
      link: 'https://zebraprintersindia.com/',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80'
    },
    {
      title: 'TagsIndia - Order Management',
      description: 'Track and manage your orders with real-time updates - Complete order management dashboard',
      link: 'https://tagsindia.com/user/orders',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80'
    }
  ]
}

