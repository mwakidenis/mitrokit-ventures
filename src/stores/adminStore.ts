import { create } from 'zustand'

interface DashboardStats {
  totalProjects: number
  totalPosts: number
  totalMessages: number
  totalSubscribers: number
  recentMessages: number
  activeSubscribers: number
}

interface AuditLogEntry {
  id: string
  action: string
  entityType: string
  entityId?: string
  details?: Record<string, unknown>
  createdAt: string
  userId: string
  userName?: string
}

interface AdminState {
  stats: DashboardStats
  auditLogs: AuditLogEntry[]
  isLoading: boolean
  activeTab: string
  setStats: (stats: DashboardStats) => void
  setAuditLogs: (logs: AuditLogEntry[]) => void
  addAuditLog: (log: AuditLogEntry) => void
  setLoading: (loading: boolean) => void
  setActiveTab: (tab: string) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: {
    totalProjects: 0,
    totalPosts: 0,
    totalMessages: 0,
    totalSubscribers: 0,
    recentMessages: 0,
    activeSubscribers: 0,
  },
  auditLogs: [],
  isLoading: false,
  activeTab: 'dashboard',
  setStats: (stats) => set({ stats }),
  setAuditLogs: (auditLogs) => set({ auditLogs }),
  addAuditLog: (log) => set((state) => ({ auditLogs: [log, ...state.auditLogs] })),
  setLoading: (isLoading) => set({ isLoading }),
  setActiveTab: ( set({ activeTabactiveTab) => }),
}))
