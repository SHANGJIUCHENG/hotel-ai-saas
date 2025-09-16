import Link from 'next/link'
import clsx from 'clsx'
import { NavLink } from './types'

const links: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/properties', label: 'Properties' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/bookings', label: 'Bookings' },
]

export function Sidebar() {
  return (
    <div className="h-full p-4 space-y-2">
      <div className="px-2 py-3 text-lg font-semibold">Hotel AI × SaaS</div>
      <nav className="grid gap-1">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={clsx(
              'px-3 py-2 rounded-2xl text-sm text-neutral-700 hover:bg-neutral-100'
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}