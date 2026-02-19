'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, Filter } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Mpesa-Based Wi-Fi Hotspot Billing System',
    description: 'A comprehensive WiFi billing system with M-Pesa integration, loan management, and MikroTik hotspot control.',
    type: 'FinTech',
    technology: 'Node.js, Next.js, React, MySQL, MikroTik, Prisma',
    year: '2026',
    stats: { users: '500+', deployments: '470+' },
    color: '#00F5FF',
    link: 'https://anotherone-production-dcdb.up.railway.app',
    github: 'https://github.com/mwakidenis/Mpesa-Based_Wi-Fi-Hotspot_Billing_System',
  },
  {
    id: 2,
    title: 'HornBill',
    description: 'Enterprise resource planning system with advanced analytics and automation capabilities.',
    type: 'ERP',
    technology: 'Next.js, Python, AWS',
    year: '2023',
    stats: { clients: '30+', revenue: '$150K+' },
    color: '#ff9500',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'AI Plant Health Assistant',
    description: 'Machine learning-powered mobile app for diagnosing plant diseases and providing treatment recommendations.',
    type: 'AI/ML',
    technology: 'Flutter, TensorFlow, Firebase',
    year: '2024',
    stats: { users: '10K+', accuracy: '95%' },
    color: '#39FF14',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'LAVSMS',
    description: 'Laravel-based school management system handling students, exams, payments, and multiple user roles.',
    type: 'Education',
    technology: 'PHP, Laravel, Blade',
    year: '2022',
    stats: { users: '500+', schools: '10+' },
    color: '#FF3CAC',
    link: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'School Management System',
    description: 'React and Node.js based school management platform with JWT authentication and real-time analytics.',
    type: 'Education',
    technology: 'React, Node.js, SQLite, Tailwind CSS',
    year: '2024',
    stats: { students: '1K+', classes: '50+' },
    color: '#0070F3',
    link: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'TendaN301 Billing System',
    description: 'Micro-ISP router controller for Tenda devices with billing plan management and internet control.',
    type: 'Network',
    technology: 'PHP, SQLite, JavaScript',
    year: '2023',
    stats: { clients: '100+', routers: '200+' },
    color: '#ff0000',
    link: '#',
    github: '#',
  },
  {
    id: 7,
    title: 'Hornbill (Network Manager)',
    description: 'Lightweight system for network device management with monitoring and reporting features.',
    type: 'Network',
    technology: 'PHP, MySQL, JS',
    year: '2023',
    stats: { devices: '50+', uptime: '99%' },
    color: '#FF6600',
    link: '#',
    github: '#',
  },
  {
    id: 8,
    title: 'Amazon Clone',
    description: 'Full-featured Amazon web app clone with cart, wishlist, product browsing, and checkout, built with React and Firebase.',
    type: 'E-commerce',
    technology: 'React, Firebase, CSS',
    year: '2023',
    stats: { products: '500+', users: '5K+' },
    color: '#FF9900',
    link: 'https://shubho-amazon-clone.vercel.app/',
    github: 'https://github.com/mwakidenis/Amazon-clone',
  },
  {
    id: 9,
    title: 'VB-Mall',
    description: 'E-commerce platform empowering rural artisans of Nchiru to sell eco-friendly products nationwide, bridging rural-urban gaps.',
    type: 'E-commerce',
    technology: 'React, Redux, Node.js, Tailwind CSS, Kotlin, Bootstrap, Android, Vite, Vercel',
    year: '2026',
    stats: { vendors: '50+', products: '1K+' },
    color: '#00FFAA',
    link: 'https://vigybag-mwakidenis.pages.dev/',
    github: 'https://github.com/mwakidenis/VB-Mall',
  },
]

const filters = {
  technology: ['All', 'React', 'Next.js', 'Flutter', 'Node.js', 'Python', 'PHP', 'Laravel', 'Firebase', 'Redux', 'JS', 'PostgreSQL', 'SQLite', 'TensorFlow', 'CSS', 'Kotlin', 'Bootstrap', 'Android', 'Vite'],
  type: ['All', 'FinTech', 'ERP', 'AI/ML', 'Education', 'Network', 'E-commerce'],
  year: ['All', '2026', '2024', '2023', '2022'],
}

export default function Projects() {
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [activeFilters, setActiveFilters] = useState({
    technology: 'All',
    type: 'All',
    year: 'All',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredProjects = projects.filter((project) => {
    const techMatch = activeFilters.technology === 'All' || project.technology.includes(activeFilters.technology)
    const typeMatch = activeFilters.type === 'All' || project.type === activeFilters.type
    const yearMatch = activeFilters.year === 'All' || project.year === activeFilters.year
    return techMatch && typeMatch && yearMatch
  })

  return (
    <section id="projects" className="py-20 bg-background-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue to-neon-lime bg-clip-text text-transparent">
              Our Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          {Object.entries(filters).map(([key, values]) => (
            <div key={key} className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400 capitalize mr-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {key}:
              </span>
              {values.map((value) => (
                <button
                  key={value}
                  onClick={() => setActiveFilters(prev => ({ ...prev, [key]: value }))}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                    ${activeFilters[key as keyof typeof activeFilters] === value
                      ? 'bg-neon-blue text-background-primary'
                      : 'bg-background-panel text-gray-400 hover:text-white border border-gray-800'
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-neon-blue transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ boxShadow: '0 0 0 transparent' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ boxShadow: `0 0 30px ${project.color}50` }} />
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors">{project.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: `${project.color}20`, color: project.color }}>{project.type}</span>
                <span className="text-gray-500 text-xs">{project.year}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              <p className="text-gray-500 text-xs mb-4">{project.technology}</p>
              <div className="flex gap-4 mb-4">
                {Object.entries(project.stats).map(([key, value]) => (
                  <div key={key} className="text-neon-lime font-semibold">{value}<span className="text-gray-500 text-xs ml-1 capitalize">{key}</span></div>
                ))}
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={project.link} onClick={(e) => e.stopPropagation()} target="_blank" className="flex items-center gap-1 text-neon-blue text-sm hover:underline">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" className="flex items-center gap-1 text-gray-400 text-sm hover:text-white">
                  <Github className="w-4 h-4" /> Code
                </a>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-orange rounded-xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects match your filters.</p>
            <button onClick={() => setActiveFilters({ technology: 'All', type: 'All', year: 'All' })} className="mt-4 text-neon-blue hover:underline">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-primary/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-2xl p-8 rounded-2xl bg-background-panel border border-neon-blue"
              style={{ boxShadow: '0 0 50px rgba(0, 245, 255, 0.3)' }}
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: `${selectedProject.color}20`, color: selectedProject.color }}>{selectedProject.type}</span>
                <span className="text-gray-500 text-xs">{selectedProject.year}</span>
              </div>
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-background-deep">
                  <p className="text-gray-400 text-xs mb-1">Technology</p>
                  <p className="text-neon-blue">{selectedProject.technology}</p>
                </div>
                <div className="p-4 rounded-lg bg-background-deep">
                  <p className="text-gray-400 text-xs mb-1">Stats</p>
                  <div className="flex gap-4">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <span key={key} className="text-neon-lime text-sm">{value}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a href={selectedProject.link} target="_blank" className="flex-1 py-3 bg-neon-blue text-background-primary rounded-lg font-semibold text-center hover:opacity-90 transition-opacity">View Live</a>
                <a href={selectedProject.github} target="_blank" className="flex-1 py-3 border border-gray-700 text-white rounded-lg font-semibold text-center hover:border-neon-blue transition-colors">View Code</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
