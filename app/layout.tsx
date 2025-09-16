import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Hotel AI × SaaS',
  description: 'Demo foundation for hotel management SaaS',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}