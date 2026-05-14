import { type FormEvent, useState } from 'react'
import { FadeInSection } from '@/components/ui/FadeInSection'
import GlassSurface from '@/components/ui/GlassSurface'

export function HomeNewsletter() {
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section className="py-20 sm:py-32">
      <FadeInSection>
        <div className="container-app">
          <GlassSurface
            borderRadius={40}
            backgroundOpacity={0.05}
            saturation={1.4}
            className="overflow-hidden shadow-2xl"
          >
            <div className="relative flex flex-col items-start justify-between gap-10 p-10 sm:flex-row sm:items-center sm:p-20 w-full h-full">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-brand/10 blur-3xl rounded-full animate-pulse pointer-events-none" />
              <div className="relative z-10 max-w-xl">
                <h2 className="font-serif text-4xl text-text-main sm:text-6xl leading-tight">
                  Get healthy recipes<br />
                  <span className="text-brand italic">in your inbox.</span>
                </h2>
                <p className="mt-8 text-base text-text-main/60 leading-relaxed max-w-md">
                  Seasonal bowls, pairing ideas, and early access to limited drops — <span className="text-text-main font-semibold">no spam, ever.</span>
                </p>
              </div>
              <div className="relative z-10 w-full max-w-md">
                {done ? (
                  <div className="glass p-8 border-brand/20 bg-brand/5 shadow-inner rounded-3xl">
                    <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">You are subscribed. Thank you!</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="relative group">
                      <label className="sr-only" htmlFor="newsletter-email">
                        Email
                      </label>
                      <input
                        id="newsletter-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="w-full min-h-[64px] rounded-full glass border-white/40 bg-white/40 px-10 text-sm text-text-main outline-none placeholder:text-text-main/30 focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all shadow-sm"
                      />
                      <button
                        type="submit"
                        className="mt-4 sm:mt-0 sm:absolute sm:right-2 sm:top-2 sm:bottom-2 min-h-[48px] rounded-full bg-brand px-10 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-[0_5px_15px_rgba(85,189,20,0.3)] transition-all hover:scale-105 hover:shadow-[0_10px_20px_rgba(85,189,20,0.4)]"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </GlassSurface>
        </div>
      </FadeInSection>
    </section>
  )
}
