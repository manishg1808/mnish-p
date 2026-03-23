import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useData } from '../context/DataContext.jsx'
import certImage1 from '../assets/fou.png'
import certImage2 from '../assets/fo.png'
import certImage3 from '../assets/eduu.jpg'
import certImage4 from '../assets/uni.png'
import certImage5 from '../assets/q.jpeg'

const certificatePreviewImages = [certImage1, certImage2, certImage3, certImage4, certImage5]
const CERTIFICATE_LIMIT = certificatePreviewImages.length

const fallbackCertificates = [
  {
    id: 1,
    title: 'Frontend Development Certificate',
    issuer: 'Skill Training Program',
    date: '2023',
    description: 'Completed modern frontend training covering HTML, CSS, JavaScript, responsive layouts, and UI best practices.',
    icon: 'ri-code-s-slash-line',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive UI', 'Accessibility'],
    link: '#',
  },
  {
    id: 2,
    title: 'React.js Professional Certificate',
    issuer: 'Developer Academy',
    date: '2023',
    description: 'Advanced React development with reusable components, hooks, routing, and scalable frontend architecture.',
    icon: 'ri-reactjs-line',
    skills: ['React', 'Hooks', 'Component Design', 'State Management', 'Performance'],
    link: '#',
  },
  {
    id: 3,
    title: 'Education Achievement Certificate',
    issuer: 'Academic Board',
    date: '2024',
    description: 'Recognized for consistent academic performance, technical learning outcomes, and successful project submissions.',
    icon: 'ri-graduation-cap-line',
    skills: ['Problem Solving', 'Project Work', 'Technical Writing', 'Research', 'Discipline'],
    link: '#',
  },
  {
    id: 4,
    title: 'University Completion Certificate',
    issuer: 'University Authority',
    date: '2023',
    description: 'Certified completion of university module milestones with verified coursework and internal assessments.',
    icon: 'ri-building-line',
    skills: ['Academic Excellence', 'Course Completion', 'Time Management', 'Communication', 'Fundamentals'],
    link: '#',
  },
  {
    id: 5,
    title: 'Professional Qualification Certificate',
    issuer: 'Industry Program',
    date: '2024',
    description: 'Credential focused on practical implementation skills, project delivery standards, and industry-ready workflows.',
    icon: 'ri-award-line',
    skills: ['Implementation', 'Delivery Process', 'Documentation', 'Team Collaboration', 'Professional Practice'],
    link: '#',
  },
]

const normalizeSkills = (skillsValue, fallback = []) => {
  if (Array.isArray(skillsValue)) {
    return skillsValue
      .map((skill) => (typeof skill === 'string' ? skill.trim() : ''))
      .filter(Boolean)
      .slice(0, 6)
  }

  if (typeof skillsValue === 'string') {
    const parsedSkills = skillsValue
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)
      .slice(0, 6)

    if (parsedSkills.length > 0) {
      return parsedSkills
    }
  }

  return fallback.slice(0, 6)
}

const getDerivedSkills = (title = '') => {
  const lower = title.toLowerCase()

  if (lower.includes('react')) return ['React', 'Component Patterns', 'Hooks', 'State Management']
  if (lower.includes('node')) return ['Node.js', 'Express', 'APIs', 'Backend Architecture']
  if (lower.includes('ui') || lower.includes('ux') || lower.includes('design')) return ['UI Design', 'UX Flow', 'Wireframe', 'Prototyping']
  if (lower.includes('cloud')) return ['Cloud Deploy', 'Infrastructure', 'CI/CD', 'Monitoring']
  if (lower.includes('database')) return ['SQL', 'NoSQL', 'Data Modeling', 'Queries']

  return ['Web Development', 'Engineering', 'Best Practices', 'Problem Solving']
}

