import React, { useState, useEffect } from 'react'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('home')
  const [skills, setSkills] = useState([])
  const [team, setTeam] = useState([])
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [certificates, setCertificates] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarData, setSidebarData] = useState(null)

  // Form states
  const [skillForm, setSkillForm] = useState({ name: '', level: '' })
  const [teamForm, setTeamForm] = useState({ name: '', role: '', bio: '', email: '' })
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tech: '', image: '', link: '' })
  const [homeForm, setHomeForm] = useState({ title: '', subtitle: '', image: '', mediaType: '' })
  const [banners, setBanners] = useState([])
  const [aboutForm, setAboutForm] = useState({ subHeading: '', introduction: '', resume: '', resumeFilename: '' })
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: '' })
  const [certificateForm, setCertificateForm] = useState({ title: '', issuer: '', date: '', description: '', icon: '' })
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', content: '', fullQuote: '' })
  const [sidebarForm, setSidebarForm] = useState({ 
    profile_image: '', 
    name: '', 
    email: '', 
    phone: '', 
    social_links: [], 
    navigation_items: [] 
  })
  const [imageUploadMode, setImageUploadMode] = useState('url') // 'url' or 'upload'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [skillsRes, teamRes, projectsRes, sidebarRes, homeBannerRes, aboutRes] = await Promise.allSettled([
        fetch('http://localhost:5000/api/skills'),
        fetch('http://localhost:5000/api/team'),
        fetch('http://localhost:5000/api/projects'),
        fetch('http://localhost:5000/api/sidebar').catch(() => ({ ok: false, json: async () => ({}) })),
        fetch('http://localhost:5000/api/home-banner/latest'),
        fetch('http://localhost:5000/api/about').catch(() => ({ ok: false, json: async () => ({}) }))
      ])
      
      // Handle skills
      if (skillsRes.status === 'fulfilled' && skillsRes.value.ok) {
        const skillsData = await skillsRes.value.json()
        setSkills(skillsData)
      } else {
        console.warn('Failed to fetch skills')
      }
      
      // Handle team
      if (teamRes.status === 'fulfilled' && teamRes.value.ok) {
        const teamData = await teamRes.value.json()
        setTeam(teamData)
      } else {
        console.warn('Failed to fetch team')
      }
      
      // Handle projects
      if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
        const projectsData = await projectsRes.value.json()
        setProjects(projectsData)
      } else {
        console.warn('Failed to fetch projects')
      }
      
      // Handle sidebar
      if (sidebarRes.status === 'fulfilled' && sidebarRes.value.ok) {
        const sidebarData = await sidebarRes.value.json()
        setSidebarData(sidebarData)
        setSidebarForm({
          profile_image: sidebarData.profile_image || '',
          name: sidebarData.name || '',
          email: sidebarData.email || '',
          phone: sidebarData.phone || '',
          social_links: sidebarData.social_links || [],
          navigation_items: sidebarData.navigation_items || []
        })
      } else {
        console.warn('Failed to fetch sidebar (this is optional)')
      }
      
      // Handle home banner
      if (homeBannerRes.status === 'fulfilled' && homeBannerRes.value.ok) {
        const homeBannerData = await homeBannerRes.value.json()
        setHomeForm({
          title: homeBannerData.title || '',
          subtitle: homeBannerData.subtitle || '',
          image: homeBannerData.media || '',
          mediaType: homeBannerData.media_type || 'image'
        })
      } else {
        // Silently handle - table might not exist yet, will be auto-created
        if (homeBannerRes.status === 'fulfilled') {
          const errorData = await homeBannerRes.value.json().catch(() => ({}))
          if (!errorData.error || !errorData.error.includes('table not found')) {
            console.warn('Failed to fetch home banner:', errorData)
          }
        }
      }
      
      // Handle about data
      if (aboutRes.status === 'fulfilled' && aboutRes.value.ok) {
        const aboutData = await aboutRes.value.json()
        setAboutForm({
          subHeading: aboutData.sub_heading || '',
          introduction: aboutData.introduction || '',
          resume: aboutData.resume || '',
          resumeFilename: aboutData.resume_filename || ''
        })
      } else {
        console.warn('Failed to fetch about data (this is optional)')
      }
      
      // Fetch all banners for list
      try {
        const bannersRes = await fetch('http://localhost:5000/api/home-banner')
        if (bannersRes.ok) {
          const bannersData = await bannersRes.json()
          setBanners(Array.isArray(bannersData) ? bannersData : [])
        } else {
          // If 500 error, check if it's table not found - will be auto-created
          const errorData = await bannersRes.json().catch(() => ({}))
          if (errorData.error && errorData.error.includes('table not found')) {
            console.info('home_banner table will be auto-created on next server restart')
            setBanners([])
          }
        }
      } catch (error) {
        console.error('Error fetching banners list:', error)
        setBanners([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error connecting to server. Make sure backend server is running on port 5000')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: skillForm.name, level: parseInt(skillForm.level) })
      })
      if (response.ok) {
        setSkillForm({ name: '', level: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding skill:', error)
    }
  }

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return
    try {
      await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const handleAddTeam = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamForm)
      })
      if (response.ok) {
        setTeamForm({ name: '', role: '', bio: '', email: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding team member:', error)
    }
  }

  const handleDeleteTeam = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return
    try {
      await fetch(`http://localhost:5000/api/team/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (error) {
      console.error('Error deleting team member:', error)
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    try {
      const techArray = projectForm.tech.split(',').map(t => t.trim()).filter(t => t)
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...projectForm, tech: techArray })
      })
      if (response.ok) {
        setProjectForm({ title: '', description: '', tech: '', image: '', link: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const tabs = [
    { id: 'home', label: 'Home Banner', icon: 'ri-home-line' },
    { id: 'about', label: 'About', icon: 'ri-user-line' },
    { id: 'sidebar', label: 'Sidebar', icon: 'ri-side-bar-line' },
    { id: 'skills', label: 'Skills', icon: 'ri-code-s-slash-line' },
    { id: 'projects', label: 'Projects', icon: 'ri-folder-line' },
    { id: 'team', label: 'Team', icon: 'ri-team-line' },
    { id: 'services', label: 'Services', icon: 'ri-service-line' },
    { id: 'certificates', label: 'Certificates', icon: 'ri-award-line' },
    { id: 'testimonials', label: 'Testimonials', icon: 'ri-chat-quote-line' },
  ]

  const stats = [
    { label: 'Skills', value: skills.length, icon: 'ri-code-s-slash-line', color: 'bg-blue-500' },
    { label: 'Projects', value: projects.length, icon: 'ri-folder-line', color: 'bg-purple-500' },
    { label: 'Team Members', value: team.length, icon: 'ri-team-line', color: 'bg-green-500' },
    { label: 'Services', value: services.length, icon: 'ri-service-line', color: 'bg-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <i className={`${sidebarOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <i className="ri-dashboard-3-line text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Portfolio Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Connected</span>
              </div>
              <a
                href="/"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                <i className="ri-external-link-line"></i>
                <span className="hidden sm:inline">View Site</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="h-full flex flex-col pt-4 pb-6 overflow-y-auto">
            <div className="px-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <i className="ri-admin-line text-white text-2xl"></i>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">Dashboard</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Control Center</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <i className="ri-arrow-right-s-line ml-auto"></i>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center shadow-lg`}>
                    <i className={`${stat.icon} text-white text-2xl`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading data...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Home Banner Tab */}
                {activeTab === 'home' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-home-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Home Banner</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your homepage banner content</p>
                      </div>
                    </div>
                    <form onSubmit={async (e) => {
                      e.preventDefault()
                      
                      // Validate image
                      if (!homeForm.image || homeForm.image.trim() === '') {
                        alert('Please upload an image or video first!')
                        return
                      }
                      
                      try {
                        const response = await fetch('http://localhost:5000/api/home-banner', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            title: homeForm.title || '',
                            subtitle: homeForm.subtitle || '',
                            media: homeForm.image,
                            media_type: homeForm.mediaType || 'image'
                          })
                        })
                        
                        let responseData
                        try {
                          responseData = await response.json()
                        } catch (jsonError) {
                          console.error('Failed to parse response:', jsonError)
                          alert(`Failed to add banner:\n\nServer returned invalid response. Check backend server logs.\n\nStatus: ${response.status}`)
                          return
                        }
                        
                        if (response.ok) {
                          alert('✅ Home banner added successfully!')
                          setHomeForm({ title: '', subtitle: '', image: '', mediaType: '' })
                          // Reset file input
                          const fileInput = document.getElementById('banner-image-upload')
                          if (fileInput) fileInput.value = ''
                          fetchData()
                        } else {
                          let errorMsg = 'Server error. Please check backend server.'
                          
                          // Get error message from response
                          if (responseData) {
                            if (responseData.error) {
                              errorMsg = responseData.error
                              if (responseData.error.includes('table not found') || responseData.error.includes('ER_NO_SUCH_TABLE')) {
                                errorMsg = '❌ Database table not found!\n\nPlease restart the backend server - it will auto-create the table.\n\nSteps:\n1. Stop backend server (Ctrl+C)\n2. Start again: cd backend && npm start'
                              } else if (responseData.error.includes('too large') || responseData.error.includes('DATA_TOO_LONG')) {
                                errorMsg = responseData.error + '\n\n💡 Tip: Use URL option for large images instead of file upload.'
                              }
                            } else if (responseData.details) {
                              errorMsg = responseData.details
                            }
                          }
                          
                          // Show detailed error
                          console.error('❌ Banner upload error:', {
                            status: response.status,
                            statusText: response.statusText,
                            error: responseData
                          })
                          
                          alert(`❌ Failed to add banner:\n\n${errorMsg}\n\nStatus: ${response.status}\n\nCheck browser console (F12) for details.`)
                        }
                      } catch (error) {
                        console.error('Error adding home banner:', error)
                        alert(`Failed to add banner: ${error.message || 'Network error. Make sure backend server is running on port 5000'}`)
                      }
                    }} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                          <input
                            type="text"
                            value={homeForm.title}
                            onChange={(e) => setHomeForm({ ...homeForm, title: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            placeholder="Enter banner title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
                          <input
                            type="text"
                            value={homeForm.subtitle}
                            onChange={(e) => setHomeForm({ ...homeForm, subtitle: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            placeholder="Enter subtitle"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Banner Image/Video</label>
                        <div className="space-y-3">
                          {/* URL Input Option */}
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Or enter image/video URL:</label>
                            <input
                              type="url"
                              value={homeForm.image && homeForm.image.startsWith('http') ? homeForm.image : ''}
                              onChange={(e) => {
                                const url = e.target.value.trim()
                                if (url) {
                                  // Detect media type from URL
                                  const isVideo = /\.(mp4|webm|ogg)$/i.test(url)
                                  setHomeForm({ 
                                    ...homeForm, 
                                    image: url,
                                    mediaType: isVideo ? 'video' : 'image'
                                  })
                                } else {
                                  setHomeForm({ ...homeForm, image: '', mediaType: '' })
                                }
                              }}
                              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white text-sm"
                              placeholder="https://example.com/image.jpg"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use URL for large images (recommended for files &gt; 5MB)</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                          </div>
                          
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                  // Check file size (max 50MB for videos, 8MB for images - base64 makes it ~33% larger)
                                  // So 8MB image becomes ~10.6MB base64, which is safe for database
                                  const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 8 * 1024 * 1024
                                  if (file.size > maxSize) {
                                    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)
                                    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0)
                                    alert(file.type.startsWith('video/') 
                                      ? `Video size (${fileSizeMB}MB) is too large! Maximum is ${maxSizeMB}MB. Please use URL option.` 
                                      : `Image size (${fileSizeMB}MB) is too large! Maximum is ${maxSizeMB}MB. Please use URL option for large images.`)
                                    e.target.value = '' // Reset input
                                    return
                                  }
                                  
                                  // Validate file type
                                  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
                                  const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg']
                                  
                                  if (!file.type.startsWith('video/') && !validImageTypes.includes(file.type)) {
                                    alert('Invalid file type! Please upload JPG, PNG, GIF, WebP images or MP4, WebM videos.')
                                    e.target.value = '' // Reset input
                                    return
                                  }
                                  
                                  // Convert to base64
                                  const reader = new FileReader()
                                  
                                  reader.onerror = () => {
                                    alert('Error reading file. Please try again with a different image.')
                                    e.target.value = '' // Reset input
                                  }
                                  
                                  reader.onloadend = () => {
                                    try {
                                      const mediaType = file.type.startsWith('video/') ? 'video' : 
                                                       file.type.includes('gif') ? 'gif' : 'image'
                                      
                                      // Validate base64 result
                                      if (!reader.result || reader.result.length === 0) {
                                        alert('Error converting file. Please try again.')
                                        e.target.value = '' // Reset input
                                        return
                                      }
                                      
                                      setHomeForm({ 
                                        ...homeForm, 
                                        image: reader.result,
                                        mediaType: mediaType
                                      })
                                    } catch (error) {
                                      console.error('Error processing file:', error)
                                      alert('Error processing file. Please try again.')
                                      e.target.value = '' // Reset input
                                    }
                                  }
                                  
                                  reader.readAsDataURL(file)
                                } else {
                                  // Reset form if no file selected
                                  setHomeForm({ ...homeForm, image: '', mediaType: '' })
                                }
                              }}
                              className="hidden"
                              id="banner-image-upload"
                            />
                            <label
                              htmlFor="banner-image-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <i className="ri-upload-cloud-2-line text-3xl text-gray-400 dark:text-gray-500 mb-2"></i>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Images: PNG, JPG, GIF, WebP (MAX. 8MB) | Videos: MP4, WebM (MAX. 50MB)</p>
                                <p className="text-xs text-red-500 dark:text-red-400 mt-1">⚠️ For images larger than 8MB, use URL option above</p>
                              </div>
                            </label>
                          </div>
                          {/* Preview */}
                          {homeForm.image && (
                            <div className="flex items-center gap-3">
                              {homeForm.mediaType === 'video' ? (
                                <video 
                                  src={homeForm.image} 
                                  className="w-32 h-20 rounded-lg object-cover border-2 border-indigo-500 shadow-md"
                                  controls
                                  muted
                                />
                              ) : (
                                <img 
                                  src={homeForm.image} 
                                  alt="Banner preview" 
                                  className="w-32 h-20 rounded-lg object-cover border-2 border-indigo-500 shadow-md" 
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                  }}
                                />
                              )}
                              <button
                                type="button"
                                onClick={() => setHomeForm({ ...homeForm, image: '', mediaType: '' })}
                                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors flex items-center gap-1"
                              >
                                <i className="ri-delete-bin-line"></i>
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <i className="ri-save-line"></i>
                        Add Banner
                      </button>
                    </form>
                    
                    {/* Banners List */}
                    <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i className="ri-image-line text-indigo-500"></i>
                        Active Banners ({banners.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {banners.length === 0 ? (
                          <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                            <i className="ri-inbox-line text-4xl mb-2"></i>
                            <p>No banners added yet</p>
                          </div>
                        ) : (
                          banners.map((banner) => (
                            <div
                              key={banner.id}
                              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-md transition-shadow"
                            >
                              {banner.media_type === 'video' ? (
                                <video
                                  src={banner.media}
                                  className="w-full h-32 object-cover"
                                  muted
                                  loop
                                />
                              ) : (
                                <img
                                  src={banner.media}
                                  alt={banner.title || 'Banner'}
                                  className="w-full h-32 object-cover"
                                  onError={(e) => {
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3C/svg%3E'
                                  }}
                                />
                              )}
                              <div className="p-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                                  {banner.title || 'Untitled Banner'}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-2">
                                  {banner.subtitle || 'No subtitle'}
                                </p>
                                <button
                                  onClick={async () => {
                                    if (!window.confirm('Are you sure you want to delete this banner?')) return
                                    try {
                                      const response = await fetch(`http://localhost:5000/api/home-banner/${banner.id}`, {
                                        method: 'DELETE'
                                      })
                                      if (response.ok) {
                                        alert('Banner deleted successfully!')
                                        fetchData()
                                      } else {
                                        alert('Failed to delete banner')
                                      }
                                    } catch (error) {
                                      console.error('Error deleting banner:', error)
                                      alert('Failed to delete banner')
                                    }
                                  }}
                                  className="w-full px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                >
                                  <i className="ri-delete-bin-line"></i>
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sidebar Tab */}
                {activeTab === 'sidebar' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-side-bar-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sidebar Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage sidebar profile and navigation</p>
                      </div>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault()
                      try {
                        const response = await fetch('http://localhost:5000/api/sidebar', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(sidebarForm)
                        })
                        if (response.ok) {
                          alert('Sidebar updated successfully!')
                          fetchData()
                        }
                      } catch (error) {
                        console.error('Error updating sidebar:', error)
                        alert('Failed to update sidebar')
                      }
                    }} className="space-y-6">
                      {/* Profile Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-user-line text-indigo-500"></i>
                          Profile Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Profile Image</label>
                            
                            {/* Toggle between Upload and URL */}
                            <div className="flex gap-2 mb-3">
                              <button
                                type="button"
                                onClick={() => setImageUploadMode('upload')}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                  imageUploadMode === 'upload'
                                    ? 'bg-indigo-500 text-white shadow-md'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                              >
                                <i className="ri-upload-cloud-line mr-1"></i>
                                Upload
                              </button>
                              <button
                                type="button"
                                onClick={() => setImageUploadMode('url')}
                                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                  imageUploadMode === 'url'
                                    ? 'bg-indigo-500 text-white shadow-md'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                              >
                                <i className="ri-link mr-1"></i>
                                URL
                              </button>
                            </div>

                            {/* Upload Section */}
                            {imageUploadMode === 'upload' && (
                              <div className="space-y-3">
                                <div className="relative">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files[0]
                                      if (file) {
                                        // Check file size (max 5MB)
                                        if (file.size > 5 * 1024 * 1024) {
                                          alert('Image size should be less than 5MB')
                                          return
                                        }
                                        // Convert to base64
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                          setSidebarForm({ ...sidebarForm, profile_image: reader.result })
                                        }
                                        reader.readAsDataURL(file)
                                      }
                                    }}
                                    className="hidden"
                                    id="profile-image-upload"
                                  />
                                  <label
                                    htmlFor="profile-image-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <i className="ri-upload-cloud-2-line text-3xl text-gray-400 dark:text-gray-500 mb-2"></i>
                                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            )}

                            {/* URL Input Section */}
                            {imageUploadMode === 'url' && (
                              <input
                                type="text"
                                value={sidebarForm.profile_image}
                                onChange={(e) => setSidebarForm({ ...sidebarForm, profile_image: e.target.value })}
                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Enter image URL or path"
                              />
                            )}

                            {/* Preview */}
                            {sidebarForm.profile_image && (
                              <div className="mt-3 flex items-center gap-3">
                                <img 
                                  src={sidebarForm.profile_image} 
                                  alt="Preview" 
                                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-md" 
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setSidebarForm({ ...sidebarForm, profile_image: '' })}
                                  className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors flex items-center gap-1"
                                >
                                  <i className="ri-delete-bin-line"></i>
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input
                              type="text"
                              value={sidebarForm.name}
                              onChange={(e) => setSidebarForm({ ...sidebarForm, name: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input
                              type="email"
                              value={sidebarForm.email}
                              onChange={(e) => setSidebarForm({ ...sidebarForm, email: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                            <input
                              type="tel"
                              value={sidebarForm.phone}
                              onChange={(e) => setSidebarForm({ ...sidebarForm, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                              placeholder="Enter your phone"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Links Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="ri-links-line text-indigo-500"></i>
                            Social Links
                          </h3>
                          <button
                            type="button"
                            onClick={() => setSidebarForm({
                              ...sidebarForm,
                              social_links: [...sidebarForm.social_links, { href: '', icon: 'ri-link', label: '' }]
                            })}
                            className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition"
                          >
                            <i className="ri-add-line mr-1"></i>Add Link
                          </button>
                        </div>
                        <div className="space-y-3">
                          {sidebarForm.social_links.map((social, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="grid md:grid-cols-3 gap-3">
                                <input
                                  type="text"
                                  value={social.href}
                                  onChange={(e) => {
                                    const updated = [...sidebarForm.social_links]
                                    updated[idx].href = e.target.value
                                    setSidebarForm({ ...sidebarForm, social_links: updated })
                                  }}
                                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-sm"
                                  placeholder="URL"
                                />
                                <input
                                  type="text"
                                  value={social.icon}
                                  onChange={(e) => {
                                    const updated = [...sidebarForm.social_links]
                                    updated[idx].icon = e.target.value
                                    setSidebarForm({ ...sidebarForm, social_links: updated })
                                  }}
                                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-sm"
                                  placeholder="Icon (e.g., ri-linkedin-line)"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={social.label}
                                    onChange={(e) => {
                                      const updated = [...sidebarForm.social_links]
                                      updated[idx].label = e.target.value
                                      setSidebarForm({ ...sidebarForm, social_links: updated })
                                    }}
                                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-sm"
                                    placeholder="Label"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = sidebarForm.social_links.filter((_, i) => i !== idx)
                                      setSidebarForm({ ...sidebarForm, social_links: updated })
                                    }}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          {sidebarForm.social_links.length === 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No social links added yet</p>
                          )}
                        </div>
                      </div>

                      {/* Navigation Items Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="ri-menu-line text-indigo-500"></i>
                            Navigation Items
                          </h3>
                          <button
                            type="button"
                            onClick={() => setSidebarForm({
                              ...sidebarForm,
                              navigation_items: [...sidebarForm.navigation_items, { href: '', label: '', icon: '' }]
                            })}
                            className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition"
                          >
                            <i className="ri-add-line mr-1"></i>Add Item
                          </button>
                        </div>
                        <div className="space-y-3">
                          {sidebarForm.navigation_items.map((nav, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="grid md:grid-cols-3 gap-3">
                                <input
                                  type="text"
                                  value={nav.href}
                                  onChange={(e) => {
                                    const updated = [...sidebarForm.navigation_items]
                                    updated[idx].href = e.target.value
                                    setSidebarForm({ ...sidebarForm, navigation_items: updated })
                                  }}
                                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-sm"
                                  placeholder="Href (e.g., #home)"
                                />
                                <input
                                  type="text"
                                  value={nav.label}
                                  onChange={(e) => {
                                    const updated = [...sidebarForm.navigation_items]
                                    updated[idx].label = e.target.value
                                    setSidebarForm({ ...sidebarForm, navigation_items: updated })
                                  }}
                                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-sm"
                                  placeholder="Label (e.g., < home />)"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={nav.icon}
                                    onChange={(e) => {
                                      const updated = [...sidebarForm.navigation_items]
                                      updated[idx].icon = e.target.value
                                      setSidebarForm({ ...sidebarForm, navigation_items: updated })
                                    }}
                                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-sm"
                                    placeholder="Icon (e.g., ri-home-line)"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = sidebarForm.navigation_items.filter((_, i) => i !== idx)
                                      setSidebarForm({ ...sidebarForm, navigation_items: updated })
                                    }}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          {sidebarForm.navigation_items.length === 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No navigation items added yet</p>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <i className="ri-save-line"></i>
                        Save Sidebar Changes
                      </button>
                    </form>
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-user-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Section</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal information</p>
                      </div>
                    </div>
                    <form onSubmit={async (e) => {
                      e.preventDefault()
                      try {
                        setLoading(true)
                        const response = await fetch('http://localhost:5000/api/about', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            sub_heading: aboutForm.subHeading,
                            introduction: aboutForm.introduction,
                            resume: aboutForm.resume,
                            resume_filename: aboutForm.resumeFilename
                          })
                        })
                        if (response.ok) {
                          alert('About section updated successfully!')
                          fetchData()
                        } else {
                          const errorData = await response.json()
                          alert(`Failed to update: ${errorData.error || 'Unknown error'}`)
                        }
                      } catch (error) {
                        console.error('Error updating about:', error)
                        alert(`Failed to update about section: ${error.message || 'Network error. Make sure backend server is running on port 5000'}`)
                      } finally {
                        setLoading(false)
                      }
                    }} className="space-y-5">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sub Heading</label>
                        <input
                          type="text"
                          value={aboutForm.subHeading}
                          onChange={(e) => setAboutForm({ ...aboutForm, subHeading: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                          placeholder="Enter sub heading"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Introduction</label>
                        <textarea
                          value={aboutForm.introduction}
                          onChange={(e) => setAboutForm({ ...aboutForm, introduction: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                          rows="4"
                          placeholder="Enter introduction"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Resume File</label>
                        <div className="space-y-3">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                // Check file size (max 10MB)
                                const maxSize = 10 * 1024 * 1024
                                if (file.size > maxSize) {
                                  const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)
                                  alert(`Resume file size (${fileSizeMB}MB) is too large! Maximum is 10MB.`)
                                  e.target.value = ''
                                  return
                                }
                                
                                // Convert to base64
                                const reader = new FileReader()
                                reader.onerror = () => {
                                  alert('Error reading file. Please try again.')
                                  e.target.value = ''
                                }
                                reader.onloadend = () => {
                                  const base64String = reader.result
                                  setAboutForm({
                                    ...aboutForm,
                                    resume: base64String,
                                    resumeFilename: file.name
                                  })
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300"
                          />
                          {aboutForm.resumeFilename && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <i className="ri-file-line"></i>
                              <span>Current file: {aboutForm.resumeFilename}</span>
                              <button
                                type="button"
                                onClick={() => setAboutForm({ ...aboutForm, resume: '', resumeFilename: '' })}
                                className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <i className="ri-close-line"></i> Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="ri-save-line"></i>
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-code-s-slash-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage your skills</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-add-circle-line text-indigo-500"></i>
                          Add New Skill
                        </h3>
                        <form onSubmit={handleAddSkill} className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Skill Name</label>
                            <input
                              type="text"
                              placeholder="e.g., React, JavaScript"
                              value={skillForm.name}
                              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Proficiency Level (0-100)</label>
                            <input
                              type="number"
                              placeholder="e.g., 85"
                              min="0"
                              max="100"
                              value={skillForm.level}
                              onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <i className="ri-add-line"></i>
                            Add Skill
                          </button>
                        </form>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-database-2-line text-purple-500"></i>
                          Skills List ({skills.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {skills.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <i className="ri-inbox-line text-4xl mb-2"></i>
                              <p>No skills added yet</p>
                            </div>
                          ) : (
                            skills.map((skill) => (
                              <div
                                key={skill.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${skill.level}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    className="ml-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Delete skill"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-folder-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage your projects</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-add-circle-line text-indigo-500"></i>
                          Add New Project
                        </h3>
                        <form onSubmit={handleAddProject} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Project Title"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <textarea
                            placeholder="Description"
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            rows="3"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Technologies (comma separated)"
                            value={projectForm.tech}
                            onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="url"
                            placeholder="Project Link"
                            value={projectForm.link}
                            onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <i className="ri-add-line"></i>
                            Add Project
                          </button>
                        </form>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-database-2-line text-purple-500"></i>
                          Projects List ({projects.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {projects.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <i className="ri-inbox-line text-4xl mb-2"></i>
                              <p>No projects added yet</p>
                            </div>
                          ) : (
                            projects.map((project) => (
                              <div
                                key={project.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{project.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.tech?.map((tech, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-md"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                                    title="Delete project"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Tab */}
                {activeTab === 'team' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-team-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage team members</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-add-circle-line text-indigo-500"></i>
                          Add Team Member
                        </h3>
                        <form onSubmit={handleAddTeam} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Name"
                            value={teamForm.name}
                            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Role"
                            value={teamForm.role}
                            onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <textarea
                            placeholder="Bio"
                            value={teamForm.bio}
                            onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            rows="3"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={teamForm.email}
                            onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                          />
                          <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <i className="ri-add-line"></i>
                            Add Member
                          </button>
                        </form>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-database-2-line text-purple-500"></i>
                          Team Members ({team.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {team.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <i className="ri-inbox-line text-4xl mb-2"></i>
                              <p>No team members added yet</p>
                            </div>
                          ) : (
                            team.map((member) => (
                              <div
                                key={member.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{member.role}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{member.bio}</p>
                                    {member.email && (
                                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                        <i className="ri-mail-line mr-1"></i>
                                        {member.email}
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleDeleteTeam(member.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                                    title="Delete member"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-service-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage your services</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-add-circle-line text-indigo-500"></i>
                          Add Service
                        </h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Service added!') }} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Service Title"
                            value={serviceForm.title}
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <textarea
                            placeholder="Description"
                            value={serviceForm.description}
                            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            rows="3"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Icon (e.g., ri-palette-line)"
                            value={serviceForm.icon}
                            onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <i className="ri-add-line"></i>
                            Add Service
                          </button>
                        </form>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-database-2-line text-purple-500"></i>
                          Services List ({services.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {services.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <i className="ri-inbox-line text-4xl mb-2"></i>
                              <p>No services added yet</p>
                            </div>
                          ) : (
                            services.map((service, idx) => (
                              <div
                                key={idx}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{service.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
                                  </div>
                                  <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Certificates Tab */}
                {activeTab === 'certificates' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-award-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage your certificates</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-add-circle-line text-indigo-500"></i>
                          Add Certificate
                        </h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Certificate added!') }} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Certificate Title"
                            value={certificateForm.title}
                            onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Issuer"
                            value={certificateForm.issuer}
                            onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Date"
                            value={certificateForm.date}
                            onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <textarea
                            placeholder="Description"
                            value={certificateForm.description}
                            onChange={(e) => setCertificateForm({ ...certificateForm, description: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            rows="3"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Icon (e.g., ri-award-line)"
                            value={certificateForm.icon}
                            onChange={(e) => setCertificateForm({ ...certificateForm, icon: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <i className="ri-add-line"></i>
                            Add Certificate
                          </button>
                        </form>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-database-2-line text-purple-500"></i>
                          Certificates List ({certificates.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {certificates.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <i className="ri-inbox-line text-4xl mb-2"></i>
                              <p>No certificates added yet</p>
                            </div>
                          ) : (
                            certificates.map((cert, idx) => (
                              <div
                                key={idx}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{cert.title}</h4>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">{cert.issuer} - {cert.date}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
                                  </div>
                                  <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonials Tab */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="ri-chat-quote-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials Management</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add and manage testimonials</p>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-add-circle-line text-indigo-500"></i>
                          Add Testimonial
                        </h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Testimonial added!') }} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Name"
                            value={testimonialForm.name}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Role"
                            value={testimonialForm.role}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            required
                          />
                          <textarea
                            placeholder="Short Content"
                            value={testimonialForm.content}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            rows="2"
                            required
                          />
                          <textarea
                            placeholder="Full Quote"
                            value={testimonialForm.fullQuote}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, fullQuote: e.target.value })}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                            rows="3"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <i className="ri-add-line"></i>
                            Add Testimonial
                          </button>
                        </form>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <i className="ri-database-2-line text-purple-500"></i>
                          Testimonials List ({testimonials.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {testimonials.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <i className="ri-inbox-line text-4xl mb-2"></i>
                              <p>No testimonials added yet</p>
                            </div>
                          ) : (
                            testimonials.map((testimonial, idx) => (
                              <div
                                key={idx}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{testimonial.name}</h4>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{testimonial.role}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{testimonial.content}</p>
                                  </div>
                                  <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
