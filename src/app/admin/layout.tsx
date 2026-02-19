import { ReactNode } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/blog', icon: FileText, label: 'Blog' },
    { href: '/admin/projects', icon: Folder, label: 'Projects' },
    { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
    { href: '/admin/messages', icon: Users, label: 'Messages' },
    { href: '/admin/subscribers', icon: Users, label: 'Subscribers' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/brand', icon: Shield, label: 'Brand Assets' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-background-deep flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background-panel border-r border-gray-800 fixed h-full">
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-neon-blue" />
            </div>
            <span className="text-white font-bold text-lg">Mitrokit</span>
          </Link>
          <p className="text-gray-500 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-background-deep transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-background-deep transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
