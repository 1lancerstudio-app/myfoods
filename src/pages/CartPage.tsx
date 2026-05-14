import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { DELIVERY_FLAT, formatINR, FREE_DELIVERY_ABOVE } from '@/lib/storage'
import { FadeInSection } from '@/components/ui/FadeInSection'

export function CartPage() {
  const { items, increment, decrement, remove, subtotal } = useCart()
  const delivery = subtotal >= FREE_DELIVERY_ABOVE || subtotal === 0 ? 0 : DELIVERY_FLAT
  const total = subtotal + delivery

  return (
    <div className="border-b border-white/40 py-16 sm:py-20">
      <div className="container-app">
        <FadeInSection>
          <h1 className="font-serif text-4xl text-forest sm:text-5xl">Your cart</h1>
          <p className="mt-2 text-sm text-forest/65">
            Delivery is free above {formatINR(FREE_DELIVERY_ABOVE)}. Otherwise we add {formatINR(DELIVERY_FLAT)}.
          </p>
        </FadeInSection>

        {items.length === 0 ? (
          <p className="mt-12 text-forest/70">
            Your cart is empty.{' '}
            <Link to="/shop" className="font-semibold text-forest underline">
              Continue shopping
            </Link>
          </p>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-7">
              {items.map((it) => (
                <div
                  key={`${it.productId}:${it.variantGrams}`}
                  className="flex gap-4 rounded-2xl border border-white/55 bg-white/35 p-4 shadow-md backdrop-blur-2xl sm:gap-6 sm:p-6"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/50 bg-white/40 backdrop-blur-md sm:h-28 sm:w-28">
                    {it.image ? (
                      <img src={it.image} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-serif text-xl text-forest">{it.name}</p>
                        <p className="text-sm text-forest/55">{it.variantGrams}g</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(it.productId, it.variantGrams)}
                        className="text-xs font-semibold uppercase tracking-wide text-forest/45 hover:text-forest"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-full border border-white/55 bg-white/30 backdrop-blur-md">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm text-forest hover:bg-white/50"
                          onClick={() => decrement(it.productId, it.variantGrams)}
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold">{it.qty}</span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm text-forest hover:bg-white/50"
                          onClick={() => increment(it.productId, it.variantGrams)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-forest">{formatINR(it.unitPrice * it.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="sticky top-24 rounded-3xl border border-white/55 bg-white/40 p-8 shadow-lg backdrop-blur-2xl">
                <h2 className="font-serif text-2xl text-forest">Order summary</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-forest/80">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-forest">{formatINR(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-forest/80">
                    <dt>Delivery</dt>
                    <dd className="font-medium text-forest">{delivery === 0 ? 'Free' : formatINR(delivery)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-white/50 pt-4 text-base font-semibold text-forest">
                    <dt>Total</dt>
                    <dd>{formatINR(total)}</dd>
                  </div>
                </dl>
                <Link
                  to="/checkout"
                  className="mt-8 block w-full rounded-full bg-brand py-4 text-center text-sm font-semibold tracking-wide text-page hover:bg-brand-dark"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
