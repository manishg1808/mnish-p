import React, { useEffect, useState, useMemo } from 'react'
import { useData } from '../context/DataContext.jsx'
import { PORTFOLIO_CONFIG } from '../config/portfolioConfig.js'
import { DEFAULT_PROJECTS_CONFIG } from '../config/portfolioConfig.js'
import { 
  getProjectImageSrc, 
  processBackendProjects, 
  generateDefaultProjects,
  ensureMinimumProjects 
} from '../utils/portfolioHelpers.js'

export default function Portfolio() {
  const { projects: projectsData, loading } = useData()
  const [activeCategory, setActiveCategory] = useState(PORTFOLIO_CONFIG.categories[0])
  
  // Generate default projects function
  const getDefaultProjects = useMemo(() => {
    return () => generateDefaultProjects(DEFAULT_PROJECTS_CONFIG)
  }, [])
  
  // Initialize with default projects
  const [filteredProjects, setFilteredProjects] = useState(getDefaultProjects())
  
  // Process projects with categories - Always show configured number of projects
  const projects = useMemo(() => {
    const defaultProjects = getDefaultProjects()
    
    // If no backend data, return defaults
    if (!projectsData || projectsData.length === 0) {
      return defaultProjects
    }
    
    // Process backend projects
    const processedBackendProjects = processBackendProjects(
      projectsData, 
      PORTFOLIO_CONFIG.categories
    )
    
    // Ensure minimum projects count
    return ensureMinimumProjects(
      processedBackendProjects,
      PORTFOLIO_CONFIG.defaultProjectsCount,
      getDefaultProjects
    )
  }, [projectsData, getDefaultProjects])


  useEffect(() => {
    // Filter out projects with title "PG" and filter by category
    const filtered = projects.filter(p => p.title !== 'PG' && p.title !== 'pg')
    
    if (activeCategory === 'All') {
      setFilteredProjects(filtered)
    } else {
      setFilteredProjects(filtered.filter(p => p.category === activeCategory))
    }
  }, [activeCategory, projects])

  return (
    <section id="project" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${PORTFOLIO_CONFIG.title.textColor} mb-4`}>
            <span className={PORTFOLIO_CONFIG.title.prefixColor}>
              {PORTFOLIO_CONFIG.title.prefix}
            </span>{' '}
            {PORTFOLIO_CONFIG.title.text}{' '}
            <span className={PORTFOLIO_CONFIG.title.prefixColor}>
              {PORTFOLIO_CONFIG.title.suffix}
            </span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PORTFOLIO_CONFIG.categories.map((category, index) => {
            const gradient = PORTFOLIO_CONFIG.categoryGradients[index % PORTFOLIO_CONFIG.categoryGradients.length]
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition ${
                  activeCategory === category
                    ? `${gradient} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6`}>
            {filteredProjects.map(project => {
              const imageSrc = getProjectImageSrc(project.image, project.title)
              
              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = `https://via.placeholder.com/600x600/4F46E5/ffffff?text=${encodeURIComponent(project.title)}`
                      }}
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="flex items-center justify-between mb-3">
                        <a 
                          href={project.link || '#'} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 backdrop-blur-sm text-white rounded-full font-semibold text-sm hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Live
                        </a>
                      </div>
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">{project.title}</h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

