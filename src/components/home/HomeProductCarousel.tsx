import { type MouseEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useCatalog } from '@/context/CatalogContext'
import type { Product } from '@/types'
import { formatINR } from '@/lib/storage'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { StarRating } from '@/components/ui/StarRating'
import { Skeleton } from '@/components/ui/Skeleton'
import GlassSurface from '@/components/ui/GlassSurface'

export function HomeProductCarousel() {
  const { products } = useCatalog()
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(true)
  const featured = products?.slice(0, 3) || []

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  function handleAddToCart(e: MouseEvent, p: Product) {
    e.preventDefault()
    e.stopPropagation()
    const v = p.variants?.find((x) => x.grams === 250) ?? p.variants?.[0]
    if (!v) return
    addItem({
      productId: p.id,
      variantGrams: v.grams,
      unitPrice: v.price,
      name: p.name,
      image: p.images[0] ?? '',
    })
  }

  return (
    <FadeInSection className="py-[5rem] sm:py-[8rem]">
      <div className="container-app">
        <div className="flex flex-col justify-between gap-[1.5rem] md:flex-row md:items-end">
          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.3em] text-text-main/40">Pure Staples</p>
            <h2 className="mt-[0.75rem] font-serif text-section-title text-text-main italic">Breakfast, elevated.</h2>
          </div>
          <Link to="/shop" className="inline-flex min-h-[2.75rem] items-center text-[0.875rem] font-bold tracking-widest text-brand uppercase hover:text-text-main transition-colors">
            View all products →
          </Link>
        </div>
        <div className="mt-[4rem] flex snap-x snap-mandatory gap-[1.5rem] overflow-x-auto pb-[2rem] sm:gap-[2.5rem]">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-[min(100%,340px)] shrink-0 snap-start space-y-[1.5rem]">
                <Skeleton className="aspect-[5/4] w-full rounded-[2rem]" />
                <div className="space-y-[1rem] p-[2rem]">
                  <Skeleton className="h-[2rem] w-3/4" />
                  <Skeleton className="h-[1rem] w-full" />
                  <Skeleton className="h-[1rem] w-full" />
                  <div className="flex items-center justify-between pt-[1rem]">
                    <Skeleton className="h-[1.5rem] w-[5rem]" />
                    <Skeleton className="h-[1rem] w-[4rem]" />
                  </div>
                </div>
              </div>
            ))
          ) : featured?.length > 0 ? (
            featured.map((p) => {
              const v = p.variants?.find((x) => x.grams === 250) ?? p.variants?.[0]
              if (!p || !v) return null

              return (
                <GlassSurface
                  key={p.id}
                  borderRadius={32}
                  backgroundOpacity={0.05}
                  saturation={1.4}
                  className="group w-[min(100%,340px)] shrink-0 snap-start glass-card-hover overflow-hidden"
                >
                  <Link to={`/shop/${p.slug}`} className="block w-full h-full">
                    <div className="aspect-[5/4] overflow-hidden bg-white/30 relative border-b border-white/40">
                      <img
                        src={p.images?.[0]}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                    </div>
                    <div className="space-y-[1rem] p-[2rem]">
                      <h3 className="font-serif text-card-title text-text-main group-hover:text-brand transition-colors leading-tight">{p.name}</h3>
                      <p className="text-sm leading-relaxed text-text-main/70 line-clamp-2">{p.tagline}</p>
                      <div className="flex items-center justify-between pt-[1rem]">
                        <span className="text-[1.5rem] font-bold text-text-main">{formatINR(v.price)}</span>
                        <div className="flex items-center gap-[0.5rem]">
                          <StarRating value={p.rating ?? 5} size={16} />
                          <span className="text-[0.625rem] font-bold text-text-main/40 uppercase tracking-widest">{(p.rating ?? 5).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-[2rem] pb-[2rem]">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, p)}
                        className="block w-full glass-button py-[1rem] text-center text-[0.75rem] font-bold tracking-[0.2em] text-text-main uppercase border-white/40 hover:bg-brand hover:text-white hover:border-brand shadow-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </GlassSurface>
              )
            })
          ) : (
            <div className="w-full text-center py-[5rem] text-text-main/40 font-serif italic text-[1.5rem]">
              Discovering our latest harvests...
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  )
}
