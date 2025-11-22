import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    // No backend: just show a friendly message
    setSubmitted(true)
  }

  return (
    <section className="max-w-4xl">
      <h2 className="text-3xl font-bold">Contact Me</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-1">Get in touch with me for opportunities and collaborations.</p>
      
      {/* Contact Information */}
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 font-medium">Phone:</span>
              <span>+91-8092970688, +91-8986010819</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 font-medium">Email:</span>
              <span>mnishg49@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 font-medium">LinkedIn:</span>
              <a href="https://www.linkedin.com/in/manish-kumar-8227572b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">manish-kumar-8227572b8</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-indigo-600 font-medium">GitHub:</span>
              <a href="https://github.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">github.com/dashboard</a>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="space-y-3">
            <div>
              <span className="text-indigo-600 font-medium">Current Address:</span>
              <p className="mt-1">MIET Hostel, Baghpat Bypass, N.H 58, Meerut, Uttar Pradesh, 250005</p>
            </div>
            <div>
              <span className="text-indigo-600 font-medium">Permanent Address:</span>
              <p className="mt-1">Village-Dariyapur Godhna Road Ara, P.O-Anaith Ara, P.S- UdwanthNagar District-Bhojpur, Bihar, 802302</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Send Message</h3>
        <form onSubmit={onSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" required />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" required />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" value={form.message} onChange={onChange} className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" required />
          </div>
          <button className="btn btn-primary" type="submit">Send Message</button>
          {submitted && <p className="text-green-600">Thanks! This is a demo — no message was sent.</p>}
        </form>
      </div>
    </section>
  )
}
