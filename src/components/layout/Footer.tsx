import { Link } from 'react-router-dom'
import { Instagram, Leaf } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="glass rounded-none border-b-0 border-x-0 bg-white/60 py-20 backdrop-blur-3xl border-white/60">
      <div className="container-app grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 font-serif text-3xl text-text-main">
            <Leaf className="text-brand" size={32} strokeWidth={1.5} />
            MY Foods
          </div>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-text-main/50">
            Handcrafted millet muesli, granola & honey mixes — <span className="text-text-main/80 font-medium">pure nutrition</span>, rooted in Indian tradition.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-main/30">Navigation</p>
          <ul className="mt-6 space-y-4 text-sm text-text-main/60">
            <li>
              <Link className="hover:text-brand transition-colors font-medium" to="/shop">
                Shop All Products
              </Link>
            </li>
            <li>
              <a className="hover:text-brand transition-colors font-medium" href="/#our-story">
                Our Story
              </a>
            </li>
            <li>
              <a className="hover:text-brand transition-colors font-medium" href="mailto:hello@myfoods.in">
                Support
              </a>
            </li>
            <li>
              <Link className="hover:text-brand transition-colors font-medium" to="/track">
                Track Order
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-main/30">Connect</p>
          <div className="mt-6 flex gap-4 text-text-main">
            <a
              href="#"
              className="glass-button p-3 border-brand/10 hover:border-brand/40"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-brand" />
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-brand/5">
            <p className="text-[10px] uppercase tracking-widest text-text-main/20 font-bold">© {year} MY Foods • Perambalur, India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
