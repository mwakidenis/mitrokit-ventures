'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Smartphone, Monitor, Apple, Globe } from 'lucide-react'

const downloadOptions = [
  {
    id: 'playstore',
    name: 'Play Store',
    icon: Smartphone,
    color: '#00F5FF',
    description: 'Get it on Android',
  },
  {
    id: 'appstore',
    name: 'App Store',
    icon: Apple,
    color: '#00FFB2',
    description: 'Download for iOS',
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    color: '#FF6A00',
    description: 'Windows Installer',
  },
  {
    id: 'mac',
    name: 'Mac',
    icon: Monitor,
    color: '#FFD000',
    description: 'macOS App',
  },
  {
    id: 'iphone',
    name: 'iPhone',
    icon: Smartphone,
    color: '#39FF14',
    description: 'Direct iOS Download',
  },
]

export default function AppDownload() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="download" className="py-20 bg-background-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-yellow to-neon-orange bg-clip-text text-transparent">
              Download Our Apps
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get our applications on your preferred platform
          </p>
        </motion.div>

        {/* Device Mockups */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Phone Mockup */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-48 h-96 mx-4 rounded-[3rem] border-4 border-gray-800 bg-background-panel overflow-hidden relative"
              style={{ boxShadow: '0 0 30px rgba(255, 208, 0, 0.2)' }}
            >
              {/* Screen */}
              <div className="absolute inset-2 bg-gradient-to-br from-neon-yellow/20 to-neon-orange/20 rounded-[2.5rem] flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-16 h-16 text-neon-yellow mx-auto mb-4" />
                  <p className="text-white font-semibold">Mobile App</p>
                </div>
              </div>
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-xl" />
            </motion.div>

            {/* Tablet/Desktop Mockups */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="w-64 h-48 mx-4 rounded-lg border-4 border-gray-800 bg-background-panel overflow-hidden relative"
              style={{ boxShadow: '0 0 30px rgba(255, 106, 0, 0.2)' }}
            >
              <div className="absolute inset-2 bg-gradient-to-br from-neon-orange/20 to-neon-yellow/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-neon-orange mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">Desktop App</p>
                </div>
              </div>
              
              {/* Screen Header */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {downloadOptions.map((option, index) => (
            <motion.a
              key={option.id}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-4 rounded-xl bg-background-panel border border-gray-800 hover:border-neon-yellow transition-all duration-300"
              style={{
                boxShadow: '0 0 0 transparent',
              }}
            >
              {/* Deep Yellow Glow on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-xl"
                style={{
                  background: `radial-gradient(circle at center, ${option.color}20 0%, transparent 70%)`,
                  boxShadow: `0 0 20px ${option.color}40`,
                }}
              />

              {/* Icon */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${option.color}20` }}
                >
                  <option.icon 
                    className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12"
                    style={{ color: option.color }}
                  />
                </div>

                {/* Text */}
                <h3 className="text-white font-semibold text-center group-hover:text-neon-yellow transition-colors">
                  {option.name}
                </h3>
                <p className="text-gray-500 text-xs text-center mt-1">
                  {option.description}
                </p>
              </div>

              {/* Download Icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4 text-neon-yellow" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm">
            Available on all major platforms • Free to download • Premium features available
          </p>
        </motion.div>
      </div>
    </section>
  )
}
