import React, { useState, useEffect } from 'react'
import meImage from '../assets/me.png'
import teamImage from '../assets/1721539351121.jpg'

export default function About() {
  const [aboutData, setAboutData] = useState({
    sub_heading: '',
    introduction: '',
    resume: '',
    resume_filename: ''
  })

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/about')
        if (response.ok) {
          const data = await response.json()
          setAboutData({
            sub_heading: data.sub_heading || '',
            introduction: data.introduction || '',
            resume: data.resume || '',
            resume_filename: data.resume_filename || ''
          })
        }
      } catch (error) {
        console.error('Error fetching about data:', error)
      }
    }
    fetchAboutData()
  }, [])

  const handleDownloadCV = async (e) => {
    e.preventDefault()
    const cvUrl = 'https://mnish-cv.vercel.app/'
    
    try {
      // Try to download via backend endpoint
      const response = await fetch('http://localhost:5000/api/download-cv')
      
      if (response.ok) {
        // Get the blob data
        const blob = await response.blob()
        
        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'Manish_Kumar_CV.html'
        link.style.display = 'none'
        
        // Trigger download
        document.body.appendChild(link)
        link.click()
        
        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }, 200)
      } else {
        throw new Error('Backend response not OK')
      }
    } catch (error) {
      console.error('Download error:', error)
      // Fallback: Open CV page - user can save manually
      window.open(cvUrl, '_blank')
      alert('Automatic download failed. CV opened in new tab. Please use Ctrl+S to save or Ctrl+P to print as PDF.')
    }
  }

  const handleDownloadResume = async (e) => {
    e.preventDefault()
    if (!aboutData.resume) {
      alert('Resume not available')
      return
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/about/resume')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = aboutData.resume_filename || 'resume.pdf'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }, 200)
      } else {
        throw new Error('Failed to download resume')
      }
    } catch (error) {
      console.error('Error downloading resume:', error)
      alert('Failed to download resume. Please try again later.')
    }
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="glow-brackets-hero">&lt; </span>
            About Me
            <span className="glow-brackets-hero">  /&gt;</span>
          </h2>
          {aboutData.sub_heading && (
            <h3 className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              {aboutData.sub_heading}
            </h3>
          )}
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {aboutData.introduction || 'To obtain a position that allows me to leverage my strong organizational skills, educational background, and ability to collaborate effectively with others to contribute to the success of the team and organization..'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center" style={{ height: '400px' }}>
              <div className="coin">
                <div className="side heads">
                  <img 
                    src={meImage} 
                    alt="Manish Kumar" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="side tails">
                  <img 
                    src={teamImage} 
                    alt="Team" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a 
                href="https://mnish-cv.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="ri-eye-line"></i>
                View CV
              </a>
              <button 
                onClick={handleDownloadCV}
                className="btn border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              >
                <i className="ri-download-line"></i>
                Download CV
              </button>
              {aboutData.resume ? (
                <button 
                  onClick={handleDownloadResume}
                  className="btn border border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <i className="ri-file-list-3-line"></i>
                  Download Resume
                </button>
              ) : (
                <a 
                  href="#resume" 
                  className="btn border border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <i className="ri-file-list-3-line"></i>
                  Resume
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-justify">
              My name is Manish Kumar. I belong to Ara, Bihar, which is a big town. But currently, I am living in Delhi NCR.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-justify">
              I have completed my graduation in BCA from Meerut Institute of Technology. I completed my 12th from H.D. Jain College and my 10th from STSV International School. I have also completed my internships with Edunet Foundation and Unified Mentor. My short-term goal is to learn new skills by working with your organization. My long-term goal is to become a successful person and make my parents proud. My strength is my honesty, and my weakness is that I am sometimes too punctual. My hobby is playing Ludo. Thank you — that's all about me.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

