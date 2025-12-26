import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [team, setTeam] = useState([])
  const [about, setAbout] = useState({
    sub_heading: '',
    introduction: '',
    resume: '',
    resume_filename: ''
  })
  const [services, setServices] = useState([])
  const [certificates, setCertificates] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      // Fetch all available data in parallel
      const [skillsRes, projectsRes, teamRes, aboutRes] = await Promise.allSettled([
        fetch('http://localhost:5000/api/skills').catch(() => ({ ok: false })),
        fetch('http://localhost:5000/api/projects').catch(() => ({ ok: false })),
        fetch('http://localhost:5000/api/team').catch(() => ({ ok: false })),
        fetch('http://localhost:5000/api/about').catch(() => ({ ok: false }))
      ])

      // Handle skills
      if (skillsRes.status === 'fulfilled' && skillsRes.value.ok) {
        try {
          const skillsData = await skillsRes.value.json()
          setSkills(Array.isArray(skillsData) ? skillsData : [])
        } catch (error) {
          setSkills([])
        }
      } else {
        setSkills([])
      }

      // Handle projects
      if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
        try {
          const projectsData = await projectsRes.value.json()
          // Parse tech array from JSON string if needed
          const processedProjects = Array.isArray(projectsData) ? projectsData.map(project => {
            try {
              return {
                ...project,
                tech: project.tech ? (typeof project.tech === 'string' ? JSON.parse(project.tech) : project.tech) : []
              }
            } catch (e) {
              return {
                ...project,
                tech: []
              }
            }
          }) : []
          setProjects(processedProjects)
        } catch (error) {
          setProjects([])
        }
      } else {
        setProjects([])
      }

      // Handle team
      if (teamRes.status === 'fulfilled' && teamRes.value.ok) {
        try {
          const teamData = await teamRes.value.json()
          setTeam(Array.isArray(teamData) ? teamData : [])
        } catch (error) {
          setTeam([])
        }
      } else {
        setTeam([])
      }

      // Handle about
      if (aboutRes.status === 'fulfilled' && aboutRes.value.ok) {
        try {
          const aboutData = await aboutRes.value.json()
          setAbout(aboutData || {
            sub_heading: '',
            introduction: '',
            resume: '',
            resume_filename: ''
          })
        } catch (error) {
          setAbout({
            sub_heading: '',
            introduction: '',
            resume: '',
            resume_filename: ''
          })
        }
      } else {
        setAbout({
          sub_heading: '',
          introduction: '',
          resume: '',
          resume_filename: ''
        })
      }

      // Services, certificates, and testimonials are not yet implemented in the backend
      // Return empty arrays - components will use fallback defaults
      setServices([])
      setCertificates([])
      setTestimonials([])
    } catch (error) {
      // Set all to empty arrays on error
      setSkills([])
      setProjects([])
      setTeam([])
      setAbout({
        sub_heading: '',
        introduction: '',
        resume: '',
        resume_filename: ''
      })
      setServices([])
      setCertificates([])
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  const refreshData = () => {
    setLoading(true)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const value = {
    skills,
    projects,
    team,
    about,
    services,
    certificates,
    testimonials,
    loading,
    refreshData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

