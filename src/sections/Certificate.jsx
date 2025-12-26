import React, { useState } from 'react'
import { useData } from '../context/DataContext.jsx'

export default function Certificate() {
  const { certificates: certificatesData } = useData()
  const [viewedCertificate, setViewedCertificate] = useState(null)
  
  // Fallback to default certificates if API data is empty
  const defaultCertificates = [
    {
      id: 1,
      title: 'Web Development Certification',
      issuer: 'Online Platform',
      date: '2023',
      description: 'Completed comprehensive web development course covering HTML, CSS, JavaScript, and modern frameworks.',
      icon: 'ri-code-s-slash-line',
      link: '#',
    },
    {
      id: 2,
      title: 'React.js Mastery',
      issuer: 'Tech Academy',
      date: '2023',
      description: 'Advanced React.js development including hooks, context API, and state management.',
      icon: 'ri-reactjs-line',
      link: '#',
    },
    {
      id: 3,
      title: 'Full Stack Development',
      issuer: 'Coding Bootcamp',
      date: '2024',
      description: 'Complete full-stack development certification covering frontend and backend technologies.',
      icon: 'ri-stack-line',
      link: '#',
    },
    {
      id: 4,
      title: 'UI/UX Design',
      issuer: 'Design Institute',
      date: '2023',
      description: 'User interface and user experience design principles and best practices.',
      icon: 'ri-palette-line',
      link: '#',
    },
    {
      id: 5,
      title: 'Node.js Backend',
      issuer: 'Tech University',
      date: '2024',
      description: 'Server-side JavaScript development with Node.js, Express, and database integration.',
      icon: 'ri-server-line',
      link: '#',
    },
    {
      id: 6,
      title: 'Cloud Computing',
      issuer: 'Cloud Academy',
      date: '2024',
      description: 'AWS and cloud infrastructure management, deployment, and optimization strategies.',
      icon: 'ri-cloud-line',
      link: '#',
    },
    {
      id: 7,
      title: 'Database Management',
      issuer: 'Data Institute',
      date: '2023',
      description: 'SQL, NoSQL databases, data modeling, and database administration expertise.',
      icon: 'ri-database-2-line',
      link: '#',
    },
    {
      id: 8,
      title: 'DevOps & CI/CD',
      issuer: 'DevOps School',
      date: '2024',
      description: 'Continuous integration, deployment pipelines, Docker, and Kubernetes orchestration.',
      icon: 'ri-terminal-box-line',
      link: '#',
    },
  ]
  
  // Ensure we have exactly 8 certificates
  const certificates = certificatesData && certificatesData.length > 0 
    ? certificatesData.slice(0, 8).concat(defaultCertificates.slice(certificatesData.length, 8))
    : defaultCertificates

  const handleView = (certificate) => {
    setViewedCertificate(certificate)
    if (certificate.link && certificate.link !== '#') {
      window.open(certificate.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="certificate" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Certificates</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. 
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.slice(0, 8).map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 flex flex-col"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <i className={`${certificate.icon} text-2xl text-indigo-600 dark:text-indigo-400`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {certificate.title}
                </h3>
                <div className="flex flex-col items-center gap-2 mb-3">
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {certificate.issuer}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {certificate.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {certificate.description}
                </p>
              </div>
              <button
                onClick={() => handleView(certificate)}
                className="mt-auto w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <i className="ri-eye-line"></i>
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

