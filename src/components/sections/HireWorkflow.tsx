'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle2, CreditCard, Package, ChevronRight, User, Mail, Phone } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Contact Form',
    description: 'Tell us about your project requirements',
    icon: User,
    color: '#00F5FF',
  },
  {
    id: 2,
    title: 'Agreement',
    description: 'Review and sign the project proposal',
    icon: FileText,
    color: '#00FFB2',
  },
  {
    id: 3,
    title: 'Payment',
    description: 'Complete payment to start development',
    icon: CreditCard,
    color: '#FFD000',
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Receive your completed project',
    icon: Package,
    color: '#39FF14',
  },
]

export default function HireWorkflow() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <section id="hire" className="py-20 bg-background-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow-deep bg-clip-text text-transparent">
              Hire Workflow
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Simple steps to start your project
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-[30px] left-[10%] right-[10%] h-0.5 bg-gray-800" />
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: `${(currentStep / steps.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute top-[30px] left-[10%] h-0.5 bg-gradient-to-r from-neon-green to-neon-yellow"
            />

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  onClick={() => currentStep >= step.id && setCurrentStep(step.id)}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
                    ${currentStep >= step.id ? `border-2 bg-[${step.color}]/20` : 'border-2 border-gray-700 bg-background-panel'}
                  `}
                  style={{
                    borderColor: currentStep >= step.id ? step.color : 'transparent',
                    boxShadow: currentStep === step.id ? `0 0 20px ${step.color}` : 'none',
                  }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="w-8 h-8" style={{ color: step.color }} />
                  ) : (
                    <step.icon className="w-8 h-8" style={{ color: currentStep >= step.id ? step.color : '#71717a' }} />
                  )}
                </div>
                <p className={`mt-3 text-sm font-medium ${currentStep === step.id ? 'text-white' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="p-8 rounded-xl bg-background-panel border border-gray-800 max-w-2xl mx-auto"
        >
          {currentStep === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Contact Details</h3>
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background-deep border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background-deep border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background-deep border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
              />
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-3 bg-background-deep border border-gray-800 rounded-lg text-white focus:border-neon-blue focus:outline-none transition-colors"
              >
                <option value="">Select Project Type *</option>
                <option value="app">App Development</option>
                <option value="web">Web Development</option>
                <option value="api">API Integration</option>
                <option value="other">Other</option>
              </select>
              <textarea
                rows={4}
                placeholder="Describe your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-background-deep border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-neon-green text-background-primary rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 178, 0.4)' }}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Project Agreement</h3>
              <p className="text-gray-400 mb-6">
                Review the terms and conditions for your project. Once agreed, we'll proceed to payment.
              </p>
              <div className="bg-background-deep p-6 rounded-lg mb-6 text-left">
                <h4 className="text-white font-medium mb-2">Terms & Conditions</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Project scope defined in proposal</li>
                  <li>• 50% advance payment required</li>
                  <li>• Revisions as per agreement</li>
                  <li>• Support period after delivery</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-4 border border-gray-700 text-white rounded-lg font-semibold hover:border-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-4 bg-neon-green text-background-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 178, 0.4)' }}
                >
                  Agree & Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Payment</h3>
              <p className="text-gray-400 mb-6">
                Complete your payment to start the project. We accept various payment methods.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="p-4 bg-background-deep rounded-lg border border-gray-800 hover:border-neon-blue transition-colors">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-neon-blue" />
                  <p className="text-white text-sm">Credit Card</p>
                </button>
                <button className="p-4 bg-background-deep rounded-lg border border-gray-800 hover:border-neon-green transition-colors">
                  <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-neon-green font-bold">P</div>
                  <p className="text-white text-sm">PayPal</p>
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-4 border border-gray-700 text-white rounded-lg font-semibold hover:border-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 py-4 bg-neon-yellow text-background-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ boxShadow: '0 0 20px rgba(255, 208, 0, 0.4)' }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-neon-green" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Project Delivered!</h3>
              <p className="text-gray-400 mb-6">
                Your project is complete. Check your email for the delivery details and access links.
              </p>
              <button
                onClick={() => setCurrentStep(1)}
                className="py-4 bg-neon-blue text-background-primary rounded-lg font-semibold px-8 hover:opacity-90 transition-opacity"
                style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)' }}
              >
                Start New Project
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
