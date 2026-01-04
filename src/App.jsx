import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Portfolio from './sections/Portfolio.jsx'
import Team from './sections/Team.jsx'
import Services from './sections/Services.jsx'
import Certificate from './sections/Certificate.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Contact from './sections/Contact.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <DataProvider>
      <div className="min-h-screen flex bg-white dark:bg-gray-950 overflow-x-hidden w-full">
        <Routes>
          <Route path="/mnish" element={<Admin />} />
          <Route path="*" element={
            <>
              <Sidebar dark={dark} setDark={setDark} />
              <main className="flex-1 lg:ml-64 overflow-x-hidden w-full">
                <Hero />
                <About />
                <Skills />
                <Portfolio />
                <Team />
                <Services />
                <Certificate />
                <Testimonials />
                <Contact />
                <Footer />
              </main>
            </>
          } />
        </Routes>
      </div>
    </DataProvider>
  )
}
