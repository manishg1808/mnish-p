import React, { useState, useEffect } from 'react'
import profile from '../assets/profile.svg'

const NavItem = ({ href, icon, children, active, onNavClick }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
      if (onNavClick) {
        onNavClick()
      }
    }
  }

  // Parse label to extract text and format with green brackets
  const parseLabel = (label) => {
    if (typeof label !== 'string') return label
    const match = label.match(/&lt;\s*(.+?)\s*\/&gt;/)
    if (match) {
      let text = match[1].trim()
      // Capitalize first letter
      const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1)
      return (
        <>
          <span className="glow-brackets">&lt; </span>
          {capitalizedText}
          <span className="glow-brackets">  /&gt;</span>
        </>
      )
    }
    return label
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 relative ${
        active 
          ? 'text-amber-400' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <i className={`${icon} text-base`}></i>
      <span className="font-medium text-sm">{parseLabel(children)}</span>
    </a>
  )
}

export default function Sidebar({ dark, setDark }) {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'project', 'team', 'services', 'certificate', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      // Find the current section
      let current = 'home'
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          current = sections[i]
          break
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  const navItems = [
    { href: '#home', label: '&lt; home /&gt;', icon: 'ri-home-line' },
    { href: '#about', label: '&lt; about /&gt;', icon: 'ri-user-line' },
    { href: '#skills', label: '&lt; skills /&gt;', icon: 'ri-code-s-slash-line' },
    { href: '#project', label: '&lt; projects /&gt;', icon: 'ri-briefcase-line' },
    { href: '#team', label: '&lt; teams /&gt;', icon: 'ri-team-line' },
    { href: '#services', label: '&lt; services /&gt;', icon: 'ri-settings-3-line' },
    { href: '#certificate', label: '&lt; certificates /&gt;', icon: 'ri-award-line' },
    { href: '#testimonials', label: '&lt; testimonials /&gt;', icon: 'ri-chat-quote-line' },
    { href: '#contact', label: '&lt; contact /&gt;', icon: 'ri-mail-line' },
  ]

  const socialLinks = [
    { href: 'https://linkedin.com/in/er-mnish-kumar-8227572b8', icon: 'ri-linkedin-line', label: 'LinkedIn' },
    { href: 'https://github.com/manishg1808', icon: 'ri-github-line', label: 'GitHub' },
    { href: 'https://www.instagram.com/er.mnish_g_420?igsh=aXhpejdxbjV1Nmdr', icon: 'ri-instagram-line', label: 'Instagram' },
    { href: 'https://www.facebook.com/share/17ZpmcKtd9/', icon: 'ri-facebook-line', label: 'Facebook' },
    { href: 'https://wa.me/918986010819?text=Hello%20Manish.G', icon: 'ri-whatsapp-line', label: 'WhatsApp' },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  // Get active nav item index for glider
  const getActiveIndex = () => {
    return navItems.findIndex(item => item.href.replace('#', '') === activeSection)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-3 rounded-lg shadow-lg transition ${
          mobileMenuOpen ? 'left-64' : 'left-4'
        }`}
      >
        {mobileMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 dark:bg-gray-950 text-white z-40 transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="flex flex-col items-center py-3 px-2 border-b border-gray-800">
            <img 
              src={profile} 
              alt="Profile" 
              className="w-36 h-36 rounded-full border-2 border-indigo-600 mb-1.5 object-cover shadow-lg"
            />
            <h1 className="text-2xl font-bold mb-1">
              <span className="glow-brackets">&lt; </span>
              <span> Manish Kumar </span>
              <span className="glow-brackets"> /&gt;</span>
            </h1>
            <a 
              href="mailto:mnishg49@gmail.com" 
              className="text-sm text-gray-300 hover:text-indigo-400 transition mb-0.5 flex items-center gap-1"
            >
              <i className="ri-mail-line text-base"></i>
              <span className="glow-brackets">&lt;</span>
              mnishg49@gmail.com
              <span className="glow-brackets">/&gt;</span>
            </a>
            <a 
              href="tel:+918092970688" 
              className="text-sm text-gray-300 hover:text-indigo-400 transition mb-1.5 flex items-center gap-1"
            >
              <i className="ri-phone-line text-base"></i>
              <span className="glow-brackets">&lt;</span>
              +91 8092970688
              <span className="glow-brackets">/&gt;</span>
            </a>
            <div className="flex gap-1.5 mt-1.5">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition text-white text-xs"
                  title={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
              {/* Theme Toggle Icon */}
              <button
                onClick={() => setDark(d => !d)}
                className="w-7 h-7 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition text-white text-xs"
                aria-label="Toggle theme"
                title={dark ? 'Light Mode' : 'Dark Mode'}
              >
                {dark ? <i className="ri-moon-line"></i> : <i className="ri-sun-line"></i>}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-hidden py-1 px-2 flex flex-col nav-glider-container" data-active-index={getActiveIndex()}>
            <div className="nav-glider-track">
              <div className="nav-glider"></div>
            </div>
            <ul className="space-y-0.5 w-full flex flex-col justify-start">
              {navItems.map(item => (
                <li key={item.href} className="flex-shrink-0">
                  <NavItem
                    href={item.href}
                    icon={item.icon}
                    active={activeSection === item.href.replace('#', '')}
                    onNavClick={handleNavClick}
                  >
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

