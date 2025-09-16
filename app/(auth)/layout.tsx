import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        {children}
      </div>
    </div>
  )
}