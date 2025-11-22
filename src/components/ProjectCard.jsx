import React from 'react'
import { projectImages } from '../data/projectImages.js'

export default function ProjectCard({ project }) {
  const imageSrc = projectImages[project.image] || project.image
  return (
    <a href={project.link} target="_blank" rel="noreferrer" className="card group block">
      <div className="aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <img src={imageSrc} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t, i) => (
          <span key={i} className="rounded-full border border-gray-200 dark:border-gray-800 px-2.5 py-1 text-xs">{t}</span>
        ))}
      </div>
    </a>
  )
}
