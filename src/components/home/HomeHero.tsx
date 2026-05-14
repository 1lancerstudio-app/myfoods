import { Link } from 'react-router-dom'

export function HomeHero() {
  return (
    <section className="relative flex flex-col lg:h-screen lg:flex-row w-full overflow-hidden">
      {/* Right Content (Image) - On top in Mobile */}
      <div className="relative h-[40vh] w-full overflow-hidden lg:h-full lg:w-[55%] lg:order-2">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0 h-full w-full animate-in fade-in slide-in-from-right-10 duration-1000 delay-500 fill-mode-both">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5c842]/10 via-transparent to-[#1e3a2e]/5" />
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=60&w=1200&auto=format&fit=crop"
            alt="Natural food lifestyle"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Jar/Bowl Overlay */}
        <div className="relative z-10 flex h-full items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-1000 delay-700 fill-mode-both">
          <div className="relative group max-w-[240px] sm:max-w-[400px] lg:max-w-[500px]">
            <div className="absolute -inset-10 bg-amber-glow/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="glass-shine">
              <img
                src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=60&w=1200&auto=format&fit=crop"
                alt="Muesli Bowl"
                className="relative rounded-[2rem] shadow-2xl shadow-[#1e3a2e]/20 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Left Content (Text) - Below Image in Mobile */}
      <div className="relative flex w-full flex-col justify-center bg-[#F5F5F0] px-6 py-16 lg:h-full lg:w-[45%] lg:px-12 xl:px-20 lg:order-1">
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-both">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#5a7a5a]">
            PURE · NATURAL · WHOLESOME
          </p>
          
          <h1 className="mt-[1rem] font-serif text-hero text-[#1e3a2e]">
            Whole foods,<br />
            crafted for your health.
          </h1>
          
          <p className="mt-[1rem] max-w-[23.75rem] text-body leading-relaxed text-[#555]">
            Handcrafted millet muesli, granola & honey mixes — made with real ingredients for real nourishment.
          </p>
          
          <div className="mt-[2.5rem] flex flex-col gap-[1rem] sm:flex-row sm:items-center sm:gap-[2rem]">
            <Link
              to="/shop"
              className="inline-flex h-[3.375rem] w-full items-center justify-center rounded-full bg-[#3a7a3a] px-[2.5rem] text-[0.875rem] font-bold tracking-wider text-white transition-all hover:bg-[#2d5a2d] hover:scale-105 active:scale-95 sm:w-auto"
            >
              Shop Now
            </Link>
            <a
              href="#our-story"
              className="group flex min-h-[3.375rem] items-center justify-center text-[0.875rem] font-bold tracking-wider text-[#1e3a2e] transition-colors sm:h-auto sm:justify-start"
            >
              <span>
                Our Story 
                <span className="inline-block transition-transform group-hover:translate-x-[0.25rem] ml-[0.25rem]">→</span>
                <div className="h-[1px] w-0 bg-[#1e3a2e] transition-all group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
