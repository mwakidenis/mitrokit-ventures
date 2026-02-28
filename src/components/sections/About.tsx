'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Cloud, Palette, Mail, Award, Users, Clock, Target } from 'lucide-react'

const stats = [
  { icon: Award, value: '50+', label: 'Projects Completed', color: '#00F5FF' },
  { icon: Users, value: '30+', label: 'Happy Clients', color: '#00FFB2' },
  { icon: Clock, value: '5+', label: 'Years Experience', color: '#FF6A00' },
  { icon: Target, value: '100%', label: 'Success Rate', color: '#FFD000' },
]

const skills = [
  { name: 'Frontend Development', level: 95, color: '#00F5FF' },
  { name: 'Backend Development', level: 90, color: '#00FFB2' },
  { name: 'Cloud Architecture', level: 85, color: '#FF6A00' },
  { name: 'UI/UX Design', level: 88, color: '#FFD000' },
]

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="about" className="py-20 bg-background-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about creating innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            
            <h3 className="text-2xl font-bold text-white mb-6">
              Building the Future with Technology
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I'm Mwaki Denis, a passionate Full-Stack Developer and Cloud Expert with over 5 years of experience in building scalable web applications and digital solutions. My journey started with a curiosity for how things work, and it has evolved into a career dedicated to creating impactful technology.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              At Mitrokit Ventures, we believe in making the world a better place through technology. Our mission is to provide instant, reliable, and affordable development services that help businesses thrive in the digital age.
            </p>

            {/* Skills Bars */}
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-background-panel rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats & Icons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Stats Cards */}
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-gray-700 transition-colors text-center"
              >
                <stat.icon 
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: stat.color }}
                />
                <div 
                  className="text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}

            {/* Role Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-2 p-6 rounded-xl bg-gradient-to-r from-neon-blue/10 to-neon-green/10 border border-gray-800"
            >
              <h4 className="text-white font-semibold mb-4 text-center">My Expertise</h4>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 text-gray-300">
                  <Code className="w-5 h-5 text-neon-blue" />
                  <span className="text-sm">Full-Stack Developer</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Cloud className="w-5 h-5 text-neon-green" />
                  <span className="text-sm">Cloud Expert</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Palette className="w-5 h-5 text-neon-orange" />
                  <span className="text-sm">Graphics Designer</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-5 h-5 text-neon-yellow" />
                  <span className="text-sm">Digital Marketer</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
