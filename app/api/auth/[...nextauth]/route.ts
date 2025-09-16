import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Demo：接受任意邮箱/密码，通过后返回最小用户对象
        if (credentials?.email) {
          return { id: credentials.email, email: credentials.email }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }