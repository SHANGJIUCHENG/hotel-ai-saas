// 'use client'
// import { useState } from 'react'
// import { useAuthStore } from '@/lib/store/useAuthStore'
// import { Button } from '@/components/ui/button'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const login = useAuthStore(s => s.login)

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
//       <p className="text-sm text-neutral-600 mb-6">Demo 登录（任意邮箱密码皆可）</p>
//       <form
//         className="space-y-4"
//         onSubmit={(e) => { e.preventDefault(); login({ email }); }}
//       >
//         <div className="space-y-2">
//           <label className="text-sm">Email</label>
//           <input
//             className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             type="email"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm">Password</label>
//           <input
//             className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             type="password"
//             required
//           />
//         </div>
//         <Button type="submit" className="w-full">Continue</Button>
//       </form>
//     </div>
//   )
// }

// --- IGNORE ---

// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuthStore } from '@/lib/store/useAuthStore'
// import { Button } from '@/components/ui/button'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const login = useAuthStore(s => s.login)
//   const router = useRouter()

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
//       <p className="text-sm text-neutral-600 mb-6">Demo 登录（任意邮箱密码皆可）</p>
//       <form
//         className="space-y-4"
//         onSubmit={(e) => {
//           e.preventDefault()
//           login({ email })
//           router.push('/dashboard')   // 👈 少了这一句
//         }}
//       >
//         <div className="space-y-2">
//           <label className="text-sm">Email</label>
//           <input
//             className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             type="email"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm">Password</label>
//           <input
//             className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             type="password"
//             required
//           />
//         </div>
//         <Button type="submit" className="w-full">Continue</Button>
//       </form>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/dashboard'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await signIn('credentials', { email, password, redirect: true, callbackUrl })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <p className="text-sm text-neutral-600 mb-6">Demo 登录（任意邮箱密码皆可）</p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <input
            className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Password</label>
          <input
            className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Continue'}
        </Button>
      </form>
    </div>
  )
}
