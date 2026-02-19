'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What services does Mitrokit Ventures offer?',
    answer: 'We offer a comprehensive range of services including App Development, Web Development, Hosting Services, Cyber Security, API Integration, Fast Customer Support, and Clean Documentation. Our team specializes in delivering enterprise-grade solutions tailored to your business needs.',
  },
  {
    id: 2,
    question: 'How long does it take to complete a project?',
    answer: 'Project timelines vary depending on complexity. A typical web application takes 4-8 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed project timelines during the initial consultation phase.',
  },
  {
    id: 3,
    question: 'Do you offer post-launch support and maintenance?',
    answer: 'Yes, we offer comprehensive post-launch support and maintenance packages. This includes security updates, bug fixes, performance optimization, and feature enhancements. Our support team is available 24/7 for critical issues.',
  },
  {
    id: 4,
    question: 'What is your pricing structure?',
    answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Each project receives a custom quote based on requirements, timeline, and complexity. Contact us for a free consultation and quote.',
  },
  {
    id: 5,
    question: 'How do you ensure project security?',
    answer: 'We follow industry-leading security practices including regular security audits, penetration testing, encrypted data storage, secure API implementations, and compliance with GDPR and other regulations. Security is embedded in our development process.',
  },
  {
    id: 6,
    question: 'Can you work with existing codebases?',
    answer: 'Absolutely! We have extensive experience working with legacy systems and existing codebases. We can audit your current infrastructure, identify improvements, and seamlessly integrate new features without disrupting operations.',
  },
  {
    id: 7,
    question: 'What technologies do you specialize in?',
    answer: 'Our expertise spans modern technologies including Next.js, React, Node.js, Python, TypeScript, PostgreSQL, MongoDB, AWS, Google Cloud, and more. We stay updated with the latest technologies to deliver cutting-edge solutions.',
  },
  {
    id: 8,
    question: 'How do I get started with a project?',
    answer: 'Simply contact us through the form on our website or email us at contact@mitrokit.com. We\'ll schedule a free consultation to discuss your project requirements, timeline, and budget. After that, we\'ll provide a detailed proposal.',
  },
]

export default function FAQ() {
  const [mounted, setMounted] = useState(false)
  const [openId, setOpenId] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="faq" className="py-20 bg-background-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-orange to-neon-yellow bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about our services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl overflow-hidden bg-background-panel border border-gray-800"
            >
              {/* Question Header */}
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-neon-orange group-hover:text-neon-yellow transition-colors flex-shrink-0" />
                  <span className="text-white font-medium group-hover:text-neon-orange transition-colors">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-0">
                      <div className="pl-9 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Orange Header Accent */}
              {openId === faq.id && (
                <div className="h-0.5 bg-gradient-to-r from-neon-orange to-neon-yellow" />
              )}

              {/* Yellow Hover Accent */}
              <div className="h-0.5 bg-transparent group-hover:bg-neon-yellow/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
