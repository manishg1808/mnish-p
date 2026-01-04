import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Prepare WhatsApp message
    const message = `*New Contact Form Message*

*Name:* ${form.name}
*Email:* ${form.email}
*Subject:* ${form.subject}

*Message:*
${form.message}`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/918986010819?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')

    // Reset form and show success message
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const services = [
    'Static Website Development',
    'Portfolio Development',
    'Informational Website',
    'Custom Website Development',
    'WordPress Development',
    'Backend Development',
    'Landing Page',
    'Dynamic Website Development',
    'UI/UX Design',
    'Admin Panel Development',
    'Development in Any Programming Language',
    'Frontend Development',
    'SEO',
    'Website Maintenance',
    'Redgine Website'
  ]

  const contactInfo = [
    {
      icon: 'ri-map-pin-line',
      title: 'Address',
      content: 'Delhi NCR',
    },
    {
      icon: 'ri-phone-line',
      title: 'Call Us',
      content: '+91-8092970688, +91-8986010819',
    },
    {
      icon: 'ri-mail-line',
      title: 'Email Us',
      content: 'mnishg49@gmail.com',
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-indigo-600 dark:text-indigo-400">
                <i className={info.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={onChange}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition resize-none"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Loading...' : 'Send Message'}
                </button>
                {submitted && (
                  <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
                    Your message has been sent. Thank you!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

