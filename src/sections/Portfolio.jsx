import React, { useEffect, useState } from 'react'
import { projectImages } from '../data/projectImages.js'

const categories = ['All', 'App', 'Product', 'Branding', 'Books']

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory))
    }
  }, [activeCategory, projects])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects')
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`)
        setProjects(generateDefaultProjects())
        setFilteredProjects(generateDefaultProjects())
        return
      }
      const data = await response.json()
      
      // Ensure data is an array
      const projectsData = Array.isArray(data) ? data : []
      
      // Add categories if not present, or use default
      const projectsWithCategory = projectsData.length > 0 
        ? projectsData.map((p, idx) => ({
            ...p,
            category: p.category || categories[(idx % (categories.length - 1)) + 1]
          }))
        : generateDefaultProjects()
      
      setProjects(projectsWithCategory)
      setFilteredProjects(projectsWithCategory)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects(generateDefaultProjects())
      setFilteredProjects(generateDefaultProjects())
    } finally {
      setLoading(false)
    }
  }

  const generateDefaultProjects = () => {
    const defaultProjects = []
    const types = ['App', 'Product', 'Branding', 'Books']
    
    types.forEach((type, typeIdx) => {
      for (let i = 1; i <= 3; i++) {
        defaultProjects.push({
          id: typeIdx * 3 + i,
          title: `${type} ${i}`,
          description: 'Lorem ipsum, dolor sit amet consectetur',
          category: type,
          image: 'placeholder1.svg',
          link: '#',
        })
      }
    })
    
    return defaultProjects
  }

  return (
    <section id="project" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. 
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              // Use placeholder image or fallback to a default image URL
              const imageSrc = projectImages[project.image] || 
                              project.image || 
                              projectImages['placeholder1.svg'] ||
                              'https://via.placeholder.com/600x600/4F46E5/ffffff?text=' + encodeURIComponent(project.title)
              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-gray-200 text-sm">{project.description}</p>
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

