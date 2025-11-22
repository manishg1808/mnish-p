import React from 'react'

export default function Certificate() {
  const certificates = [
    {
      id: 1,
      title: 'Web Development Certification',
      issuer: 'Online Platform',
      date: '2023',
      description: 'Completed comprehensive web development course covering HTML, CSS, JavaScript, and modern frameworks.',
      icon: 'ri-code-s-slash-line',
    },
    {
      id: 2,
      title: 'React.js Mastery',
      issuer: 'Tech Academy',
      date: '2023',
      description: 'Advanced React.js development including hooks, context API, and state management.',
      icon: 'ri-reactjs-line',
    },
    {
      id: 3,
      title: 'Full Stack Development',
      issuer: 'Coding Bootcamp',
      date: '2024',
      description: 'Complete full-stack development certification covering frontend and backend technologies.',
      icon: 'ri-stack-line',
    },
    {
      id: 4,
      title: 'UI/UX Design',
      issuer: 'Design Institute',
      date: '2023',
      description: 'User interface and user experience design principles and best practices.',
      icon: 'ri-palette-line',
    },
  ]

  return (
    <section id="certificate" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Certificates</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. 
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                  <i className={`${certificate.icon} text-2xl text-indigo-600 dark:text-indigo-400`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {certificate.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      {certificate.issuer}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {certificate.date}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {certificate.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

