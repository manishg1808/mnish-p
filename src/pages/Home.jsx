import React, { useState, useEffect } from 'react'
import profile from '../assets/profile.svg'

export default function Home() {
  const [displayText, setDisplayText] = useState('Manish Kumar')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setDisplayText(prev => prev === 'Manish Kumar' ? 'Web Developer' : 'Manish Kumar')
        setIsAnimating(false)
      }, 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="grid gap-8 sm:grid-cols-[1fr,2fr] items-center">
      <div className="flex justify-center sm:justify-start">
        <img src={profile} alt="Profile" className="w-40 h-40 rounded-full ring-4 ring-indigo-600 shadow-card" />
      </div>
      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          <span className="glow-brackets">&lt; </span>
          Hi, I'm{' '}
          <span 
            className={`text-indigo-600 transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {displayText}
          </span>
          <span className="glow-brackets">  /&gt;</span>
        </h1>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">Frontend Developer • 3 Months Onsite Experience • MERN Stack</p>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">BCA Student at Meerut Institute of Technology • Full Stack Web Development Certified</p>
        <div className="mt-6 flex gap-3">
          <a href="/projects" className="btn btn-primary">View Projects</a>
          <a href="/contact" className="btn border border-indigo-600">Contact Me</a>
        </div>
      </div>
    </section>
  )
}
