'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react'

const experiences = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    location: 'Nairobi, Kenya',
    period: '2022 - Present',
    description: 'Leading development of enterprise-level web applications and microservices architecture.',
    technologies: ['Next.js', 'Node.js', 'AWS', 'PostgreSQL'],
    color: '#00F5FF',
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    company: 'InnovateTech',
    location: 'Remote',
    period: '2020 - 2022',
    description: 'Built scalable web applications and RESTful APIs for various clients.',
    technologies: ['React', 'Python', 'Docker', 'MongoDB'],
    color: '#00FFB2',
  },
  {
    id: 3,
    title: 'Junior Developer',
    company: 'StartupHub',
    location: 'Nairobi, Kenya',
    period: '2019 - 2020',
    description: 'Developed responsive websites and maintained existing web applications.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'Linux'],
    color: '#FF6A00',
  },
]

export default function Career() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="career" className="py-20 bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-lime to-neon-green bg-clip-text text-transparent">
              Career Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional experience and milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-green to-neon-lime" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-6 z-10"
                  style={{ backgroundColor: exp.color, boxShadow: `0 0 15px ${exp.color}` }}
                />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-gray-700 transition-colors">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4">{exp.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 text-xs rounded-md bg-background-deep text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Space for Alternating Layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neon-green text-background-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 178, 0.4)' }}
          >
            Let's Work Together
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
