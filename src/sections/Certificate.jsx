import React, { useState, useEffect } from 'react'
import { useData } from '../context/DataContext.jsx'

export default function Certificate() {
  const { certificates: certificatesData } = useData()
  const [viewedCertificate, setViewedCertificate] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  
  // Fallback to default certificates if API data is empty
  const defaultCertificates = [
    {
      id: 1,
      title: 'Full Stack Web Development with MERN Stack & GenAI',
      issuer: 'Udemy',
      date: '2024',
      description: 'Comprehensive certification covering MongoDB, Express.js, React.js, Node.js, and Generative AI integration for modern web applications.',
      icon: 'ri-stack-line',
      link: 'https://www.linkedin.com/posts/er-mnish-kumar-8227572b8_certificate-in-full-stackdevelopment-with-activity-7303204791814361089-3SkX',
      credentialId: 'UDEMY-2024-FSWD-MERN-GENAI'
    },
    {
      id: 2,
      title: 'Software Testing & Development Center Internship',
      issuer: 'QSpider\'s',
      date: '2024',
      description: 'Professional internship program focused on software testing methodologies, quality assurance, and development best practices.',
      icon: 'ri-test-tube-line',
      link: 'https://www.linkedin.com/posts/er-mnish-kumar-8227572b8_thrilled-to-have-completed-my-internship-activity-7235991639016505344-8BfX',
      credentialId: 'QSPIDERS-ST-2024-001'
    },
    {
      id: 3,
      title: 'Web Development Internship',
      issuer: 'Unified Mentor',
      date: '2024',
      description: 'Hands-on web development internship covering modern frontend and backend technologies with industry-standard practices.',
      icon: 'ri-global-line',
      link: 'https://www.linkedin.com/posts/er-mnish-kumar-8227572b8_web-development-certificate-activity-7309067857227669504-1_zy',
      credentialId: 'UM-WD-2024-INTERN'
    },
    {
      id: 4,
      title: 'Web Application with MERN Stack Internship',
      issuer: 'Edunet Foundation',
      date: '2024',
      description: 'Advanced MERN stack development internship focusing on building scalable web applications and RESTful APIs.',
      icon: 'ri-code-s-slash-line',
      link: 'https://www.linkedin.com/posts/er-mnish-kumar-8227572b8_web-development-internship-at-edunet-foundation-activity-7310973953810862081-rpGP',
      credentialId: 'EDUNET-MERN-2024-INT'
    },
    {
      id: 5,
      title: 'Web Development Internship',
      issuer: 'Eduskills Foundation',
      date: '2024',
      description: 'Comprehensive web development internship program covering modern frameworks, responsive design, and deployment strategies.',
      icon: 'ri-web-line',
      link: 'https://www.linkedin.com/posts/er-mnish-kumar-8227572b8_web-development-for-eduskill-foundation-activity-7340633699631128576-qdok',
      credentialId: 'EDUSKILLS-WD-2024-INT'
    },
    {
      id: 6,
      title: 'K.Y.P.',
      issuer: 'Bihar Skill Development Mission',
      date: '2024',
      description: 'Kushal Yuva Program certification demonstrating commitment to skill development and professional growth in technology.',
      icon: 'ri-medal-line',
      link: 'https://www.linkedin.com/posts/er-mnish-kumar-8227572b8_kushal-yuva-program-bihar-skill-development-activity-7184911765900578816-cMZO',
      credentialId: 'KYP-2024-BIHAR-SDM'
    }
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.slice(0, 6).map((certificate, index) => (
            <div
              key={certificate.id}
              className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden max-w-md mx-auto"
              style={{
                animationDelay: `${index * 0.15}s`,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                transform: 'perspective(1000px) rotateX(0deg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-8px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px) scale(1)';
              }}
            >
              {/* Certificate border design */}
              <div className="absolute inset-0 border-4 border-double border-indigo-200 dark:border-indigo-700 rounded-lg group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors duration-500"></div>
              <div className="absolute inset-2 border border-indigo-100 dark:border-indigo-800 rounded-md group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-colors duration-500"></div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

              {/* Certificate header ribbon */}
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 px-6 text-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <h3 className="relative text-lg font-bold uppercase tracking-wider drop-shadow-lg">
                  Certificate of Achievement
                </h3>
              </div>

              <div className="relative p-6 pt-4">
                {/* Certificate seal */}
                <div className="text-center mb-4">
                  <div className="relative inline-block group/seal">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 p-1.5 shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 border-3 border-white dark:border-slate-800 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-amber-500/30">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-600 dark:to-slate-500 flex items-center justify-center border-2 border-amber-200 dark:border-amber-600 relative group-hover:border-amber-300">
                        <i className={`${certificate.icon} text-2xl text-amber-800 dark:text-amber-200 drop-shadow-sm group-hover:scale-110 transition-transform duration-300`}></i>
                        {/* Inner pattern */}
                        <div className="absolute inset-0 rounded-full border border-amber-400 dark:border-amber-500 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                      </div>
                      {/* Gold shine effect */}
                      <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-white/60 rounded-full blur-sm group-hover:blur-none group-hover:bg-white/80 transition-all duration-300"></div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-white dark:border-slate-800 animate-pulse shadow-lg group-hover:animate-bounce group-hover:bg-red-500 transition-colors duration-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-slate-800 animate-pulse shadow-lg group-hover:animate-bounce group-hover:bg-blue-500 transition-colors duration-300" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2 h-2 bg-purple-600 rounded-full border border-white dark:border-slate-800 animate-pulse shadow-md group-hover:animate-bounce group-hover:bg-purple-500 transition-colors duration-300" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2 h-2 bg-green-600 rounded-full border border-white dark:border-slate-800 animate-pulse shadow-md group-hover:animate-bounce group-hover:bg-green-500 transition-colors duration-300" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>

                {/* Certificate content */}
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 dark:text-slate-300 uppercase tracking-widest font-bold">This is to certify that</p>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight px-2">
                      {certificate.title}
                    </h4>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full shadow-sm"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Awarded By</p>
                      <div className="w-full h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{certificate.issuer}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Date Awarded</p>
                      <div className="w-full h-px bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{certificate.date}</p>
                    </div>
                  </div>

                  {/* Credential ID - More prominent */}
                  {certificate.credentialId && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-indigo-200 dark:border-indigo-700 shadow-inner">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                          <i className="ri-verified-badge-line text-white text-xs"></i>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Credential ID</p>
                          <p className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600">{certificate.credentialId}</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleView(certificate)}
                    disabled={certificate.link === '#'}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 text-white rounded-lg font-bold hover:from-slate-900 hover:via-slate-800 hover:to-slate-900 dark:hover:from-slate-600 dark:hover:via-slate-500 dark:hover:to-slate-600 disabled:from-slate-400 disabled:via-slate-500 disabled:to-slate-400 disabled:text-slate-300 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/30 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wider text-xs border border-slate-700 dark:border-slate-600 hover:border-slate-600 dark:hover:border-slate-500"
                  >
                    <i className="ri-eye-line text-sm group-hover:animate-pulse"></i>
                    View Certificate
                  </button>
                  {certificate.link && certificate.link !== '#' && (
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-amber-500/40 flex items-center justify-center border border-amber-400 hover:border-amber-300 hover:rotate-12"
                    >
                      <i className="ri-external-link-line text-base font-bold group-hover:animate-bounce"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Certificate corner decorations */}
              <div className="absolute top-4 left-4 w-3 h-3 border-l-4 border-t-4 border-indigo-500 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-3 h-3 border-r-4 border-t-4 border-indigo-500 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 border-l-4 border-b-4 border-indigo-500 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 border-r-4 border-b-4 border-indigo-500 rounded-br-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

