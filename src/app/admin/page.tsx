'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Folder, 
  FileText, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Eye,
  Heart,
  Clock,
  CheckCircle,
  Trash2,
  RefreshCw
} from 'lucide-react'
// --- SAFE REBUILD START ---
import { getDashboardStats, markMessageAsRead, deleteMessage } from '@/actions/admin'
// --- SAFE REBUILD END ---

// Mock data for projects
const recentProjects = [
  { id: '1', title: 'Mpesa Billing System', views: 1234, likes: 89, status: 'Live' },
  { id: '2', title: 'HornBill CRM', views: 987, likes: 67, status: 'Live' },
  { id: '3', title: 'AI Plant Health', views: 756, likes: 45, status: 'In Progress' },
]

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  // --- SAFE REBUILD START ---
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  // --- SAFE REBUILD END ---

  useEffect(() => {
    setMounted(true)
    // --- SAFE REBUILD START ---
    fetchStats()
    // --- SAFE REBUILD END ---
  }, [])

  // --- SAFE REBUILD START ---
  const fetchStats = async () => {
    setLoading(true)
    try {
      const result = await getDashboardStats()
      if (result.success && result.data) {
        setStats([
          { 
            label: 'Total Messages', 
            value: result.data.totalMessages, 
            icon: MessageSquare, 
            color: '#FF6A00',
            change: `${result.data.unreadMessages} unread`
          },
          { 
            label: 'Blog Posts', 
            value: result.data.totalPosts, 
            icon: FileText, 
            color: '#00FFB2',
            change: `${result.data.publishedPosts} published`
          },
          { 
            label: 'Users', 
            value: result.data.totalUsers, 
            icon: Users, 
            color: '#FFD000',
            change: 'Active users'
          },
          { 
            label: 'Projects', 
            value: result.data.totalProjects, 
            icon: Folder, 
            color: '#00F5FF',
            change: 'Total projects'
          },
        ])
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchStats()
    setRefreshing(false)
  }

  const handleMarkAsRead = async (messageId: string) => {
    await markMessageAsRead(messageId)
    await fetchStats()
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(messageId)
      await fetchStats()
    }
  }
  // --- SAFE REBUILD END ---

  if (!mounted) return null

  return (
    <div>
      {/* Header with refresh */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with your site.</p>
        </div>
        {/* --- SAFE REBUILD START --- */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-background-panel border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-neon-blue transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
        {/* --- SAFE REBUILD END --- */}
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1,2,3,4].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-background-panel border border-gray-800 animate-pulse">
              <div className="h-12 w-12 bg-gray-800 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-800 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-background-panel border border-gray-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-5 h-5 text-neon-green" />
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mb-2">{stat.value.toLocaleString()}</p>
              <p className="text-neon-green text-sm">{stat.change}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-background-panel border border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Messages</h2>
            <a href="/admin/messages" className="text-neon-blue text-sm hover:underline">View All</a>
          </div>
          {/* --- SAFE REBUILD START --- */}
          <div className="space-y-4">
            {/* Messages would come from stats in production */}
            <div className="p-4 rounded-lg bg-background-deep border border-gray-800">
              <p className="text-gray-400 text-sm">Loading messages...</p>
            </div>
          </div>
          {/* --- SAFE REBUILD END --- */}
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-background-panel border border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Project Performance</h2>
            <a href="/admin/projects" className="text-neon-blue text-sm hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg bg-background-deep border border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'Live' 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : 'bg-neon-orange/20 text-neon-orange'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {project.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {project.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-6 rounded-xl bg-background-panel border border-gray-800"
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="/admin/projects/new"
            className="p-4 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-center hover:bg-neon-blue/20 transition-colors"
          >
            <Folder className="w-6 h-6 mx-auto mb-2 text-neon-blue" />
            <p className="text-white text-sm">Add Project</p>
          </a>
          <a 
            href="/admin/blog/new"
            className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/30 text-center hover:bg-neon-green/20 transition-colors"
          >
            <FileText className="w-6 h-6 mx-auto mb-2 text-neon-green" />
            <p className="text-white text-sm">Write Post</p>
          </a>
          <a 
            href="/admin/messages"
            className="p-4 rounded-lg bg-neon-orange/10 border border-neon-orange/30 text-center hover:bg-neon-orange/20 transition-colors"
          >
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-neon-orange" />
            <p className="text-white text-sm">View Messages</p>
          </a>
          <a 
            href="/admin/brand"
            className="p-4 rounded-lg bg-neon-yellow/10 border border-neon-yellow/30 text-center hover:bg-neon-yellow/20 transition-colors"
          >
            <Clock className="w-6 h-6 mx-auto mb-2 text-neon-yellow" />
            <p className="text-white text-sm">Brand Assets</p>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
