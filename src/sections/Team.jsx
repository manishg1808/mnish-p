import React, { useEffect, useState } from 'react'

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team')
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`)
        setTeamMembers([])
        return
      }
      const data = await response.json()
      // Ensure data is an array
      if (Array.isArray(data)) {
        setTeamMembers(data)
      } else if (data && typeof data === 'object') {
        // If it's an error object, set empty array
        setTeamMembers([])
      } else {
        setTeamMembers([])
      }
    } catch (error) {
      console.error('Error fetching team:', error)
      // Fallback to empty array if backend is not running
      setTeamMembers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="team" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
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
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No team members added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center border-4 border-indigo-600 dark:border-indigo-400">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {member.name?.charAt(0).toUpperCase() || 'T'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{member.bio}</p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    <i className="ri-mail-line"></i>
                    {member.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

