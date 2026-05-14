import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'

export function Header() {
  const { cartCount } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Scrolled state for styling
      setIsScrolled(currentScrollY > 20)
      
      // Hide after scrolling down significantly (approx 2 "turns")
      // Only hide if mobile menu is closed
      if (currentScrollY > 600 && !isMobileMenuOpen) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const storyHref = isHome ? '#our-story' : '/#our-story'
  const reviewsHref = isHome ? '#reviews' : '/#reviews'

  const headerClass = `fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1200px] transition-all duration-700 ease-in-out ${
    !isVisible ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
  } ${
    isScrolled || !isHome
      ? 'top-[1.25rem] glass-strong py-[0.75rem]'
      : 'top-0 bg-transparent py-[1.25rem]'
  }`

  const textColor = 'text-[#1e3a2e]'
  const linkHoverColor = 'hover:text-[#3a7a3a]'

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-[2.75rem] items-center text-sm font-medium tracking-wide transition-all duration-300 ${
      isActive ? 'text-[#3a7a3a]' : `${textColor} opacity-80 hover:opacity-100 ${linkHoverColor}`
    }`

  return (
    <header className={headerClass}>
      <div className="container-app flex items-center justify-between gap-[1.5rem]">
        <Link
          to="/"
          className={`relative z-[60] font-serif text-xl tracking-tight sm:text-2xl transition-colors duration-300 ${textColor}`}
        >
          MY Foods
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-end gap-[2.5rem]">
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <a
            href={storyHref}
            className={`inline-flex min-h-[2.75rem] items-center text-sm font-medium tracking-wide transition-all duration-300 ${textColor} opacity-80 hover:opacity-100 ${linkHoverColor}`}
          >
            Our Story
          </a>
          <a
            href={reviewsHref}
            className={`inline-flex min-h-[2.75rem] items-center text-sm font-medium tracking-wide transition-all duration-300 ${textColor} opacity-80 hover:opacity-100 ${linkHoverColor}`}
          >
            Reviews
          </a>
          <Link
            to="/track"
            className={`min-h-[2.75rem] items-center text-sm font-medium tracking-wide transition-all duration-300 ${textColor} opacity-80 hover:opacity-100 ${linkHoverColor}`}
          >
            Track Order
          </Link>
          <Link
            to="/cart"
            className={`relative inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-full border transition-all duration-300 ${
              isScrolled ? 'border-[#1e3a2e]/10 bg-white/50' : 'border-[#1e3a2e]/10'
            } ${textColor}`}
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full bg-[#3a7a3a] px-[0.25rem] text-[0.6875rem] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            ) : null}
          </Link>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center gap-[1rem] md:hidden relative z-[60]">
          <Link
            to="/cart"
            className={`relative inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-full border transition-all duration-300 ${
              isScrolled ? 'border-[#1e3a2e]/10 bg-white/50' : 'border-[#1e3a2e]/10'
            } ${textColor}`}
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[#3a7a3a] px-[0.25rem] text-[0.625rem] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-full border transition-all duration-300 ${
              isScrolled ? 'border-[#1e3a2e]/10 bg-white/50' : 'border-[#1e3a2e]/10'
            } ${textColor}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <nav className="flex h-full flex-col items-center justify-center gap-[2rem] p-[2.5rem]">
            <NavLink to="/shop" className="text-[2rem] font-serif text-[#1e3a2e]">
              Shop
            </NavLink>
            <a href={storyHref} className="text-[2rem] font-serif text-[#1e3a2e]">
              Our Story
            </a>
            <a href={reviewsHref} className="text-[2rem] font-serif text-[#1e3a2e]">
              Reviews
            </a>
            <Link to="/track" className="text-[2rem] font-serif text-[#1e3a2e]">
              Track Order
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
