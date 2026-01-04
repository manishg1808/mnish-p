import React, { useState, useEffect } from 'react'

const NavItem = ({ href, children, active, onNavClick }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 64 // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
      if (onNavClick) {
        onNavClick()
      }
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`px-3 py-2 rounded-md transition hover:text-indigo-600 dark:hover:text-indigo-400 ${
        active ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {children}
    </a>
  )
}

export default function Navbar({ dark, setDark }) {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'resume', 'portfolio', 'services', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#resume', label: 'Resume' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#services', label: 'Services' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold text-gray-900 dark:text-white">
          <span className="text-indigo-600 dark:text-indigo-400">i</span>Portfolio
        </a>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <NavItem key={item.href} href={item.href} active={activeSection === item.href.replace('#', '')} onNavClick={handleNavClick}>
              {item.label}
            </NavItem>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(d => !d)}
            className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
            title="Toggle dark / light"
          >
            {dark ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map(item => (
              <NavItem key={item.href} href={item.href} active={activeSection === item.href.replace('#', '')} onNavClick={handleNavClick}>
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
