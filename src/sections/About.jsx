import React from 'react'
import { useData } from '../context/DataContext.jsx'
import meImage from '../assets/me.png'
import teamImage from '../assets/1721539351121.jpg'

export default function About() {
  const { about } = useData()
  
  const aboutData = about || {
    sub_heading: '',
    introduction: '',
    resume: '',
    resume_filename: ''
  }

  const handleDownloadCV = async (e) => {
    e.preventDefault()
    
    // If resume is available, download resume instead
    if (aboutData.resume) {
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
        alert('Failed to download resume. Please try again later.')
      }
      return
    }
    
    // Otherwise download CV
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
      // Fallback: Open CV page - user can save manually
      window.open(cvUrl, '_blank')
      alert('Automatic download failed. CV opened in new tab. Please use Ctrl+S to save or Ctrl+P to print as PDF.')
    }
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="glow-brackets-hero">&lt; </span>
            About Me
            <span className="glow-brackets-hero">  /&gt;</span>
          </h2>
          <h3 className="text-sm md:text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-justify">
            To obtain a position that allows me to leverage my strong organizational skills, educational background, and ability to collaborate effectively with others to contribute to the success of the team and organization.
          </h3>
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
                className={aboutData.resume 
                  ? "btn border border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  : "btn border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                }
              >
                <i className="ri-download-line"></i>
                Download CV
              </button>
            </div>
          </div>
          <div>
            {aboutData.introduction ? (
              <p className="text-black dark:text-gray-100 text-justify whitespace-pre-line">
                {aboutData.introduction}
              </p>
            ) : (
              <div className="text-black dark:text-gray-100 text-justify">
                <p className="mb-4">
                  My name is Manish Kumar. I belong to Ara, Bihar, which is a big town. But currently, I am living in Delhi NCR.
                </p>
                <p className="mb-4">
                  I have completed my graduation in BCA from Meerut Institute of Technology. I completed my 12th from H.D. Jain College and my 10th from STSV International School.
                </p>
                <p className="mb-4">
                  I have also completed my internships with Mindware technology, Qspider, udemy, Edunet Foundation and Unified Mentor etc. My short-term goal is to learn new skills by working with your organization. My long-term goal is to become a successful person and make my parents proud.
                </p>
                <p className="mb-4">
                  My strength is my honesty and my weakness is too punctual. My hobby is playing Ludo. Thank you — that's all about me.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

