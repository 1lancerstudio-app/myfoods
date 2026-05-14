import { type FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useCatalog } from '@/context/CatalogContext'
import { useOrders } from '@/context/OrdersContext'
import { useReviews } from '@/context/ReviewsContext'
import type { Product } from '@/types'
import { DELIVERY_FLAT, formatINR, FREE_DELIVERY_ABOVE, normalizePhone } from '@/lib/storage'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { StarRating } from '@/components/ui/StarRating'

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { getBySlug } = useCatalog()
  const product = slug ? getBySlug(slug) : undefined

  if (!product) {
    return (
      <div className="container-app py-24 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-white/55 bg-white/35 p-10 shadow-lg backdrop-blur-2xl">
          <p className="text-forest/70">Product not found.</p>
          <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-brand underline">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return <ProductDetailInner product={product} onBack={() => navigate('/shop')} />
}

function ProductDetailInner({ product, onBack }: { product: Product; onBack: () => void }) {
  const { addItem } = useCart()
  const { visibleForProduct, addReview } = useReviews()
  const { verifiedPhone } = useAuth()
  const { orders } = useOrders()
  const [grams, setGrams] = useState<250 | 500>(250)
  const [qty, setQty] = useState(1)

  const variant = useMemo(
    () => product.variants.find((v) => v.grams === grams) ?? product.variants[0],
    [product.variants, grams],
  )

  const reviews = visibleForProduct(product.id)

  const canReview = useMemo(() => {
    if (!verifiedPhone) return false
    const n = normalizePhone(verifiedPhone)
    return orders.some((o) => normalizePhone(o.phone) === n && o.status === 'delivered')
  }, [orders, verifiedPhone])

  function handleAdd() {
    addItem({
      productId: product.id,
      variantGrams: variant.grams,
      unitPrice: variant.price,
      name: product.name,
      image: product.images[0] ?? '',
      qty,
    })
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container-app">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-forest/70 hover:text-brand"
        >
          ← Back to shop
        </button>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
          <FadeInSection className="lg:col-span-6">
            <div className="overflow-hidden glass glass-shine border-white/90 p-3 shadow-2xl">
              <img src={product.images[0]} alt="" className="aspect-square w-full object-cover rounded-xl" />
            </div>
          </FadeInSection>

          <div className="lg:col-span-5 lg:col-start-8">
            <FadeInSection>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest/50">
                {product.category}
              </p>
              <h1 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">{product.name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-forest/75">{product.tagline}</p>
              <div className="mt-6 flex items-center gap-3">
                <StarRating value={product.rating} />
                <span className="text-sm text-forest/60">{product.rating.toFixed(1)} / 5</span>
              </div>

              <div className="mt-8 flex gap-2">
                {([250, 500] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrams(g)}
                    className={`flex-1 rounded-full border py-3 text-xs font-semibold uppercase tracking-wide ${
                      grams === g
                        ? 'border-brand bg-brand text-page'
                        : 'border-white/50 bg-white/25 text-forest/80 backdrop-blur-md hover:border-brand/40'
                    }`}
                  >
                    {g}g
                  </button>
                ))}
              </div>

              <p className="mt-8 text-3xl font-semibold text-forest">{formatINR(variant.price)}</p>
              <p className="mt-2 text-sm text-forest/55">Free delivery above {formatINR(FREE_DELIVERY_ABOVE)} ·
                otherwise {formatINR(DELIVERY_FLAT)}</p>

              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm font-semibold text-forest">Quantity</span>
                <div className="inline-flex items-center rounded-full border border-white/55 bg-white/25 backdrop-blur-md">
                  <button
                    type="button"
                    className="px-4 py-2 text-forest hover:bg-cream/80"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    className="px-4 py-2 text-forest hover:bg-cream/80"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="mt-8 w-full rounded-full bg-brand py-4 text-sm font-semibold tracking-wide text-page hover:bg-brand-dark"
              >
                Add to Cart
              </button>

              <div className="mt-12 space-y-6 text-sm leading-relaxed text-forest/80">
                <p>{product.description}</p>
                <div>
                  <h2 className="font-serif text-xl text-forest">Ingredients</h2>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {product.ingredients.map((ing) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-forest">Nutrition</h2>
                  <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                    {product.nutrition.map((n) => (
                      <div key={n.label} className="flex justify-between gap-4 border-b border-white/40 py-2">
                        <dt>{n.label}</dt>
                        <dd className="font-medium text-forest">{n.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        <section className="mt-20 border-t border-white/40 pt-16">
          <h2 className="font-serif text-3xl text-forest">Customer reviews</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.id} className="glass glass-card-hover glass-shine p-10 border-white/90 shadow-2xl">
                <div className="mb-6">
                  <StarRating value={r.rating} size={18} />
                </div>
                <blockquote className="font-serif text-xl leading-relaxed text-forest italic">
                  “{r.text}”
                </blockquote>
                <div className="mt-8 pt-6 border-t border-forest/5 flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-forest/40 uppercase">{r.authorName}</p>
                  <span className="text-[10px] font-bold tracking-widest text-brand uppercase">Verified Purchase</span>
                </div>
              </article>
            ))}
          </div>

          {canReview ? (
            <ReviewForm
              onSubmit={(data) => {
                addReview({
                  productId: product.id,
                  authorName: data.authorName,
                  rating: data.rating,
                  text: data.text,
                })
              }}
            />
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-brand/35 bg-white/25 p-6 text-sm text-forest/65 backdrop-blur-md">
              Verified customers can leave a review after an order is marked <strong>Delivered</strong>. Verify your
              number at checkout, then check back here.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}

function ReviewForm({
  onSubmit,
}: {
  onSubmit: (data: { authorName: string; rating: number; text: string }) => void
}) {
  const [authorName, setAuthorName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!authorName.trim() || !text.trim()) return
    onSubmit({ authorName: authorName.trim(), rating, text: text.trim() })
    setSent(true)
    setAuthorName('')
    setText('')
  }

  if (sent) {
    return (
      <p className="mt-8 rounded-2xl border border-white/55 bg-white/35 p-6 text-sm font-medium text-forest shadow-md backdrop-blur-xl">
        Thank you — your review is live.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl glass p-10 border-white/60 shadow-xl">
      <h3 className="font-serif text-2xl text-forest">Write a review</h3>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-forest/55">
        Your name
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:border-brand/40 focus:ring-2 focus:ring-brand/30"
          required
        />
      </label>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-forest/55">
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:border-brand/40 focus:ring-2 focus:ring-brand/30"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} stars
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-forest/55">
        Review
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:border-brand/40 focus:ring-2 focus:ring-brand/30"
          required
        />
      </label>
      <button
        type="submit"
        className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-page hover:bg-brand-dark"
      >
        Submit review
      </button>
    </form>
  )
}
