import React, { useMemo } from 'react'
import { useData } from '../context/DataContext.jsx'

export default function Team() {
  const { team: teamMembers, loading } = useData()
  const teamBackgroundImage = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2200&q=80'

  // Default team members
  const sampleMembers = [
    {
      id: 1,
      name: 'Tanya Raj',
      role: 'Frontend Developer',
      bio: 'Frontend developer focused on responsive, clean, and user-friendly interfaces.',
      linkedin: 'https://linkedin.com/in/tanya-raj-595986258'
    },
    {
      id: 2,
      name: 'Anshuman Mishra',
      role: 'Full Stack Developer',
      bio: 'Builds scalable full stack solutions across frontend and backend systems.',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Parkash Singh',
      role: 'Full Stack Developer',
      bio: 'Develops reliable full stack applications with practical implementation focus.',
      linkedin: '#'
    },
    {
      id: 4,
      name: 'Himanshu Tiwari',
      role: 'Full Stack Developer',
      bio: 'Full stack engineer delivering production-ready web applications.',
      portfolio: 'https://www.himanshutiwari.in/',
      linkedin: 'https://www.linkedin.com/in/himanshu1662'
    },
    {
      id: 5,
      name: 'Om Prakash',
      role: 'PHP Full Stack Developer',
      bio: 'Specializes in PHP-based full stack development and web application delivery.',
      linkedin: '#'
    },
    {
      id: 6,
      name: 'Mantu Kumar',
      role: 'Frontend Developer',
      bio: 'Frontend developer with focus on modern UI implementation and smooth UX.',
      linkedin: 'https://www.linkedin.com/in/mantu-kumar-singh-8874a4387?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    {
      id: 7,
      name: 'Avinash Kumar',
      role: 'MERN Stack Developer',
      bio: 'Works on MongoDB, Express, React, and Node.js based scalable applications.',
      linkedin: '#'
    },
    {
      id: 8,
      name: 'Pritam Kumar',
      role: 'MERN Stack Developer',
      bio: 'Builds full stack MERN solutions with performance-focused architecture.',
      linkedin: '#'
    }
  ]

  // Merge backend and default members, avoid duplicate names
  const displayMembers = useMemo(() => {
    const merged = new Map()
    ;[...(Array.isArray(teamMembers) ? teamMembers : []), ...sampleMembers].forEach((member, index) => {
      const key = (member?.name || `member-${index}`).toLowerCase().trim()
      if (!merged.has(key)) {
        merged.set(key, member)
      }
    })
    return Array.from(merged.values())
  }, [teamMembers])
  const marqueeMembers = [...displayMembers, ...displayMembers]

  // Team Card Component
  const TeamCard = ({ member }) => (
    <div className="group inline-flex w-[240px] bg-white/12 dark:bg-gray-900/18 rounded-2xl p-6 text-center shadow-none hover:shadow-none transition-all duration-300 border border-white/20 dark:border-gray-700/35 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transform hover:-translate-y-0.5 flex-col h-[320px] backdrop-blur-xl">
      {/* Circular Image */}
      <div className="relative mb-4 flex justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-200/80 dark:ring-indigo-800/80 ring-offset-0 group-hover:ring-indigo-500/80 dark:group-hover:ring-indigo-500/80 transition-all duration-300 shadow-none">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div 
            className={`w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ${member.image ? 'hidden' : 'flex'}`}
          >
            <span className="text-3xl font-bold text-white">
              {member.name?.charAt(0).toUpperCase() || 'T'}
            </span>
          </div>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-4 uppercase tracking-wide min-h-[2.5rem] flex items-center justify-center">
        {member.role}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 w-full mt-auto">
        <a
          href={member.portfolio || member.website || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-full px-3 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-lg font-medium transition-all duration-300 shadow-none hover:shadow-none flex items-center justify-center gap-2 text-xs leading-none"
        >
          <i className="ri-briefcase-line text-sm"></i>
          <span>Portfolio</span>
        </a>
        <a
          href={member.linkedin || member.social || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-full px-3 bg-transparent hover:bg-white/10 dark:hover:bg-gray-800/40 text-gray-900 dark:text-white rounded-lg font-medium transition-all duration-300 border border-indigo-300/70 dark:border-indigo-700/70 shadow-none hover:shadow-none flex items-center justify-center gap-2 text-xs leading-none"
        >
          <i className="ri-linkedin-fill text-sm"></i>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  )

  return (
    <section
      id="team"
      className="py-20 overflow-x-hidden w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url('${teamBackgroundImage}')`
      }}
    >
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20 w-full overflow-x-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <i className="ri-team-line text-3xl md:text-4xl text-indigo-600 dark:text-indigo-400"></i>
            <span>Team</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A creative team of developers, designers, and problem-solvers building fast, modern, and user-focused digital experiences.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading team members...</p>
          </div>
        ) : null}
      </div>
      {!loading && (
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="animate-marquee inline-flex w-max items-stretch whitespace-nowrap gap-4 py-2">
            {marqueeMembers.map((member, index) => (
              <TeamCard key={`mq-${member.id}-${index}`} member={member} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
