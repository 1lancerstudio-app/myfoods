import { FadeInSection } from '@/components/ui/FadeInSection'
import GlassSurface from '@/components/ui/GlassSurface'

const tiles = [
  { label: 'Morning bowl', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=60&w=800&auto=format&fit=crop' },
  { label: 'Yogurt parfait', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=60&w=800&auto=format&fit=crop' },
  { label: 'Pantry shelf', img: 'https://images.unsplash.com/photo-1584473457406-623028fedece?q=60&w=800&auto=format&fit=crop' },
  { label: 'Honey drizzle', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=60&w=800&auto=format&fit=crop' },
  { label: 'Family table', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=60&w=800&auto=format&fit=crop' },
  { label: 'Outdoor brunch', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=60&w=800&auto=format&fit=crop' },
]

export function HomeInstagramGrid() {
  return (
    <FadeInSection className="py-20 sm:py-24">
      <div className="container-app">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest/50">On the table</p>
        <h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">Lifestyle &amp; rituals.</h2>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5">
          {tiles.map((t, i) => (
            <GlassSurface
              key={t.label}
              borderRadius={24}
              backgroundOpacity={0.02}
              saturation={1.5}
              className={`relative aspect-square glass-card-hover overflow-hidden ${
                i === 0 ? 'sm:row-span-2 sm:aspect-auto sm:min-h-[320px]' : ''
              }`}
            >
              <div className="relative w-full h-full group">
                <img 
                  src={t.img} 
                  alt={t.label} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5" />
                <span className="absolute bottom-4 left-4 rounded-full glass border border-white/60 px-4 py-1.5 text-[10px] font-bold tracking-widest text-forest uppercase shadow-sm">
                  {t.label}
                </span>
              </div>
            </GlassSurface>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
