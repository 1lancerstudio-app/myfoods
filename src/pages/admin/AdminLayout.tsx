import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold ${
    isActive ? 'bg-brand text-page shadow-md' : 'text-forest/75 hover:text-brand'
  }`

export function AdminLayout() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent">
      <header className="border-b border-white/50 bg-white/30 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <NavLink to="/admin" className="font-serif text-xl text-forest">
            MY Foods Admin
          </NavLink>
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/admin" end className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/admin/orders" className={navClass}>
              Orders
            </NavLink>
            <NavLink to="/admin/reviews" className={navClass}>
              Reviews
            </NavLink>
            <button
              type="button"
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/25 px-4 py-2 text-sm font-semibold text-forest backdrop-blur-md hover:border-brand/40"
              onClick={() => {
                logout()
                navigate('/admin/login', { replace: true })
              }}
            >
              <LogOut size={16} />
              Log out
            </button>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Outlet />
      </div>
    </div>
  )
}
