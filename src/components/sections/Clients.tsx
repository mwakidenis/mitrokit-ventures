'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const clients = [
  { name: 'Glo', color: '#FF6A00' },
  { name: 'Airtel', color: '#FF0033' },
  { name: 'MTN', color: '#FFD000' },
  { name: '9mobile', color: '#00F5FF' },
  { name: 'Startimes', color: '#00FFB2' },
  { name: 'GoTV', color: 'rgb(255, 0, 136)' },
  { name: 'IBEDC', color: '#39FF14' },
  { name: 'Moniepoint', color: '#00F5FF' },
]

export default function Clients() {
  const [mounted, setMounted] = useState(false)
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="clients" className="py-20 bg-background-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-yellow to-neon-orange bg-clip-text text-transparent">
              Trusted Clients
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Partnering with leading brands to deliver exceptional results
          </p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredClient(client.name)}
              onMouseLeave={() => setHoveredClient(null)}
              className="relative group"
            >
              <div 
                className={`
                  relative p-8 rounded-xl bg-background-panel border transition-all duration-500
                  ${hoveredClient === client.name 
                    ? 'border-neon-yellow scale-105' 
                    : 'border-gray-800 hover:border-gray-700'
                  }
                `}
                style={{
                  boxShadow: hoveredClient === client.name 
                    ? '0 0 30px rgba(255, 208, 0, 0.3)' 
                    : 'none'
                }}
              >
                {/* Client Logo Placeholder */}
                <div className="flex items-center justify-center h-20">
                  <div 
                    className={`
                      text-2xl font-bold transition-all duration-500
                      ${hoveredClient === client.name ? 'grayscale-0' : 'grayscale'}
                    `}
                    style={{ color: hoveredClient === client.name ? client.color : '#666' }}
                  >
                    {client.name}
                  </div>
                </div>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredClient === client.name ? 1 : 0,
                    y: hoveredClient === client.name ? 0 : 10
                  }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-neon-yellow text-background-primary text-sm font-medium rounded whitespace-nowrap"
                >
                  {client.name}
                </motion.div>
              </div>

              {/* Glow Effect */}
              {hoveredClient === client.name && (
                <div 
                  className="absolute inset-0 rounded-xl blur-xl opacity-50 -z-10"
                  style={{ backgroundColor: client.color }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
