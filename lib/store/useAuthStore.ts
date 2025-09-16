// 'use client'
// import { create } from 'zustand'

// type User = { email: string } | null

// type AuthState = {
//   user: User
//   login: (u: { email: string }) => void
//   logout: () => void
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   login: (u) => set({ user: { email: u.email } }),
//   logout: () => set({ user: null }),
// }))

// (已迁移到 NextAuth，会话状态通过 SessionProvider 提供)
export {}