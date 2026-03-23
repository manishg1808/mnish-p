import React, { useEffect, useState } from 'react'

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollableHeight) * 100))) : 0

      setScrollProgress(progress)
      setShowScrollTop(scrollTop > 320)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 sm:bottom-5 sm:right-5 sm:gap-2.5">
      <a
        href="https://wa.me/918986010819?text=Hello%20Manish%20Kumar"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Chat"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-[#1ebe5d] sm:h-12 sm:w-12"
      >
        <i className="ri-whatsapp-line text-[22px] sm:text-2xl"></i>
      </a>

      {showScrollTop && (
        <div
          className="relative h-11 w-11 rounded-full p-[2px] shadow-lg shadow-slate-900/35 transition hover:scale-105 sm:h-12 sm:w-12"
          style={{
            background: `conic-gradient(#22d3ee ${scrollProgress}%, rgba(148, 163, 184, 0.35) ${scrollProgress}% 100%)`,
          }}
          aria-hidden="true"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={`Scroll to top (${scrollProgress}% scrolled)`}
            title={`Scroll to Top (${scrollProgress}%)`}
            className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 dark:bg-slate-950 dark:text-cyan-300 dark:hover:bg-slate-900"
          >
            <i className="ri-arrow-up-line text-lg sm:text-xl"></i>
          </button>
          <span className="pointer-events-none absolute -right-1 -top-1 rounded-full bg-cyan-500 px-1 py-[2px] text-[8px] font-semibold leading-none text-slate-950 sm:px-1.5 sm:text-[9px]">
            {scrollProgress}%
          </span>
        </div>
      )}
    </div>
  )
}
