import * as React from 'react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-neutral-600">系统概览与关键指标占位</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-28 skeleton"></div>
        <div className="h-28 skeleton"></div>
        <div className="h-28 skeleton"></div>
      </div>
    </div>
  )
}
