import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useCatalog } from '@/context/CatalogContext'
import type { Product, ProductCategory } from '@/types'
import { formatINR } from '@/lib/storage'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { StarRating } from '@/components/ui/StarRating'
import { Skeleton } from '@/components/ui/Skeleton'

const filters: { id: 'all' | ProductCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'muesli', label: 'Muesli' },
  { id: 'granola', label: 'Granola' },
  { id: 'honey', label: 'Honey' },
]

export function ShopPage() {
  const { products } = useCatalog()
  const { addItem } = useCart()
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const list = useMemo(() => {
    if (filter === 'all') return products
    return products.filter((p) => p.category === filter)
  }, [products, filter])

  return (
    <div className="py-12 sm:py-16">
      <div className="container-app">
        <FadeInSection>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-forest/50">Shop</p>
          <h1 className="mt-3 font-serif text-hero text-forest">Whole foods, thoughtfully made.</h1>
        </FadeInSection>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition ${
                filter === f.id
                  ? 'bg-brand text-page shadow-md shadow-brand/25'
                  : 'glass border border-white/55 text-forest/80 shadow-sm hover:border-brand/35'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-6 rounded-[2rem] border border-white/50 bg-white/20 p-8">
                <Skeleton className="aspect-[5/4] w-full rounded-[1.5rem]" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1 rounded-full" />
                  <Skeleton className="h-10 flex-1 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-12 w-32 rounded-full" />
                </div>
              </div>
            ))
          ) : (
            list.map((p) => (
              <ShopProductCard
                key={p.id}
                product={p}
                onAdd={(grams) => {
                  const v = p.variants.find((x) => x.grams === grams) ?? p.variants[0]
                  addItem({
                    productId: p.id,
                    variantGrams: v.grams,
                    unitPrice: v.price,
                    name: p.name,
                    image: p.images[0] ?? '',
                  })
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function ShopProductCard({
  product: p,
  onAdd,
}: {
  product: Product
  onAdd: (grams: 250 | 500) => void
}) {
  const [grams, setGrams] = useState<250 | 500>(250)
  const variant = p.variants.find((v) => v.grams === grams) ?? p.variants[0]

  return (
    <FadeInSection className="flex flex-col overflow-hidden glass glass-card-hover glass-shine border-white/90 shadow-2xl">
      <Link to={`/shop/${p.slug}`} className="block">
        <div className="aspect-[5/4] overflow-hidden bg-white/30 border-b border-white/40">
          <img 
            src={p.images[0]} 
            alt="" 
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110" 
            loading="lazy"
          />
        </div>
        <div className="p-8">
          <h2 className="font-serif text-2xl text-forest group-hover:text-brand transition-colors">{p.name}</h2>
          <p className="mt-2 text-sm text-forest/70 leading-relaxed">{p.tagline}</p>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarRating value={p.rating} size={16} />
              <span className="text-[10px] font-bold text-forest/40 uppercase tracking-widest">{p.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-6 px-8 pb-8">
        <div className="flex gap-2">
          {([250, 500] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrams(g)}
              className={`flex-1 rounded-full border py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                grams === g
                  ? 'border-brand bg-brand text-page shadow-md shadow-brand/20'
                  : 'border-white/60 bg-white/10 text-forest/80 backdrop-blur-md hover:border-brand/40'
              }`}
            >
              {g}g
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-forest">{formatINR(variant.price)}</span>
        </div>
        <div className="mt-auto flex gap-3">
          <Link
            to={`/shop/${p.slug}`}
            className="flex-1 rounded-full border border-white/60 bg-white/20 py-4 text-center text-xs font-bold tracking-widest text-forest uppercase backdrop-blur-md transition-all hover:bg-white/40 hover:border-white/90"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={() => onAdd(grams)}
            className="flex-1 rounded-full bg-brand py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:scale-[1.02] active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </FadeInSection>
  )
}
