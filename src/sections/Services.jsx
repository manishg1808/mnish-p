import React from 'react'
import { useData } from '../context/DataContext.jsx'

export default function Services() {
  const { services } = useData()
  
  // Fallback to default services if API data is empty
  const defaultServices = [
    {
      id: 1,
      icon: 'ri-checkbox-circle-line',
      title: 'Static Website Development',
      description: 'Professional static websites built with modern technologies, fast loading times, and SEO optimization for your business needs.',
    },
    {
      id: 2,
      icon: 'ri-briefcase-line',
      title: 'Portfolio Development',
      description: 'Creative and impressive portfolio websites to showcase your work, skills, and achievements in the best possible way.',
    },
    {
      id: 3,
      icon: 'ri-information-line',
      title: 'Informational Website',
      description: 'Well-structured informational websites that effectively communicate your message and provide valuable content to visitors.',
    },
    {
      id: 4,
      icon: 'ri-star-line',
      title: 'Custom Website Development',
      description: 'Tailored website solutions designed specifically for your unique requirements and business objectives.',
    },
    {
      id: 5,
      icon: 'ri-wordpress-line',
      title: 'WordPress Development',
      description: 'Custom WordPress websites with themes, plugins, and full content management capabilities for easy updates.',
    },
    {
      id: 6,
      icon: 'ri-server-line',
      title: 'Backend Development',
      description: 'Robust backend systems and APIs built with best practices to power your web applications and services.',
    },
    {
      id: 7,
      icon: 'ri-file-text-line',
      title: 'Landing Page',
      description: 'High-converting landing pages designed to capture leads and drive action with compelling design and copy.',
    },
    {
      id: 8,
      icon: 'ri-refresh-line',
      title: 'Dynamic Website Development',
      description: 'Interactive and dynamic websites with real-time content updates and engaging user experiences.',
    },
    {
      id: 9,
      icon: 'ri-lightbulb-line',
      title: 'UI/UX Design',
      description: 'User-centric interface design and user experience optimization to create intuitive and beautiful digital products.',
    },
    {
      id: 10,
      icon: 'ri-shield-line',
      title: 'Admin Panel Development',
      description: 'Secure and functional admin panels with authentication, role management, and comprehensive dashboard features.',
    },
    {
      id: 11,
      icon: 'ri-code-s-slash-line',
      title: 'Development in Any Programming Language',
      description: 'Expert development services in multiple programming languages including React, Node.js, Python, PHP, and more.',
    },
    {
      id: 12,
      icon: 'ri-pages-line',
      title: 'Frontend Development',
      description: 'Modern frontend development using latest frameworks and libraries to create responsive and interactive user interfaces.',
    },
    {
      id: 13,
      icon: 'ri-search-line',
      title: 'SEO',
      description: 'Search engine optimization services to improve your website\'s visibility and ranking in search results.',
    },
    {
      id: 14,
      icon: 'ri-tools-line',
      title: 'Website Maintenance',
      description: 'Ongoing website maintenance, updates, security patches, and performance optimization to keep your site running smoothly.',
    },
  ]
  
  const displayServices = services && services.length > 0 ? services : defaultServices

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Services</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. 
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map(service => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className="text-5xl mb-4 text-indigo-600 dark:text-indigo-400">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

