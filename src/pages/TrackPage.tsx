import { type FormEvent, useState } from 'react'
import { useOrders } from '@/context/OrdersContext'
import { formatINR, normalizePhone } from '@/lib/storage'
import { OrderStatusStepper } from '@/components/shop/OrderStatusStepper'
import { FadeInSection } from '@/components/ui/FadeInSection'

export function TrackPage() {
  const { getByPhone } = useOrders()
  const [phone, setPhone] = useState('')
  const [searched, setSearched] = useState<string | null>(null)

  const orders = searched ? getByPhone(searched) : []

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSearched(normalizePhone(phone))
  }

  return (
    <div className="border-b border-white/40 py-16 sm:py-20">
      <div className="container-app max-w-3xl">
        <FadeInSection>
          <h1 className="font-serif text-4xl text-forest sm:text-5xl">Track your order</h1>
          <p className="mt-3 text-sm text-forest/65">Enter the phone number used at checkout.</p>
        </FadeInSection>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile"
            className="min-h-12 flex-1 rounded-full border border-white/55 bg-white/40 px-5 text-sm text-forest outline-none backdrop-blur-md focus:ring-2 focus:ring-brand/30"
            required
          />
          <button
            type="submit"
            className="min-h-12 rounded-full bg-brand px-8 text-sm font-semibold text-page hover:bg-brand-dark"
          >
            View orders
          </button>
        </form>

        {searched && orders.length === 0 ? (
          <p className="mt-10 text-sm text-forest/70">No orders found for this number.</p>
        ) : null}

        <div className="mt-12 space-y-8">
          {orders.map((o) => (
            <article key={o.id} className="rounded-3xl border border-white/55 bg-white/35 p-6 shadow-lg backdrop-blur-2xl sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/50">Order ID</p>
                  <p className="mt-1 font-mono text-lg text-forest">{o.id}</p>
                  <p className="mt-2 text-sm text-forest/60">
                    {new Date(o.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <p className="text-lg font-semibold text-forest">{formatINR(o.total)}</p>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-forest/75">
                {o.items.map((it) => (
                  <li key={`${it.productId}:${it.variantGrams}`}>
                    {it.name} · {it.variantGrams}g × {it.qty}
                  </li>
                ))}
              </ul>
              <OrderStatusStepper status={o.status} />
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
