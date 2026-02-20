'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hexagon, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
  ],
  services: [
    { name: 'App Development', href: '#services' },
    { name: 'Web Development', href: '#services' },
    { name: 'Cyber Security', href: '#services' },
    { name: 'API Integration', href: '#services' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'GDPR', href: '/gdpr' },
    { name: 'DPA', href: '/dpa' },
  ],
}

const socialLinks = [
  { name: 'Github', icon: Github, href: 'https://github.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
]

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="bg-background-deep border-t border-neon-blue/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-6">
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
            <p className="text-gray-400 mb-6 max-w-md">
              Mitrokit Ventures makes the world a better place for you! 
              Instant, Reliable, and Affordable Development.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-neon-blue" />
                <span>contact@mitrokit.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-neon-green" />
                <span>+254 798 750 585</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-neon-orange" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-neon-orange transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-neon-yellow transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Mitrokit Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
