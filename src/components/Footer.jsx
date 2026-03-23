import React from 'react'
import mtrLogo from '../assets/mtr logo.png'

export default function Footer() {
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Technology Stack', href: '#technology-stack' },
    { label: 'Projects', href: '#project' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ]

  const expertise = [
    'Full Stack Developer',
    'Frontend Development',
    'MERN Stack Development',
    'WordPress Development',
    'Responsive UI Engineering',
    'Website Optimization',
  ]

  const socialLinks = [
    { icon: 'ri-linkedin-line', href: 'https://linkedin.com/in/er-mnish-kumar-8227572b8', label: 'LinkedIn' },
    { icon: 'ri-github-line', href: 'https://github.com/manishg1808', label: 'GitHub' },
    { icon: 'ri-instagram-line', href: 'https://www.instagram.com/er.mnish_g_420?igsh=aXhpejdxbjV1Nmdr', label: 'Instagram' },
    { icon: 'ri-facebook-line', href: 'https://www.facebook.com/share/17ZpmcKtd9/', label: 'Facebook' },
    { icon: 'ri-whatsapp-line', href: 'https://wa.me/918986010819?text=Hello%20Manish.G', label: 'WhatsApp' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <div className="mb-10 rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-6 text-white shadow-xl shadow-slate-900/20 md:flex md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Available for Work</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">Need a professional web solution?</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Let us build a fast, modern, and business-focused digital experience for your brand.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 md:mt-0"
          >
            Start Project Discussion
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-3">
              <img src={mtrLogo} alt="Manish Kumar logo" className="h-11 w-11 rounded-xl border border-slate-200 object-cover dark:border-slate-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Manish Kumar</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Web Developer</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Delivering robust, scalable, and user-focused digital products with clean UI and dependable performance.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  <i className={`${social.icon} text-base`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 dark:text-white">Expertise</h3>
            <ul className="mt-4 space-y-2.5">
              {expertise.map((item) => (
                <li key={item} className="text-sm text-slate-600 dark:text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 dark:text-white">Contact</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href="mailto:mnishg49@gmail.com" className="flex items-center gap-2 text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
                <i className="ri-mail-line text-base"></i>
                <span>mnishg49@gmail.com</span>
              </a>
              <a href="tel:+918092970688" className="flex items-center gap-2 text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
                <i className="ri-phone-line text-base"></i>
                <span>+91 8092970688</span>
              </a>
            </div>

            <div className="mt-5 space-y-2.5">
              <a
                href="#project"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
              >
                View Portfolio
              </a>
              <a
                href="#certificate"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
              >
                View Certifications
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row">
          <p>Copyright {new Date().getFullYear()} Manish Kumar. All rights reserved.</p>
          <p>Crafted with professional standards for performance and clarity.</p>
        </div>
      </div>
    </footer>
  )
}
