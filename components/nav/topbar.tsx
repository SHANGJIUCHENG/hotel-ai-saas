'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

export function Topbar() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
      <div className="md:hidden font-semibold">Hotel AI × SaaS</div>
      <div className="ml-auto flex items-center gap-2">
        {session?.user ? (
          <>
            <span className="text-sm text-neutral-600 hidden sm:inline">
              {session.user.email}
            </span>
            <Button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
          </>
        ) : (
          <Link href="/login" className="text-sm text-primary underline">Login</Link>
        )}
      </div>
    </div>
  )
}
