import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function MainLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob h-[400px] w-[400px] bg-brand/15 left-[5%] top-[10%] animate-[float_25s_infinite_ease-in-out] blur-[60px] will-change-transform" />
        <div className="blob h-[500px] w-[500px] bg-amber-glow/10 right-[2%] top-[15%] animate-[float_30s_infinite_ease-in-out_reverse] blur-[80px] will-change-transform" />
        <div className="blob h-[350px] w-[350px] bg-brand/10 left-[15%] bottom-[5%] animate-[float_22s_infinite_ease-in-out_2s] blur-[60px] will-change-transform" />
      </div>
      
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
