import React, { useEffect, useState } from 'react'

export default function Skills() {
  const [animatedProgress, setAnimatedProgress] = useState({})

  const skills = [
    { id: 1, name: 'CSS', percentage: 95 },
    { id: 2, name: 'HTML', percentage: 98 },
    { id: 3, name: 'jQuery', percentage: 68 },
    { id: 4, name: 'Photoshop', percentage: 92 },
    { id: 5, name: 'WordPress', percentage: 83 },
    { id: 6, name: 'SEO', percentage: 95 },
  ]

  useEffect(() => {
    // Animate progress on mount
    const timer = setTimeout(() => {
      const progress = {}
      skills.forEach(skill => {
        progress[skill.id] = skill.percentage
      })
      setAnimatedProgress(progress)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="dark:stroke-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#84cc16"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {percentage}%
          </span>
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map(skill => (
            <div
              key={skill.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 text-center"
            >
              {/* Skill Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {skill.name}
              </h3>

              {/* Circular Progress */}
              <div className="flex justify-center">
                <CircularProgress 
                  percentage={animatedProgress[skill.id] || 0} 
                  size={140}
                  strokeWidth={10}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


