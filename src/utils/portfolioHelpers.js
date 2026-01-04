// Portfolio Helper Functions
// Utility functions for portfolio section

import { projectImages } from '../data/projectImages.js'
import { PORTFOLIO_CONFIG } from '../config/portfolioConfig.js'

/**
 * Get image source for a project
 * Handles different image formats: URLs, uploaded files, local images
 */
export const getProjectImageSrc = (projectImage, projectTitle = 'Project') => {
  if (!projectImage) {
    return projectImages['placeholder1.svg'] || 
           'https://via.placeholder.com/600x600/4F46E5/ffffff?text=' + encodeURIComponent(projectTitle)
  }

  // If image is a full URL
  if (projectImage.startsWith('http://') || projectImage.startsWith('https://')) {
    return projectImage
  }

  // If image is from uploads folder
  if (projectImage.startsWith('/uploads')) {
    return `${PORTFOLIO_CONFIG.api.baseUrl}${projectImage}`
  }

  // If image is an uploaded project file
  if (projectImage.startsWith('project-')) {
    return `${PORTFOLIO_CONFIG.api.baseUrl}${PORTFOLIO_CONFIG.api.uploadsPath}/${projectImage}`
  }

  // Check if image exists in projectImages
  if (projectImages[projectImage]) {
    return projectImages[projectImage]
  }

  // Check with .svg extension
  if (projectImages[`${projectImage}.svg`]) {
    return projectImages[`${projectImage}.svg`]
  }

  // Fallback to placeholder
  return projectImages['placeholder1.svg'] || 
         'https://via.placeholder.com/600x600/4F46E5/ffffff?text=' + encodeURIComponent(projectTitle)
}

/**
 * Process backend projects data
 * Adds default category if missing and ensures proper formatting
 */
export const processBackendProjects = (projectsData, categories) => {
  if (!projectsData || !Array.isArray(projectsData)) {
    return []
  }

  return projectsData.map((project, idx) => ({
    ...project,
    category: project.category || categories[(idx % (categories.length - 1)) + 1]
  }))
}

/**
 * Generate default projects based on configuration
 */
export const generateDefaultProjects = (config) => {
  const { distribution, defaultProject, placeholderImages, customWordPressProjects, customClientProjects, customPersonalProjects } = config
  const defaultProjects = []
  let projectId = 1

  Object.entries(distribution).forEach(([category, count]) => {
    // Check if this is Personal Projects category and has custom projects
    if (category === 'Personal Projects' && customPersonalProjects && customPersonalProjects.length > 0) {
      // Use custom Personal projects (use all available or up to count)
      const projectsToUse = customPersonalProjects.slice(0, count)
      projectsToUse.forEach((customProject) => {
        defaultProjects.push({
          id: projectId,
          title: customProject.title,
          description: customProject.description || defaultProject.description,
          category: category,
          image: customProject.image || placeholderImages[(projectId - 1) % placeholderImages.length],
          link: customProject.link || defaultProject.link,
        })
        projectId++
      })
    } else if (category === 'WordPress' && customWordPressProjects && customWordPressProjects.length > 0) {
      // Use custom WordPress projects (use all available or up to count)
      const projectsToUse = customWordPressProjects.slice(0, count)
      projectsToUse.forEach((customProject) => {
        defaultProjects.push({
          id: projectId,
          title: customProject.title,
          description: customProject.description || defaultProject.description,
          category: category,
          image: customProject.image || placeholderImages[(projectId - 1) % placeholderImages.length],
          link: customProject.link || defaultProject.link,
        })
        projectId++
      })
    } else if (category === 'Client' && customClientProjects && customClientProjects.length > 0) {
      // Use custom Client projects (use all available or up to count)
      const projectsToUse = customClientProjects.slice(0, count)
      projectsToUse.forEach((customProject) => {
        defaultProjects.push({
          id: projectId,
          title: customProject.title,
          description: customProject.description || defaultProject.description,
          category: category,
          image: customProject.image || placeholderImages[(projectId - 1) % placeholderImages.length],
          link: customProject.link || defaultProject.link,
        })
        projectId++
      })
    } else {
      // Generate default projects for other categories
      for (let i = 1; i <= count; i++) {
        defaultProjects.push({
          id: projectId,
          title: `${category} ${i}`,
          description: defaultProject.description,
          category: category,
          image: placeholderImages[(projectId - 1) % placeholderImages.length],
          link: defaultProject.link,
        })
        projectId++
      }
    }
  })

  return defaultProjects
}

/**
 * Ensure minimum number of projects
 * Pads with default projects if needed
 */
export const ensureMinimumProjects = (projects, minCount, defaultProjectsGenerator) => {
  if (projects.length >= minCount) {
    return projects.slice(0, minCount)
  }

  const needed = minCount - projects.length
  const defaultProjects = defaultProjectsGenerator()
  const paddedDefaults = defaultProjects.slice(0, needed).map((p, idx) => ({
    ...p,
    id: 10000 + idx // High ID to avoid conflicts with backend projects
  }))

  return [...projects, ...paddedDefaults]
}

