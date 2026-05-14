import { type FormEvent, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '@/context/AdminAuthContext'

export function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = login(email, password)
    if (!ok) {
      setError('Invalid email or password.')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/55 bg-white/40 p-10 shadow-xl backdrop-blur-2xl">
        <h1 className="font-serif text-3xl text-forest">MY Foods Admin</h1>
        <p className="mt-2 text-sm text-forest/65">Demo login — see README for credentials.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:ring-2 focus:ring-brand/30"
              autoComplete="username"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:ring-2 focus:ring-brand/30"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-page hover:bg-brand-dark"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
