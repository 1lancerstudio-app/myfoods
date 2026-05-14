import { Leaf, MapPin, ShieldCheck } from 'lucide-react'
import { FadeInSection } from '@/components/ui/FadeInSection'
import GlassSurface from '@/components/ui/GlassSurface'

const items = [
  {
    icon: ShieldCheck,
    title: 'No preservatives',
    body: 'Clean labels you can read at a glance — nothing hidden, nothing artificial.',
  },
  {
    icon: MapPin,
    title: 'Locally sourced ingredients',
    body: 'We partner with trusted growers and mills across India for peak freshness.',
  },
  {
    icon: Leaf,
    title: 'Rich in fibre & nutrients',
    body: 'Millets, seeds, and nuts chosen for everyday energy and gut-friendly routines.',
  },
]

export function HomeWhy() {
  return (
    <section id="our-story" className="scroll-mt-24 py-20 sm:py-32">
      <FadeInSection>
        <div className="container-app">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-main/40">Our Commitment</p>
            <h2 className="mt-4 font-serif text-4xl text-text-main sm:text-6xl leading-tight">
              Nature-first recipes,<br />
              <span className="text-brand italic">modern craft.</span>
            </h2>
          </div>
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {items.map((it) => (
              <GlassSurface
                key={it.title}
                borderRadius={32}
                backgroundOpacity={0.03}
                saturation={1.2}
                className="glass-card-hover overflow-hidden"
              >
                <div className="p-12 relative w-full h-full">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-[2rem] bg-brand/10 border border-brand/30 shadow-inner">
                    <it.icon className="text-brand" size={32} strokeWidth={1} />
                  </div>
                  <h3 className="mt-10 font-serif text-3xl text-text-main leading-tight italic">{it.title}</h3>
                  <p className="mt-6 text-base leading-relaxed text-text-main/60">{it.body}</p>
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                     <it.icon size={80} strokeWidth={1} />
                  </div>
                </div>
              </GlassSurface>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
