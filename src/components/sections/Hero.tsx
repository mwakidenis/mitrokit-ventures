'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Hexagon, Sparkles, Code, Cloud, Palette, Mail } from 'lucide-react'

const roles = [
  { label: 'Full-Stack Developers', icon: Code, color: 'text-neon-blue' },
  { label: 'API Developers', icon: Code, color: 'text-neon-blue' },
  { label: 'Cloud Experts', icon: Cloud, color: 'text-neon-green' },
  { label: 'Digital Marketers', icon: Mail, color: 'text-neon-orange' },
  { label: 'Graphics Designers', icon: Palette, color: 'text-neon-yellow' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-primary"
    >
      {/* AI Motion Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-primary/50 to-background-primary" />
      
      {/* Floating Neon Shapes */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[5%] w-[200px] h-[200px] border border-neon-green/20 rounded-full"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[10%] w-[150px] h-[150px] border border-neon-blue/20"
        style={{ transform: 'rotate(45deg)' }}
      />
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] left-[15%] w-[100px] h-[100px] border border-neon-orange/20 rounded-full"
      />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
            className="absolute h-px bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent w-full"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo Reveal Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Hexagon className="w-24 h-24 text-neon-blue animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-neon-blue rounded-full animate-ping" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-neon-green/50"
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-neon-blue via-neon-green to-neon-blue bg-[length:200%_auto] animate-gradient-flow bg-clip-text text-transparent">
            Design With Us. Create Impact 
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          ✦ UI/UX Designer & Software Developers ✦
        </motion.p>

        {/* Role Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-lg md:text-xl">
            {roles.map((role, index) => (
              <motion.span
                key={role.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: currentRole === index ? 1 : 0,
                  y: currentRole === index ? 0 : 10
                }}
                className={`${role.color} font-semibold flex items-center gap-2`}
              >
                <role.icon className="w-5 h-5" />
                {role.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group px-8 py-4 bg-transparent border-2 border-neon-green text-neon-green rounded-lg font-semibold text-lg hover:bg-neon-green hover:text-background-primary transition-all duration-300 flex items-center gap-2"
            style={{ boxShadow: '0 0 10px rgba(0, 255, 178, 0.3)' }}
          >
            Hire Us
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
          
          <Link
            href="#projects"
            className="group px-8 py-4 bg-neon-orange text-background-primary rounded-lg font-semibold text-lg hover:bg-neon-orange-deep transition-all duration-300 flex items-center gap-2"
            style={{ boxShadow: '0 0 15px rgba(255, 106, 0, 0.4)' }}
          >
            View Projects
            <Sparkles className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '50+', label: 'Projects Completed', color: 'text-neon-blue' },
            { number: '5+', label: 'Years Experience', color: 'text-neon-green' },
            { number: '100%', label: 'Client Satisfaction', color: 'text-neon-orange' },
            { number: '24/7', label: 'Support', color: 'text-neon-yellow' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neon-blue rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
