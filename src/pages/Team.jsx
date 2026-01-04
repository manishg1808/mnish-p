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
      const data = await response.json()
      setTeamMembers(data)
    } catch (error) {
      // Fallback to empty array if backend is not running
      setTeamMembers([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold">My Team</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Loading team members...</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-3xl font-bold">My Team</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-1">Meet the amazing people I work with.</p>
      {teamMembers.length === 0 ? (
        <div className="mt-8 card text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">No team members added yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="card text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {member.name?.charAt(0).toUpperCase() || 'T'}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">{member.role}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="mt-4 inline-block text-sm text-indigo-600 hover:underline"
                >
                  {member.email}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

