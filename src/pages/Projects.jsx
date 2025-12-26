import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      // Ensure data is an array
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      // Fallback to empty array if backend is not running
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Loading projects...</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-3xl font-bold">Projects</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-1">A selection of my recent work.</p>
      {projects.length === 0 ? (
        <div className="mt-8 card text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">No projects added yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  )
}
