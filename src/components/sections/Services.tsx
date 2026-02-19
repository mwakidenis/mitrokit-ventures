'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone, Server, Globe, Shield, 
  Link2, HeadphonesIcon, FileText, X, Check
} from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications built with cutting-edge technologies.',
    icon: Smartphone,
    color: 'hsl(115, 100%, 50%)',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter Apps'],
  },
  {
    id: 2,
    title: 'Hosting Services',
    description: 'Reliable and scalable hosting solutions for your applications and websites.',
    icon: Server,
    color: '#00FFB2',
    features: ['Cloud Hosting', 'VPS Solutions', 'Dedicated Servers', 'CDN Integration'],
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications with optimal performance.',
    icon: Globe,
    color: '#FF6A00',
    features: ['React/Next.js', 'E-commerce Solutions', 'CMS Development', 'API Development'],
  },
  {
    id: 4,
    title: 'Cyber Security',
    description: 'Comprehensive security solutions to protect your digital assets.',
    icon: Shield,
    color: '#FF0033',
    features: ['Security Audits', 'Penetration Testing', 'Security Consulting', 'Data Encryption'],
  },
  {
    id: 5,
    title: 'API Integration',
    description: 'Seamless integration of third-party APIs and services.',
    icon: Link2,
    color: '#FFFF00',
    features: ['REST APIs', 'GraphQL', 'Payment Gateways', 'Third-party Integrations'],
  },
  {
    id: 6,
    title: 'Fast Customer Support',
    description: '24/7 dedicated support to ensure your systems run smoothly.',
    icon: HeadphonesIcon,
    color: '#FFD000',
    features: ['24/7 Support', 'Priority Response', 'Remote Assistance', 'System Monitoring'],
  },
  {
    id: 7,
    title: 'Clean Documentation',
    description: 'Comprehensive documentation for all your projects and systems.',
    icon: FileText,
    color: '#39FF14',
    features: ['Technical Docs', 'API Documentation', 'User Manuals', 'Code Comments'],
  },
]

export default function Services() {
  const [mounted, setMounted] = useState(false)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="services" className="py-20 bg-background-primary">
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
              Our Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive development and IT solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="group relative p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-neon-orange transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                boxShadow: '0 0 0 transparent',
              }}
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${service.color}20 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <service.icon 
                  className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12"
                  style={{ color: service.color }}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {service.description}
              </p>

              {/* Learn More */}
              <div className="flex items-center text-neon-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-primary/90 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-8 rounded-2xl bg-background-panel border border-neon-orange"
              style={{
                boxShadow: '0 0 50px rgba(255, 106, 0, 0.3)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${selectedService.color}20` }}
                >
                  <selectedService.icon 
                    className="w-8 h-8"
                    style={{ color: selectedService.color }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                  <p className="text-gray-400">
                    Professional Service
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6">
                {selectedService.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">What's Included:</h4>
                {selectedService.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-neon-green" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  setSelectedService(null)
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full mt-8 py-3 bg-neon-orange text-background-primary rounded-lg font-semibold hover:bg-neon-orange-deep transition-colors"
                style={{ boxShadow: '0 0 20px rgba(255, 106, 0, 0.4)' }}
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
