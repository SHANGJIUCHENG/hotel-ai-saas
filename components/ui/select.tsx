'use client'

// components/ui/select.tsx

import * as React from 'react'

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'
