import React from 'react'
import { useData } from '../context/DataContext.jsx'

export default function Team() {
  const { team: teamMembers, loading } = useData()

  // Sample data for demonstration if no team members
  const sampleMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Frontend Developer',
      bio: 'Passionate about creating beautiful and functional user interfaces.',
      email: 'john@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Backend Developer',
      bio: 'Expert in building scalable server-side applications and APIs.',
      email: 'jane@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Full Stack Developer',
      bio: 'Specialized in end-to-end web development with modern technologies.',
      email: 'mike@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'UI/UX Designer',
      bio: 'Creating intuitive and visually appealing user experiences.',
      email: 'sarah@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 5,
      name: 'David Brown',
      role: 'DevOps Engineer',
      bio: 'Expert in cloud infrastructure and deployment automation.',
      email: 'david@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 6,
      name: 'Emily Davis',
      role: 'Mobile Developer',
      bio: 'Building cross-platform mobile applications with React Native.',
      email: 'emily@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 7,
      name: 'Chris Wilson',
      role: 'Data Scientist',
      bio: 'Transforming data into actionable insights and predictions.',
      email: 'chris@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      role: 'Product Manager',
      bio: 'Leading product strategy and development from concept to launch.',
      email: 'lisa@example.com',
      linkedin: 'https://linkedin.com'
    }
  ]

  // Use actual data if available, otherwise show sample data
  const displayMembers = teamMembers.length > 0 ? teamMembers : sampleMembers

  // Team Card Component
  const TeamCard = ({ member }) => (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 transform hover:-translate-y-2">
      {/* Circular Image */}
      <div className="relative mb-4 flex justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-100 dark:ring-indigo-900 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 group-hover:ring-indigo-500 dark:group-hover:ring-indigo-500 transition-all duration-300 shadow-lg">
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
      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3 uppercase tracking-wide">
        {member.role}
      </p>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs leading-relaxed min-h-[50px]">
        {member.bio || 'No description available.'}
      </p>

      {/* Two Buttons */}
      <div className="flex gap-2 justify-center">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
          >
            <i className="ri-mail-line text-sm"></i>
            <span className="text-xs">Email</span>
          </a>
        )}
        <a
          href={member.linkedin || member.social || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
        >
          <i className="ri-linkedin-fill text-sm"></i>
          <span className="text-xs">Connect</span>
        </a>
      </div>
    </div>
  )

  return (
    <section id="team" className="py-20 bg-white dark:bg-gray-950 overflow-x-hidden w-full">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20 w-full overflow-x-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Team</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. 
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading team members...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

