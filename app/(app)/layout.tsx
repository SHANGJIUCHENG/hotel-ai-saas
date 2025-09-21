import * as React from 'react'
import { Sidebar } from '@/components/nav/sidebar'
import { Topbar } from '@/components/nav/topbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] md:grid-cols-[240px,1fr] md:grid-rows-1">
      <aside className="hidden md:block border-r border-neutral-200 bg-white">
        <Sidebar />
      </aside>
      <main className="flex flex-col">
        <Topbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
