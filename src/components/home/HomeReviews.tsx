import { FadeInSection } from '@/components/ui/FadeInSection'
import { StarRating } from '@/components/ui/StarRating'
import GlassSurface from '@/components/ui/GlassSurface'

const cards = [
  {
    name: 'Meera V.',
    text: 'Finally a muesli that is not cloyingly sweet. The millet crunch is addictive.',
    rating: 5,
  },
  {
    name: 'Kabir D.',
    text: 'Granola clusters hold up in warm milk. Quality feels far above supermarket brands.',
    rating: 5,
  },
  {
    name: 'Sana F.',
    text: 'The honey mix is my evening ritual — balanced, floral, and not sticky-sweet.',
    rating: 5,
  },
]

export function HomeReviews() {
  return (
    <section id="reviews" className="scroll-mt-24 py-20 sm:py-32">
      <FadeInSection>
        <div className="container-app">
          <div className="flex flex-col gap-[2rem] md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.3em] text-text-main/40">Real Feedback</p>
              <h2 className="mt-[1rem] font-serif text-section-title text-text-main leading-tight">
                Loved in kitchens<br />
                <span className="text-brand italic">across India.</span>
              </h2>
            </div>
            <GlassSurface
              borderRadius={24}
              backgroundOpacity={0.02}
              className="w-full md:w-auto overflow-hidden"
            >
              <div className="p-8 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-main/40">Average rating</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="font-serif text-5xl text-text-main">4.8</span>
                  <StarRating value={4.8} size={24} />
                </div>
              </div>
            </GlassSurface>
          </div>
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {cards.map((c) => (
              <GlassSurface
                key={c.name}
                borderRadius={32}
                backgroundOpacity={0.04}
                saturation={1.2}
                className="glass-card-hover overflow-hidden"
              >
                <figure className="flex flex-col p-10 w-full h-full">
                  <div className="flex gap-1 mb-6">
                    <StarRating value={c.rating} size={18} />
                  </div>
                  <blockquote className="flex-1 font-serif text-lg leading-relaxed text-text-main/90 italic">
                    “{c.text}”
                  </blockquote>
                  <div className="mt-8 flex items-center gap-4 border-t border-brand/10 pt-6">
                    <div className="h-8 w-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-[10px] font-bold text-brand">
                      {c.name.split(' ')[0][0]}
                    </div>
                    <figcaption className="text-sm font-bold tracking-wide text-text-main/60 uppercase">{c.name}</figcaption>
                  </div>
                </figure>
              </GlassSurface>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
