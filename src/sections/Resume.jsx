import React from 'react'

export default function Resume() {
  const education = [
    {
      id: 1,
      title: 'Master of Fine Arts & Graphic Design',
      period: '2015 - 2016',
      location: 'Rochester Institute of Technology, Rochester, NY',
      description: 'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend',
    },
    {
      id: 2,
      title: 'Bachelor of Fine Arts & Graphic Design',
      period: '2010 - 2014',
      location: 'Rochester Institute of Technology, Rochester, NY',
      description: 'Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila',
    },
  ]

  const experience = [
    {
      id: 1,
      title: 'Senior graphic design specialist',
      period: '2019 - Present',
      location: 'Experion, New York, NY',
      responsibilities: [
        'Lead in the design, development, and implementation of the graphic, layout, and production communication materials',
        'Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project.',
        'Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design',
        'Oversee the efficient use of production project budgets ranging from $2,000 - $25,000',
      ],
    },
    {
      id: 2,
      title: 'Graphic design specialist',
      period: '2017 - 2018',
      location: 'Stepping Stone Advertising, New York, NY',
      responsibilities: [
        'Developed numerous marketing programs (logos, brochures,infographics, presentations, and advertisements).',
        'Managed up to 5 projects or tasks at a given time while under pressure',
        'Recommended and consulted with clients on the most appropriate graphic design',
        'Created 4+ design presentations and proposals a month for clients and account managers',
      ],
    },
  ]

  return (
    <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Resume</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. 
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Summary */}
          <div className="md:col-span-2 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Summary</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Brandon Johnson</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                Innovative and deadline-driven Graphic Designer with 3+ years of experience designing 
                and developing user-centered digital/print marketing material from initial concept to 
                final, polished deliverable.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Portland par 127,Orlando, FL</li>
                <li>• (123) 456-7891</li>
                <li>• alice.barkley@example.com</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Education</h3>
            <div className="space-y-6">
              {education.map(edu => (
                <div 
                  key={edu.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 border-indigo-600 dark:border-indigo-400 border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {edu.title}
                  </h4>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                    {edu.period}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 italic mb-3">
                    {edu.location}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Experience</h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div 
                  key={exp.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 border-purple-600 dark:border-purple-400 border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {exp.title}
                  </h4>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    {exp.period}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 italic mb-3">
                    {exp.location}
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>• {resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