export default function Certificate() {
  const { certificates: certificatesData } = useData()
  const [activeIndex, setActiveIndex] = useState(0)
  const [revealedCards, setRevealedCards] = useState({})
  const layoutRef = useRef(null)
  const previewColumnRef = useRef(null)
  const previewStickyRef = useRef(null)
  const cardRefs = useRef([])

  const certificates = useMemo(() => {
    const incoming = Array.isArray(certificatesData) ? certificatesData : []
    const normalizedIncoming = incoming.slice(0, CERTIFICATE_LIMIT).map((certificate, index) => {
      const fallback = fallbackCertificates[index] || fallbackCertificates[0]
      const title = (certificate?.title || fallback.title || '').trim()
      const issuer = (certificate?.issuer || certificate?.organization || fallback.issuer || 'Verified Issuer').trim()
      const date = String(certificate?.date || certificate?.year || fallback.date || '2024').trim()
      const description = (certificate?.description || fallback.description || '').trim()
      const link = certificate?.link || certificate?.url || fallback.link || '#'
      const mappedImage = certificatePreviewImages[index] || certificatePreviewImages[certificatePreviewImages.length - 1]
      const image =
        certificate?.image ||
        certificate?.thumbnail ||
        certificate?.preview ||
        certificate?.certificate_image ||
        mappedImage

      return {
        id: certificate?.id || `cert-${index + 1}`,
        title,
        issuer,
        date,
        description,
        icon: certificate?.icon || fallback.icon || 'ri-award-line',
        skills: normalizeSkills(certificate?.skills, getDerivedSkills(title).concat(fallback.skills || [])),
        link,
        image,
      }
    })

    if (normalizedIncoming.length >= CERTIFICATE_LIMIT) {
      return normalizedIncoming
    }

    const filled = [...normalizedIncoming]
    for (let i = normalizedIncoming.length; i < CERTIFICATE_LIMIT; i += 1) {
      const fallback = fallbackCertificates[i]
      const mappedImage = certificatePreviewImages[i] || certificatePreviewImages[certificatePreviewImages.length - 1]
      filled.push({
        ...fallback,
        skills: normalizeSkills(fallback.skills, getDerivedSkills(fallback.title)),
        image: mappedImage,
      })
    }
    return filled
  }, [certificatesData])

  useEffect(() => {
    setActiveIndex(0)
    setRevealedCards({})
    cardRefs.current = cardRefs.current.slice(0, certificates.length)
  }, [certificates.length])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (cards.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const allVisible = {}
      cards.forEach((_, index) => {
        allVisible[index] = true
      })
      setRevealedCards(allVisible)
      return
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(entry.target.dataset.index)
          if (Number.isNaN(index)) return

          setRevealedCards((prev) => {
            if (prev[index]) return prev
            return { ...prev, [index]: true }
          })
        })
      },
      { threshold: 0.22, rootMargin: '0px 0px -12% 0px' }
    )

    cards.forEach((card) => {
      revealObserver.observe(card)
    })

    return () => {
      revealObserver.disconnect()
    }
  }, [certificates])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (cards.length === 0) return

    let rafId = 0

    const updateActiveFromScroll = () => {
      rafId = 0
      const viewportAnchor = Math.min(window.innerHeight * 0.45, window.innerHeight - 120)
      let nextIndex = 0
      let smallestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = Math.abs(cardCenter - viewportAnchor)
        if (distance < smallestDistance) {
          smallestDistance = distance
          nextIndex = index
        }
      })

      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex))
    }

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveFromScroll)
      }
    }

    updateActiveFromScroll()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [certificates])

  useEffect(() => {
    const layout = layoutRef.current
    const previewColumn = previewColumnRef.current
    const previewSticky = previewStickyRef.current
    if (!layout || !previewColumn || !previewSticky) return

    const topOffset = 104
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    let rafId = 0

    const resetPinStyles = () => {
      previewSticky.classList.remove('is-fixed', 'is-bottom')
      previewSticky.style.position = 'relative'
      previewSticky.style.top = 'auto'
      previewSticky.style.left = 'auto'
      previewSticky.style.width = 'auto'
      previewColumn.style.minHeight = 'auto'
    }

    const applyPinnedStyles = () => {
      const layoutRect = layout.getBoundingClientRect()
      const layoutTopAbs = window.scrollY + layoutRect.top
      const layoutHeight = layout.offsetHeight
      const layoutBottomAbs = layoutTopAbs + layoutHeight
      const stickyHeight = previewSticky.offsetHeight
      const colRect = previewColumn.getBoundingClientRect()
      const scrollY = window.scrollY

      previewColumn.style.minHeight = `${layoutHeight}px`

      const pinStart = layoutTopAbs - topOffset
      const pinEnd = layoutBottomAbs - stickyHeight - topOffset

      if (scrollY < pinStart) {
        previewSticky.classList.remove('is-fixed', 'is-bottom')
        previewSticky.style.position = 'relative'
        previewSticky.style.top = 'auto'
        previewSticky.style.left = 'auto'
        previewSticky.style.width = 'auto'
        return
      }

      if (scrollY >= pinEnd) {
        const bottomTop = Math.max(0, layoutHeight - stickyHeight)
        previewSticky.classList.remove('is-fixed')
        previewSticky.classList.add('is-bottom')
        previewSticky.style.position = 'absolute'
        previewSticky.style.top = `${bottomTop}px`
        previewSticky.style.left = '0px'
        previewSticky.style.width = '100%'
        return
      }

      previewSticky.classList.remove('is-bottom')
      previewSticky.classList.add('is-fixed')
      previewSticky.style.position = 'fixed'
      previewSticky.style.top = `${topOffset}px`
      previewSticky.style.left = `${colRect.left}px`
      previewSticky.style.width = `${colRect.width}px`
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

  const activeCertificate = certificates[activeIndex] || certificates[0]

  const handleView = (certificate) => {
    if (!certificate?.link || certificate.link === '#') return
    window.open(certificate.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="certificate" className="cert-showcase-section py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="mb-12 text-center">
          <p className="cert-showcase-kicker">Certificates</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Verified Certifications</h2>
          <p className="cert-showcase-intro">Left cards scroll with details, and the right preview image updates card-by-card.</p>
        </div>

        <div ref={layoutRef} className="cert-flow-layout">
          <div className="cert-flow-cards-column">
            {certificates.map((certificate, index) => (
              <article
                key={certificate.id || index}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                data-index={index}
                className={`cert-flow-card ${revealedCards[index] ? 'is-visible' : ''} ${activeIndex === index ? 'is-active' : ''}`}
              >
                <div className="cert-flow-card-head">
                  <p className="cert-flow-card-order">{String(index + 1).padStart(2, '0')}</p>
                  <span className="cert-flow-card-icon" aria-hidden="true">
                    <i className={certificate.icon || 'ri-award-line'}></i>
                  </span>
                </div>

                <h3 className="cert-flow-card-title">{certificate.title}</h3>
                <p className="cert-flow-card-meta">
                  <span>{certificate.issuer}</span>
                  <span>{certificate.date}</span>
                </p>

                <p className="cert-flow-card-description">{certificate.description}</p>

                <div className="cert-flow-card-skills-block">
                  <p className="cert-flow-card-label">Skills Covered</p>
                  <ul className="cert-flow-card-skill-list">
                    {certificate.skills.map((skill) => (
                      <li key={`${certificate.id}-${skill}`}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleView(certificate)}
                  className="cert-flow-card-btn"
                  disabled={!certificate.link || certificate.link === '#'}
                >
                  <i className="ri-external-link-line"></i>
                  Open Credential
                </button>
              </article>
            ))}
          </div>

          <aside ref={previewColumnRef} className="cert-flow-preview-column">
            <div ref={previewStickyRef} className="cert-flow-preview-sticky">
              <article className="cert-flow-preview-card" aria-live="polite">
                <p className="cert-flow-preview-count">
                  Preview {String(activeIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
                </p>

                <div className="cert-flow-preview-image-wrap">
                  <img
                    key={activeCertificate?.id || activeIndex}
                    src={activeCertificate?.image}
                    alt={`${activeCertificate?.title} certificate preview`}
                    className="cert-flow-preview-image"
                    loading="lazy"
                  />
                </div>

                <h3 className="cert-flow-preview-title">{activeCertificate?.title}</h3>
                <p className="cert-flow-preview-meta">
                  <span>{activeCertificate?.issuer}</span>
                  <span>{activeCertificate?.date}</span>
                </p>

                <button
                  onClick={() => handleView(activeCertificate)}
                  className="cert-flow-preview-btn"
                  disabled={!activeCertificate?.link || activeCertificate.link === '#'}
                >
                  <i className="ri-external-link-line"></i>
                  View Certificate
                </button>
              </article>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
