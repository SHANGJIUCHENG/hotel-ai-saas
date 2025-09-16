// components/ui/input.tsx
import { InputHTMLAttributes, forwardRef } from 'react'
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
)
Input.displayName = 'Input'