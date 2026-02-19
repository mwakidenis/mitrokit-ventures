import { create } from 'zustand'

interface UIState {
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  activeModal: string | null
  toasts: Toast[]
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  toggleSearch: () => void
  openModal: (modal: string) => void
  closeModal: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  activeModal: null,
  toasts: [],
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  addToast: (toast) => 
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Math.random().toString(36).substr(2, 9) }]
    })),
  removeToast: (id) => 
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    })),
}))
