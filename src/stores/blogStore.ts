import { create } from 'zustand'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  tags: string[]
  published: boolean
  readingTime: number
  likes: number
  views: number
  createdAt: string
}

interface Comment {
  id: string
  content: string
  author: string
  email: string
  createdAt: string
}

interface BlogState {
  posts: BlogPost[]
  selectedPost: BlogPost | null
  comments: Comment[]
  filter: {
    tag: string | null
    published: boolean | null
  }
  setPosts: (posts: BlogPost[]) => void
  setSelectedPost: (post: BlogPost | null) => void
  setComments: (comments: Comment[]) => void
  addComment: (comment: Comment) => void
  setFilter: (filter: Partial<BlogState['filter']>) => void
  clearFilters: () => void
}

export const useBlogStore = create<BlogState>((set) => ({
  posts: [],
  selectedPost: null,
  comments: [],
  filter: {
    tag: null,
    published: null,
  },
  setPosts: (posts) => set({ posts }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  clearFilters: () => set({ filter: { tag: null, published: null } }),
}))
