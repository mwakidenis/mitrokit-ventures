import { create } from 'zustand'

interface Project {
  id: string
  title: string
  description: string
  image?: string
  techStack: string[]
  category: string
  year: number
  featured: boolean
  liveUrl?: string
  githubUrl?: string
}

interface ProjectState {
  projects: Project[]
  selectedProject: Project | null
  filter: {
    tech: string | null
    category: string | null
    year: number | null
  }
  setProjects: (projects: Project[]) => void
  setSelectedProject: (project: Project | null) => void
  setFilter: (filter: Partial<ProjectState['filter']>) => void
  clearFilters: () => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  filter: {
    tech: null,
    category: null,
    year: null,
  },
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  clearFilters: () => set({ filter: { tech: null, category: null, year: null } }),
}))
