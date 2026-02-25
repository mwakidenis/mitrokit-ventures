'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Heart, MessageCircle, ChevronRight, Search, Tag, X } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable Cloud Infrastructure with AWS',
    excerpt: 'Learn how to design and implement robust cloud solutions that scale with your business needs.',
    content: 'Full article content here...',
    author: 'Mwaki Denis',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Cloud', 'AWS', 'DevOps'],
    likes: 124,
    comments: 18,
    category: 'Cloud',
    color: '#00F5FF',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Modern Web Development with Next.js 14',
    excerpt: 'Explore the latest features of Next.js 14 and how to build performant web applications.',
    content: 'Full article content here...',
    author: 'Mwaki Denis',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['Web Dev', 'Next.js', 'React'],
    likes: 89,
    comments: 12,
    category: 'Development',
    color: '#00FFB2',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'Cybersecurity Best Practices for 2024',
    excerpt: 'Essential security measures every developer should implement in their applications.',
    content: 'Full article content here...',
    author: 'Mwaki Denis',
    date: '2024-01-05',
    readTime: '10 min read',
    tags: ['Security', 'Best Practices'],
    likes: 156,
    comments: 24,
    category: 'Security',
    color: '#FF6A00',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'AI/ML Integration in Modern Apps',
    excerpt: 'How to seamlessly integrate machine learning capabilities into your applications.',
    content: 'Full article content here...',
    author: 'Mwaki Denis',
    date: '2023-12-28',
    readTime: '15 min read',
    tags: ['AI', 'ML', 'Integration'],
    likes: 203,
    comments: 31,
    category: 'AI/ML',
    color: '#39FF14',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
  },
]

const allTags = ['All', 'Cloud', 'AWS', 'DevOps', 'Web Dev', 'Next.js', 'React', 'Security', 'AI', 'ML']

export default function Blog() {
  const [mounted, setMounted] = useState(false)
  const [selectedTag, setSelectedTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredPosts = blogPosts.filter((post) => {
    const tagMatch = selectedTag === 'All' || post.tags.includes(selectedTag)
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return tagMatch && searchMatch
  })

  return (
    <section id="blog" className="py-20 bg-background-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights and tutorials from our experts
          </p>
        </motion.div>

        {/* Search and Tags */}
        <div className="mb-12 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-background-panel border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Results Info */}
          {searchQuery && (
            <p className="text-center text-gray-400 text-sm">
              Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for '{searchQuery}'
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  selectedTag === tag
                    ? 'bg-neon-green text-background-primary'
                    : 'bg-background-panel text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {/* --- MODIFICATION START --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{
          display: 'grid',
          gridAutoFlow: 'dense',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}>
        {/* --- MODIFICATION END --- */}
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-background-panel border border-gray-800 hover:border-neon-blue transition-all duration-300 overflow-hidden"
              style={{
                transform: 'scale(1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.025)'
                e.currentTarget.style.boxShadow = `0 0 20px ${post.color}40, 0 0 40px ${post.color}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${post.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Thumbnail */}
              {post.coverImage && (
                <div 
                  className="mb-4 rounded-lg overflow-hidden -mt-2 -mx-2"
                  style={{
                    height: '120px',
                    backgroundImage: `url(${post.coverImage})`,
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    transition: 'background-size 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundSize = '110%'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundSize = '100%'
                  }}
                />
              )}

              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span 
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: `${post.color}20`, color: post.color }}
                >
                  {post.category}
                </span>
              </div>

              {/* Title - Clickable */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors cursor-pointer">
                <a href={`#post-${post.id}`}>{post.title}</a>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-400 text-sm mb-4">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-background-deep text-gray-500 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 uppercase text-xs tracking-wider">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-800">
                <button className="flex items-center gap-1 text-gray-400 hover:text-neon-red transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-neon-blue transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
                <button 
                  className="ml-auto flex items-center gap-1 text-neon-blue text-sm font-medium group-hover:gap-2 transition-all"
                >
                  Read More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
              className="px-6 py-2 bg-neon-green text-background-primary font-medium rounded-lg hover:bg-neon-blue transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
