import { useOrders } from '@/context/OrdersContext'
import type { OrderStatus } from '@/types'
import { formatINR, normalizePhone } from '@/lib/storage'
import { ORDER_FLOW } from '@/lib/orderStatus'

export function AdminOrdersPage() {
  const { orders, updateStatus } = useOrders()

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Orders</h1>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/55 bg-white/35 shadow-lg backdrop-blur-xl">
        <table className="min-w-full divide-y divide-white/40 text-left text-sm">
          <thead className="bg-white/40 text-xs font-semibold uppercase tracking-wide text-forest/55 backdrop-blur-md">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40 bg-white/25">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-mono text-xs text-forest">{o.id}</td>
                <td className="px-4 py-3 text-forest">{o.customerName}</td>
                <td className="px-4 py-3 text-forest/80">{normalizePhone(o.phone)}</td>
                <td className="px-4 py-3 text-forest/75">
                  <ul className="max-w-[220px] space-y-1">
                    {o.items.map((it) => (
                      <li key={`${it.productId}:${it.variantGrams}`} className="truncate">
                        {it.name} × {it.qty}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 font-semibold text-forest">{formatINR(o.total)}</td>
                <td className="px-4 py-3">
                  <label className="sr-only" htmlFor={`status-${o.id}`}>
                    Status for {o.id}
                  </label>
                  <select
                    id={`status-${o.id}`}
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                    className="w-full max-w-[160px] rounded-xl border border-white/55 bg-white/40 px-2 py-2 text-xs font-medium text-forest backdrop-blur-sm"
                  >
                    {ORDER_FLOW.map((s) => (
                      <option key={s.status} value={s.status}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 ? (
          <p className="p-6 text-sm text-forest/65">No orders yet.</p>
        ) : null}
      </div>
    </div>
  )
}
