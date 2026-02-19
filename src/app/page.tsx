'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Clients from '@/components/sections/Clients'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import FAQ from '@/components/sections/FAQ'
import AppDownload from '@/components/sections/AppDownload'
import Contact from '@/components/sections/Contact'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import Career from '@/components/sections/Career'
import HireWorkflow from '@/components/sections/HireWorkflow'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background-primary">
      <Navbar />
      <Hero />
      <Clients />
      <About />
      <Skills />
      <Education />
      <Career />
      <Services />
      <Projects />
      <Testimonials />
      <Blog />
      <FAQ />
      <HireWorkflow />
      <AppDownload />
      <Contact />
      <Footer />
    </main>
  )
}
