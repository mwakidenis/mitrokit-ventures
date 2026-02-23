'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, Loader2, RefreshCw } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  type: string
  technology: string
  year: string
  stats: {
    stars: string
    forks: string
  }
  color: string
  link: string
  github: string
}

export default function Projects() {
  const [mounted, setMounted] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/repos')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }
      
      setProjects(data.projects)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
      console.error('Error fetching repos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchProjects()
  }, [])

  if (!mounted) return null

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
            Real-time projects fetched from GitHub
          </p>
        </motion.div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Projects
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-neon-blue animate-spin" />
            <span className="ml-3 text-gray-400">Loading projects from GitHub...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="px-4 py-2 bg-neon-blue text-background-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
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
                  <div className="text-neon-lime font-semibold">
                    ⭐ {project.stats.stars}
                    <span className="text-gray-500 text-xs ml-1">stars</span>
                  </div>
                  <div className="text-neon-blue font-semibold">
                    🍴 {project.stats.forks}
                    <span className="text-gray-500 text-xs ml-1">forks</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-neon-blue text-sm hover:underline">
                    <ExternalLink className="w-4 h-4" /> View
                  </a>
                  <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 text-sm hover:text-white">
                    <Github className="w-4 h-4" /> Code
                  </a>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-orange rounded-xl transition-colors duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No projects found. Make sure your GitHub repositories are public.
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
                  <p className="text-neon-blue text-sm">{selectedProject.technology}</p>
                </div>
                <div className="p-4 rounded-lg bg-background-deep">
                  <p className="text-gray-400 text-xs mb-1">Stats</p>
                  <div className="flex gap-4">
                    <span className="text-neon-lime text-sm">⭐ {selectedProject.stats.stars}</span>
                    <span className="text-neon-blue text-sm">🍴 {selectedProject.stats.forks}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-neon-blue text-background-primary rounded-lg font-semibold text-center hover:opacity-90 transition-opacity">View on GitHub</a>
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 border border-gray-700 text-white rounded-lg font-semibold text-center hover:border-neon-blue transition-colors">View Code</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
