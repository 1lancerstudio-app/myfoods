import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '@/context/OrdersContext'
import { formatINR } from '@/lib/storage'

export function AdminDashboardPage() {
  const { orders } = useOrders()

  const stats = useMemo(() => {
    const todayKey = new Date().toDateString()
    const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === todayKey)
    const revenueToday = todayOrders.reduce((s, o) => s + o.total, 0)
    const pending = orders.filter((o) => o.status === 'order_received' || o.status === 'packed').length
    const revenueAll = orders.reduce((s, o) => s + o.total, 0)
    return {
      todayCount: todayOrders.length,
      revenueToday,
      pending,
      revenueAll,
    }
  }, [orders])

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Dashboard</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/55 bg-white/35 p-6 shadow-lg backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">Orders today</p>
          <p className="mt-3 font-serif text-4xl text-forest">{stats.todayCount}</p>
        </div>
        <div className="rounded-3xl border border-white/55 bg-white/35 p-6 shadow-lg backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">Revenue today</p>
          <p className="mt-3 font-serif text-4xl text-forest">{formatINR(stats.revenueToday)}</p>
        </div>
        <div className="rounded-3xl border border-white/55 bg-white/35 p-6 shadow-lg backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">Pending orders</p>
          <p className="mt-3 font-serif text-4xl text-forest">{stats.pending}</p>
          <p className="mt-2 text-xs text-forest/55">Received or packed</p>
        </div>
      </div>
      <div className="mt-8 rounded-3xl border border-white/55 bg-white/40 p-6 shadow-lg backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">Lifetime revenue</p>
        <p className="mt-2 font-serif text-2xl text-forest">{formatINR(stats.revenueAll)}</p>
        <Link to="/admin/orders" className="mt-4 inline-block text-sm font-semibold text-brand underline hover:opacity-80">
          View all orders
        </Link>
      </div>
    </div>
  )
}
