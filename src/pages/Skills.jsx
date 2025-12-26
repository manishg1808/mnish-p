import React, { useEffect, useState } from 'react'

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skills')
      const data = await response.json()
      setSkills(data)
      
      // Animate progress bars
      setTimeout(() => {
        const obj = {}
        data.forEach(s => { obj[s.name] = s.level })
        setProgress(obj)
      }, 200)
    } catch (error) {
      // Fallback to empty array if backend is not running
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Loading skills...</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="mt-6 grid gap-4">
        {skills.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No skills added yet.</p>
          </div>
        ) : (
          skills.map(s => (
            <div key={s.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{s.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{progress[s.name] || 0}%</span>
              </div>
              <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-700"
                  style={{ width: (progress[s.name] || 0) + '%' }}
                  role="progressbar"
                  aria-valuenow={progress[s.name] || 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
