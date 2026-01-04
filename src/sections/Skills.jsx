import React, { useEffect, useState } from 'react'

export default function Skills() {
  const [animatedProgress, setAnimatedProgress] = useState({})
  const [expandedCategories, setExpandedCategories] = useState({})

  // Static skills data organized by category
  const skillsByCategory = {
    Frontend: [
      { id: 1, name: 'HTML', percentage: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { id: 2, name: 'CSS', percentage: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { id: 3, name: 'Tailwind', percentage: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { id: 4, name: 'Bootstrap', percentage: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { id: 5, name: 'JavaScript', percentage: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { id: 6, name: 'TypeScript', percentage: 40, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { id: 7, name: 'React', percentage: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { id: 8, name: 'Next.js', percentage: 30, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { id: 9, name: 'WordPress', percentage: 99, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' }
    ],
    Backend: [
      { id: 11, name: 'Node.js', percentage: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { id: 12, name: 'Express.js', percentage: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { id: 13, name: 'PHP', percentage: 50, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { id: 14, name: 'WordPress', percentage: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' }
    ],
    Database: [
      { id: 15, name: 'PostgreSQL', percentage: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { id: 16, name: 'MySQL', percentage: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
    ],
    Deploy: [
      { id: 17, name: 'GitHub', percentage: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { id: 18, name: 'Vercel', percentage: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
      { id: 19, name: 'Netlify', percentage: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' }
    ],
    Others: [
      { id: 21, name: 'Canva', percentage: 40, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
      { id: 22, name: 'SEO', percentage: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' }
    ]
  }

  // Animate progress on mount
  useEffect(() => {
    const allSkills = Object.values(skillsByCategory).flat()
    const timer = setTimeout(() => {
      const progress = {}
      allSkills.forEach(skill => {
        progress[skill.id] = skill.percentage
      })
      setAnimatedProgress(progress)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const CircularProgress = ({ percentage, size = 60, strokeWidth = 5, uniqueId = 'default', icon }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference
    const gradientId = `gradient-${uniqueId}`

    return (
      <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Gradient Definition - Teal to Green */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          
          {/* Background circle - light grey */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="dark:stroke-gray-700"
          />
          {/* Progress circle with teal-to-green gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDashoffset: offset
            }}
          />
        </svg>
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-sm font-bold text-gray-900 dark:text-white"
          >
            {percentage}%
          </span>
        </div>
        {/* Icon positioned at top-right of circle, slightly overlapping */}
        {icon && (
          <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-950 rounded-full p-0.5">
            <img 
              src={icon} 
              alt=""
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="glow-brackets-hero">{'{ '}</span>
            Skills
            <span className="glow-brackets-hero">{' };'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Frontend Column */}
          {Object.entries(skillsByCategory).map(([categoryName, skills]) => {
            const isExpanded = expandedCategories[categoryName] || false
            const visibleSkills = isExpanded ? skills : skills.slice(0, 5)
            const hasMore = skills.length > 5
            const categoryIcons = {
              Frontend: 'ri-pages-line',
              Backend: 'ri-terminal-box-line',
              Database: 'ri-database-2-line',
              Deploy: 'ri-upload-cloud-2-line',
              Others: 'ri-tools-line'
            }

            return (
              <div key={categoryName} className="flex flex-col items-center gap-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <i className={`${categoryIcons[categoryName]} text-2xl text-indigo-600 dark:text-indigo-400`}></i>
                  <span>{categoryName}</span>
                </h3>
                {visibleSkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex flex-col items-center justify-center"
                  >
                    <CircularProgress 
                      percentage={animatedProgress[skill.id] || 0} 
                      size={60}
                      strokeWidth={5}
                      uniqueId={skill.id}
                      icon={skill.icon}
                    />
                    <h4 className="text-[12px] font-bold text-gray-900 dark:text-white text-center mt-2">
                      {skill.name}
                    </h4>
                  </div>
                ))}
                {hasMore && (
                  <button
                    onClick={() => setExpandedCategories(prev => ({
                      ...prev,
                      [categoryName]: !prev[categoryName]
                    }))}
                    className="mt-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors border border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


