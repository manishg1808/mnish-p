import React from 'react'
import mtrLogo from '../assets/mtr logo.png'

export default function Footer() {
  const portfolioLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CERTIFICATES', href: '#certificate' },
    { label: 'CONTACT', href: '#contact' },
  ]

  const connectLinks = [
    { label: 'EMAIL', href: 'mailto:mnishg49@gmail.com', value: 'MNISHG49@GMAIL.COM' },
    { label: 'PHONE', href: 'tel:+918092970688', value: '+91-8092970688' },
  ]

  const quickActions = [
    { label: 'DOWNLOAD RESUME', href: '#' },
    { label: 'VIEW PORTFOLIO', href: '#portfolio' },
    { label: 'GET IN TOUCH', href: '#contact' },
    { label: 'HIRE ME', href: '#contact' },
  ]

  return (
    <footer className="bg-black text-emerald-400 relative">
      {/* Wave Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-12 md:h-16" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.49,17.22,592,17.22c72.67,0,140.5,10.5,206.5,28.5C884.5,64.22,978.5,80,1200,80V0Z" 
            className="fill-black"
          ></path>
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-39.15C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-emerald-400/20"
            style={{ filter: 'drop-shadow(0 -2px 8px rgba(16, 185, 129, 0.3))' }}
          ></path>
        </svg>
        {/* Subtle emerald glow line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-6 pt-16 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {/* Logo Section */}
          <div className="flex items-start">
            <div className="relative">
              <div className="border-2 border-emerald-400 px-2 py-1 footer-border-glow inline-block">
                <img 
                  src={mtrLogo} 
                  alt="MTR Logo" 
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="mt-1 font-mono text-[10px] md:text-xs text-emerald-400 font-bold tracking-wider footer-text-glow">
                MANISH KUMAR
              </div>
            </div>
          </div>

          {/* Portfolio Links Column */}
          <div className="space-y-2">
            <div className="relative">
              <div className="font-mono text-xs md:text-sm font-bold text-emerald-400 border border-emerald-400 px-2 py-1 inline-block tracking-wider footer-text-glow footer-border-glow">
                PORTFOLIO
              </div>
              <div className="absolute left-0 top-full w-px h-2 bg-emerald-400/50"></div>
            </div>
            <div className="ml-3 space-y-1 mt-2">
              {portfolioLinks.map((link, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-4 top-1/2 w-3 h-px bg-emerald-400/50"></div>
                  <a
                    href={link.href}
                    className="font-mono text-[10px] md:text-xs text-emerald-400/80 hover:text-emerald-400 border border-emerald-400/50 hover:border-emerald-400 px-1.5 py-0.5 inline-block transition-all duration-200 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] footer-text-glow footer-border-glow"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Connect With Us Column */}
          <div className="space-y-2">
            <div className="relative">
              <div className="font-mono text-xs md:text-sm font-bold text-emerald-400 border border-emerald-400 px-2 py-1 inline-block tracking-wider footer-text-glow footer-border-glow">
                CONNECT WITH US
              </div>
              <div className="absolute left-0 top-full w-px h-2 bg-emerald-400/50"></div>
            </div>
            <div className="ml-3 space-y-1 mt-2">
              {connectLinks.map((link, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-4 top-1/2 w-3 h-px bg-emerald-400/50"></div>
                  <a
                    href={link.href}
                    className="font-mono text-[10px] md:text-xs text-emerald-400/80 hover:text-emerald-400 border border-emerald-400/50 hover:border-emerald-400 px-1.5 py-0.5 inline-block transition-all duration-200 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] block footer-text-glow footer-border-glow"
                  >
                    {link.label}
                  </a>
                  {link.value && (
                    <div className="font-mono text-[9px] md:text-[10px] text-emerald-400/60 ml-2 mt-0.5 footer-text-glow">
                      {link.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Column */}
          <div className="space-y-2">
            <div className="relative">
              <div className="font-mono text-xs md:text-sm font-bold text-emerald-400 border border-emerald-400 px-2 py-1 inline-block tracking-wider footer-text-glow footer-border-glow">
                QUICK ACTIONS
              </div>
              <div className="absolute left-0 top-full w-px h-2 bg-emerald-400/50"></div>
            </div>
            <div className="ml-3 space-y-1 mt-2">
              {quickActions.map((action, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-4 top-1/2 w-3 h-px bg-emerald-400/50"></div>
                  <a
                    href={action.href}
                    className="font-mono text-[10px] md:text-xs text-emerald-400/80 hover:text-emerald-400 border border-emerald-400/50 hover:border-emerald-400 px-1.5 py-0.5 inline-block transition-all duration-200 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] footer-text-glow footer-border-glow"
                  >
                    {action.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-4 pt-4 border-t border-emerald-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="font-mono text-[9px] md:text-xs text-emerald-400/60 footer-text-glow">
              © {new Date().getFullYear()} <span className="text-emerald-400">MANISH KUMAR</span> ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
