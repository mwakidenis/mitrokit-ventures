import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Mitrokit Ventures | Instant, Reliable, and Affordable Development',
  description: 'Mitrokit Ventures makes the world a better place for you! Full-Stack & API Developer, Cloud Expert, Digital & Email Marketer, Graphics Designer.',
  keywords: [
    'Mitrokit Ventures',
    'Mwaki Denis',
    'Full-Stack Developer',
    'API Developer',
    'Cloud Expert',
    'Digital Marketing',
    'Graphics Design',
    'Web Development',
    'App Development',
    'Cyber Security'
  ],
  authors: [{ name: 'Mwaki Denis', url: '' }],
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-background-primary text-white antialiased`}>
        {children}
      </body>
   </html>
 )
}
