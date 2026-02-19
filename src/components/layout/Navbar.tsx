'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Hexagon } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background-deep/95 backdrop-blur-md border-b border-neon-blue/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-neon-blue group-hover:text-neon-green transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-neon-blue rounded-full animate-pulse group-hover:bg-neon-green transition-colors duration-300" />
              </div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
              Mitrokit<span className="text-neon-blue">Ventures</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#contact"
              className="px-6 py-2 bg-transparent border border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-background-primary transition-all duration-300 glow-green"
            >
              Hire Us
            </Link>
            <Link
              href="#projects"
              className="px-6 py-2 bg-neon-orange text-background-primary rounded-lg hover:bg-neon-orange-deep transition-all duration-300 glow-orange"
            >
              View Projects
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-neon-blue transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background-deep/95 backdrop-blur-md border-t border-neon-blue/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-neon-blue transition-colors duration-300 py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-2 bg-transparent border border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-background-primary transition-all duration-300"
                >
                  Hire Us
                </Link>
                <Link
                  href="#projects"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-2 bg-neon-orange text-background-primary rounded-lg hover:bg-neon-orange-deep transition-all duration-300"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
