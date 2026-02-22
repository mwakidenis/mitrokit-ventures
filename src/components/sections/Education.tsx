'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react'

const portfolio = {
  title: 'Portfolio & Certificates',
  url: 'https://mwakidenis.pages.dev/',
}

const education = [
  {
    id: 1,
    degree: 'BSc Computer Science',
    school: 'Meru University of Science and Technology',
    location: 'Meru, Kenya',
    year: '2024-2028',
    description: 'Focused on algorithms, full-stack development, software architecture, and scalable systems.',
    achievements: ["Dean's List", 'Top Project Award'],
    color: '#00FFB2',
  },
]

const certifications = [
  {
    id: 1,
    name: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    year: '2025',
    color: '#FF6A00',
  },
  {
    id: 2,
    name: 'Google Cloud Professional Developer',
    issuer: 'Google',
    year: '2025',
    color: '#FFD000',
  },
  {
    id: 3,
    name: 'Certified Kubernetes Administrator',
    issuer: 'CNCF',
    year: '2025',
    color: '#39FF14',
  },
  {
    id: 4,
    name: 'Meta Full-Stack Developer',
    issuer: 'Meta',
    year: '2026',
    color: '#00F5FF',
  },
]

export default function Education() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="education" className="py-20 bg-background-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-orange to-neon-yellow bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Academic background and professional certifications
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-neon-blue" />
            Education
          </h3>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-gray-800"
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[7px]"
                  style={{ backgroundColor: edu.color, boxShadow: `0 0 10px ${edu.color}` }}
                />
                
                <div className="p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                      <p className="text-gray-400">{edu.school}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {edu.year}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{edu.description}</p>
                  
                  {/* Achievements */}
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: `${edu.color}20`, color: edu.color }}
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-neon-yellow" />
            Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-background-panel border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <Award className="w-5 h-5" style={{ color: cert.color }} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">{cert.name}</h4>
                    <p className="text-gray-500 text-xs">{cert.issuer}</p>
                    <p className="text-gray-600 text-xs mt-1">{cert.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
