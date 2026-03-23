import React, { useEffect, useRef, useState } from 'react'
import centerLogo from '../assets/me 2.png'

const skillOrbitIcons = [
  { name: 'HTML', tooltip: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', tooltip: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind', tooltip: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Bootstrap', tooltip: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'JavaScript', tooltip: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', tooltip: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', tooltip: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', tooltip: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'WordPress', tooltip: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' },
  { name: 'Node.js', tooltip: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', tooltip: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'PHP', tooltip: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'PostgreSQL', tooltip: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', tooltip: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Hostinger', tooltip: 'Hostinger', icon: 'https://cdn.simpleicons.org/hostinger/673DE6' },
  { name: 'Vercel', tooltip: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Netlify', tooltip: 'Netlify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
  { name: 'Canva', tooltip: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
  { name: 'SEO', tooltip: 'SEO', icon: 'https://cdn.simpleicons.org/googlesearchconsole/4285F4' },
  { name: 'GoDaddy', tooltip: 'GoDaddy', icon: 'https://cdn.simpleicons.org/godaddy/97C93D' },
]

const outerOrbitNodes = skillOrbitIcons.slice(0, 10)
const innerOrbitNodes = skillOrbitIcons.slice(10)

const frameworkCards = [
  {
    id: 'frontend',
    icon: 'ri-code-s-slash-line',
    title: 'Frontend',
    chips: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'React', 'Angular', 'Vue'],
  },
  {
    id: 'backend',
    icon: 'ri-terminal-box-line',
    title: 'Backend',
    chips: ['Node.js', 'Express.js', 'PHP'],
  },
  {
    id: 'database',
    icon: 'ri-database-2-line',
    title: 'Database',
    chips: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'deployment',
    icon: 'ri-upload-cloud-2-line',
    title: 'Deployment',
    chips: ['Hostinger', 'GoDaddy', 'Vercel', 'Netlify'],
  },
]

const stackOptions = [
  {
    id: 1,
    title: 'React + Node.js + MySQL/PostgreSQL',
    bestFor: ['Advanced web apps', 'SaaS platforms'],
    why: ['Fast', 'Scalable', 'Modern'],
  },
  {
    id: 2,
    title: 'HTML + Node.js + MySQL',
    bestFor: ['Simple websites with backend', 'Admin panels'],
    why: ['Lightweight', 'Cost-effective'],
  },
  {
    id: 3,
    title: 'HTML + PHP + MySQL',
    bestFor: ['Business websites', 'Budget projects'],
    why: ['Stable', 'Easy hosting'],
  },
  {
    id: 4,
    title: 'React + PHP + MySQL/PostgreSQL',
    bestFor: ['Hybrid applications'],
    why: ['Modern frontend + stable backend'],
  },
  {
    id: 5,
    title: 'Full PHP (Frontend + Backend)',
    bestFor: ['Simple dynamic websites'],
    why: ['Fast development', 'Low cost'],
  },
  {
    id: 6,
    title: 'MERN Stack (MongoDB + Express + React + Node)',
    bestFor: ['High-performance apps', 'Real-time systems'],
    why: ['Full JavaScript stack', 'Highly scalable'],
  },
]

export default function TechnologyStack() {
  const sectionRef = useRef(null)
  const rowRef = useRef(null)
  const leftColumnRef = useRef(null)
  const leftStickyRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [orbitDurations, setOrbitDurations] = useState({ outer: 22, inner: 17 })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const row = rowRef.current
    const leftColumn = leftColumnRef.current
    const leftSticky = leftStickyRef.current
    if (!row || !leftColumn || !leftSticky) return

    const topOffset = 96
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    let rafId = 0

    const resetPinStyles = () => {
      leftSticky.classList.remove('is-fixed', 'is-bottom')
      leftSticky.style.position = 'relative'
      leftSticky.style.top = 'auto'
      leftSticky.style.left = 'auto'
      leftSticky.style.width = 'auto'
      leftColumn.style.minHeight = 'auto'
    }

    const applyPinnedStyles = () => {
      const rowRect = row.getBoundingClientRect()
      const rowTopAbs = window.scrollY + rowRect.top
      const rowHeight = row.offsetHeight
      const rowBottomAbs = rowTopAbs + rowHeight
      const stickyHeight = leftSticky.offsetHeight
      const colRect = leftColumn.getBoundingClientRect()
      const scrollY = window.scrollY

      leftColumn.style.minHeight = `${rowHeight}px`

      const pinStart = rowTopAbs - topOffset
      const pinEnd = rowBottomAbs - stickyHeight - topOffset

      if (scrollY < pinStart) {
        leftSticky.classList.remove('is-fixed', 'is-bottom')
        leftSticky.style.position = 'relative'
        leftSticky.style.top = 'auto'
        leftSticky.style.left = 'auto'
        leftSticky.style.width = 'auto'
        return
      }

      if (scrollY >= pinEnd) {
        const bottomTop = Math.max(0, rowHeight - stickyHeight)
        leftSticky.classList.remove('is-fixed')
        leftSticky.classList.add('is-bottom')
        leftSticky.style.position = 'absolute'
        leftSticky.style.top = `${bottomTop}px`
        leftSticky.style.left = '0px'
        leftSticky.style.width = '100%'
        return
      }

      leftSticky.classList.remove('is-bottom')
      leftSticky.classList.add('is-fixed')
      leftSticky.style.position = 'fixed'
      leftSticky.style.top = `${topOffset}px`
      leftSticky.style.left = `${colRect.left}px`
      leftSticky.style.width = `${colRect.width}px`
    }

    const updatePin = () => {
      rafId = 0
      if (!desktopQuery.matches) {
        resetPinStyles()
        return
      }
      applyPinnedStyles()
    }

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updatePin)
      }
    }

    updatePin()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', scheduleUpdate)
    }

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (desktopQuery.removeEventListener) {
        desktopQuery.removeEventListener('change', scheduleUpdate)
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const scrollCards = Array.from(section.querySelectorAll('[data-tech-grid-card]'))
    if (scrollCards.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      scrollCards.forEach((card) => {
        card.classList.add('about-stack-scroll-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-stack-scroll-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )

    scrollCards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    let rafId = 0

    const updateOrbitSpeed = () => {
      rafId = 0
      const sectionRect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const sectionTop = sectionRect.top + window.scrollY
      const sectionBottom = sectionTop + section.offsetHeight
      const scrollY = window.scrollY

      const start = sectionTop - viewportHeight * 0.25
      const end = sectionBottom - viewportHeight * 0.55
      const rawProgress = end > start ? (scrollY - start) / (end - start) : 0
      const progress = Math.max(0, Math.min(1, rawProgress))

      const outer = Number((24 - progress * 10).toFixed(2))
      const inner = Number((18 - progress * 7).toFixed(2))
      setOrbitDurations((prev) => {
        if (Math.abs(prev.outer - outer) < 0.05 && Math.abs(prev.inner - inner) < 0.05) {
          return prev
        }
        return { outer, inner }
      })
    }

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateOrbitSpeed)
      }
    }

    updateOrbitSpeed()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section
      id="technology-stack"
      ref={sectionRef}
      className={`py-16 bg-white about-tech-stack-hybrid ${isVisible ? 'about-stack-entered' : ''}`}
      data-about-tech-stack
      style={{
        '--orbit-outer-duration': `${orbitDurations.outer}s`,
        '--orbit-inner-duration': `${orbitDurations.inner}s`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#0B1C3D]">Technology We Use</h2>
        </div>

        <div ref={rowRef} className="mt-10 grid items-start gap-8 lg:grid-cols-[0.95fr_1fr] xl:grid-cols-[1.02fr_1fr]">
          <div ref={leftColumnRef} className="about-stack-left-column">
            <div ref={leftStickyRef} className="about-stack-left-sticky">
              <div className="about-stack-visual">
                <div className="about-stack-orbit-stage" aria-label="Orbiting technology stack">
                  <div className="about-stack-orbit-ring about-stack-orbit-ring--outer">
                    {outerOrbitNodes.map((node, index) => (
                      <button
                        key={node.name}
                        type="button"
                        className="about-stack-orbit-node"
                        data-tech-node
                        aria-label={node.tooltip}
                        style={{
                          '--orbit-angle': `${(index * 360) / outerOrbitNodes.length}deg`,
                          '--orbit-distance': '182px',
                        }}
                      >
                        <span className="about-stack-orbit-node-core about-stack-reveal" style={{ transitionDelay: `${index * 45}ms` }}>
                          <span className="about-stack-orbit-icon" aria-hidden="true">
                            <img src={node.icon} alt="" loading="lazy" />
                          </span>
                          <span className="about-stack-orbit-name">{node.name}</span>
                        </span>
                        <span className="about-stack-orbit-tooltip">{node.tooltip}</span>
                      </button>
                    ))}
                  </div>

                  <div className="about-stack-orbit-ring about-stack-orbit-ring--inner">
                    {innerOrbitNodes.map((node, index) => (
                      <button
                        key={node.name}
                        type="button"
                        className="about-stack-orbit-node"
                        data-tech-node
                        aria-label={node.tooltip}
                        style={{
                          '--orbit-angle': `${(index * 360) / innerOrbitNodes.length + 18}deg`,
                          '--orbit-distance': '138px',
                        }}
                      >
                        <span
                          className="about-stack-orbit-node-core about-stack-reveal"
                          style={{ transitionDelay: `${(outerOrbitNodes.length + index) * 45}ms` }}
                        >
                          <span className="about-stack-orbit-icon" aria-hidden="true">
                            <img src={node.icon} alt="" loading="lazy" />
                          </span>
                          <span className="about-stack-orbit-name">{node.name}</span>
                        </span>
                        <span className="about-stack-orbit-tooltip">{node.tooltip}</span>
                      </button>
                    ))}
                  </div>

                  <div className="about-stack-orbit-center about-stack-reveal" data-tech-orbit-center style={{ transitionDelay: '380ms' }}>
                    <img src={centerLogo} alt="Center logo" className="about-stack-center-logo" />
                    <p className="about-stack-center-title">Manish Kumar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stack-grid-panel">
            <div className="about-stack-grid-head">
              <h3 className="text-2xl text-[#0B1C3D]">UI-Centric Technology Framework</h3>
            </div>

            <div className="about-stack-grid">
              {frameworkCards.map((card, index) => (
                <article
                  key={card.id}
                  className="about-stack-grid-card about-stack-scroll-card"
                  data-tech-grid-card
                  style={{ '--stack-card-delay': `${120 + index * 65}ms` }}
                >
                  <span className="about-stack-grid-icon" aria-hidden="true">
                    <i className={card.icon}></i>
                  </span>
                  <p className="about-stack-grid-kicker">{card.title}</p>
                  <div className="about-stack-chip-wrap">
                    {card.chips.map((chip) => (
                      <span key={chip} className="about-stack-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="about-stack-options-panel">
              <div
                className="about-stack-grid-head about-stack-options-head about-stack-scroll-card"
                data-tech-grid-card
                style={{ '--stack-card-delay': '280ms' }}
              >
                <p className="about-stack-options-tag">Professional Explanation</p>
                <h3 className="text-2xl text-[#0B1C3D]">Different Technology Stack Options</h3>
                <p className="about-stack-options-intro">
                  Each stack is selected for delivery speed, long-term maintainability, and business-fit architecture.
                </p>
              </div>

              <div className="about-stack-options-grid">
                {stackOptions.map((option, index) => (
                  <article
                    key={option.id}
                    className="about-stack-option-card about-stack-scroll-card"
                    data-tech-grid-card
                    style={{ '--stack-card-delay': `${320 + index * 65}ms` }}
                  >
                    <p className="about-stack-option-rank">Option {option.id}</p>
                    <h4 className="about-stack-option-title">{option.title}</h4>
                    <div className="about-stack-option-block">
                      <p className="about-stack-option-label">Best for</p>
                      <ul className="about-stack-option-list">
                        {option.bestFor.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="about-stack-option-block">
                      <p className="about-stack-option-label">Why</p>
                      <ul className="about-stack-option-list">
                        {option.why.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              <article
                className="about-stack-choice-card about-stack-scroll-card"
                data-tech-grid-card
                style={{ '--stack-card-delay': '680ms' }}
              >
                <p className="about-stack-choice-tag">How We Choose Stack</p>
                <h4 className="about-stack-choice-title">We do not follow a fixed technology approach.</h4>
                <p className="about-stack-choice-text">
                  Each project is analyzed based on its complexity, scalability requirements, and business goals.
                </p>
                <p className="about-stack-choice-text">
                  Based on this, we select the most suitable technology stack to ensure maximum performance, security, and
                  efficiency.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
