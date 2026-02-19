'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Romeo Claudde',
    role: 'CEO, TechCorp',
    avatar: 'RC',
    rating: 5,
    content: 'Mitrokit Ventures transformed our digital presence. Their expertise in full-stack development and cloud solutions helped us scale our operations significantly. The team\'s dedication and professionalism are unmatched.',
    color: '#00F5FF',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CTO, InnovateTech',
    avatar: 'SJ',
    rating: 5,
    content: 'Working with Mitrokit was an incredible experience. They delivered our project on time and exceeded our expectations. The AI Plant Health Assistant they built has received amazing user feedback.',
    color: '#00FFB2',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Founder, StartupHub',
    avatar: 'MC',
    rating: 5,
    content: 'The Mpesa Billing System they developed revolutionized our payment processing. Their understanding of African fintech needs is exceptional.',
    color: '#FF6A00',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Director, Digital Agency',
    avatar: 'ED',
    rating: 5,
    content: 'Outstanding service and support. Mitrokit Ventures doesn\'t just build websites; they create digital experiences that drive business growth.',
    color: '#FFD000',
  },
]

export default function Testimonials() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 bg-background-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-yellow to-neon-orange bg-clip-text text-transparent">
              What Clients Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 md:p-12 rounded-2xl bg-background-panel border border-gray-800"
              style={{
                boxShadow: `0 0 30px ${currentTestimonial.color}20`,
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6">
                <Quote 
                  className="w-12 h-12"
                  style={{ color: currentTestimonial.color }}
                />
              </div>

              {/* Avatar Glow */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ 
                    boxShadow: `0 0 20px ${currentTestimonial.color}`,
                  }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ 
                    backgroundColor: `${currentTestimonial.color}20`,
                    color: currentTestimonial.color,
                  }}
                >
                  {currentTestimonial.avatar}
                </motion.div>
              </div>

              {/* Content */}
              <p className="text-gray-300 text-lg md:text-xl text-center mb-8 italic">
                "{currentTestimonial.content}"
              </p>

              {/* Author Info */}
              <div className="text-center">
                <h4 className="text-white font-semibold text-lg">
                  {currentTestimonial.name}
                </h4>
                <p className="text-gray-400 text-sm mb-2">
                  {currentTestimonial.role}
                </p>

                {/* Deep Yellow Star Ratings */}
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-5 h-5"
                      fill="#FFD000"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-background-panel border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-background-panel border border-gray-700 flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-neon-yellow' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
