'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Cloud, Palette, Terminal, Lock, Cpu, Globe } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code,
    color: '#00F5FF',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: '#00FFB2',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'GraphQL', level: 82 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: '#FF6A00',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 78 },
      { name: 'CI/CD', level: 88 },
    ],
  },
  {
    title: 'Design',
    icon: Palette,
    color: '#FFD000',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'UI/UX', level: 88 },
      { name: 'Adobe XD', level: 80 },
      { name: 'Prototyping', level: 85 },
    ],
  },
]

const tools = [
  { name: 'VS Code', icon: Terminal },
  { name: 'Git', icon: Terminal },
  { name: 'Postman', icon: Globe },
  { name: 'Docker', icon: Cpu },
  { name: 'AWS Console', icon: Cloud },
  { name: 'Figma', icon: Palette },
  { name: 'Nginx', icon: Server },
  { name: 'Linux', icon: Terminal },
]

function Server(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  )
}

export default function Skills() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="skills" className="py-20 bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === index
                  ? 'bg-neon-green text-background-primary'
                  : 'bg-background-panel text-gray-400 hover:text-white border border-gray-800'
              }`}
              style={{
                boxShadow: activeCategory === index ? '0 0 20px rgba(0, 255, 178, 0.4)' : 'none',
              }}
            >
              <category.icon className="w-5 h-5" />
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-gray-500 text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 bg-background-deep rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: skillCategories[activeCategory].color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools I Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-8">Tools I Use</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="p-4 rounded-lg bg-background-panel border border-gray-800 hover:border-neon-blue transition-colors cursor-default"
              >
                <tool.icon className="w-8 h-8 text-gray-400 hover:text-neon-blue transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
