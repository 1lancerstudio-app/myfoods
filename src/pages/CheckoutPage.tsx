import { type FormEvent, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrdersContext'
import {
  DELIVERY_FLAT,
  formatINR,
  FREE_DELIVERY_ABOVE,
  MOCK_OTP,
  normalizePhone,
} from '@/lib/storage'
import type { Address, OrderLine } from '@/types'
import { FadeInSection } from '@/components/ui/FadeInSection'

type Step = 'phone' | 'otp' | 'address' | 'success'

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const { setVerifiedPhone } = useAuth()
  const { addOrder } = useOrders()

  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<string | null>(null)
  const [address, setAddress] = useState<Address>({
    name: '',
    line1: '',
    city: '',
    pincode: '',
    state: '',
  })

  const delivery = subtotal >= FREE_DELIVERY_ABOVE || subtotal === 0 ? 0 : DELIVERY_FLAT
  const total = subtotal + delivery

  const lines: OrderLine[] = useMemo(
    () =>
      items.map((it) => ({
        productId: it.productId,
        name: it.name,
        variantGrams: it.variantGrams,
        qty: it.qty,
        unitPrice: it.unitPrice,
        image: it.image,
      })),
    [items],
  )

  if (items.length === 0 && step !== 'success') {
    return <Navigate to="/cart" replace />
  }

  function sendOtp(e: FormEvent) {
    e.preventDefault()
    const n = normalizePhone(phone)
    if (n.length < 10) return
    setStep('otp')
    setOtpError(null)
  }

  function verifyOtp(e: FormEvent) {
    e.preventDefault()
    if (otp.trim() === MOCK_OTP) {
      setVerifiedPhone(phone)
      setOtpError(null)
      setStep('address')
    } else {
      setOtpError('Invalid OTP. Try 1234 for this demo.')
    }
  }

  function placeOrder(e: FormEvent) {
    e.preventDefault()
    const n = normalizePhone(phone)
    addOrder({
      customerName: address.name,
      phone: n,
      address,
      items: lines,
      subtotal,
      delivery,
      total,
    })
    setVerifiedPhone(phone)
    clear()
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="border-b border-white/40 py-24">
        <div className="container-app max-w-xl text-center">
          <div className="mx-auto max-w-lg rounded-3xl border border-white/55 bg-white/40 p-10 text-center shadow-xl backdrop-blur-2xl">
          <h1 className="font-serif text-4xl text-forest">Order Placed! 🎉</h1>
          <p className="mt-4 text-forest/75">
            You&apos;ll receive a WhatsApp confirmation shortly.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/track" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-page hover:bg-brand-dark">
              Track order
            </Link>
            <Link
              to="/shop"
              className="rounded-full border border-white/55 bg-white/30 px-6 py-3 text-sm font-semibold text-forest backdrop-blur-md hover:border-brand/40"
            >
              Keep shopping
            </Link>
          </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b border-white/40 py-16 sm:py-20">
      <div className="container-app grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <FadeInSection>
            <h1 className="font-serif text-4xl text-forest">Checkout</h1>
            <p className="mt-2 text-sm text-forest/60">Demo OTP: {MOCK_OTP}</p>
          </FadeInSection>

          {step === 'phone' ? (
            <form onSubmit={sendOtp} className="mt-10 max-w-md space-y-6">
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Phone number
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:ring-2 focus:ring-brand/30"
                  placeholder="10-digit mobile"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-page hover:bg-brand-dark"
              >
                Send OTP on WhatsApp
              </button>
            </form>
          ) : null}

          {step === 'otp' ? (
            <form onSubmit={verifyOtp} className="mt-10 max-w-md space-y-6">
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Enter OTP
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:ring-2 focus:ring-brand/30"
                  inputMode="numeric"
                  required
                />
              </label>
              {otpError ? <p className="text-sm text-red-700">{otpError}</p> : null}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-full border border-white/55 bg-white/30 py-3 text-sm font-semibold text-forest backdrop-blur-md hover:border-brand/40"
                  onClick={() => setStep('phone')}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-brand py-3 text-sm font-semibold text-page hover:bg-brand-dark"
                >
                  Verify &amp; Continue
                </button>
              </div>
            </form>
          ) : null}

          {step === 'address' ? (
            <form onSubmit={placeOrder} className="mt-10 max-w-xl space-y-5">
              {(
                [
                  ['name', 'Full name', 'text'],
                  ['line1', 'Address line 1', 'text'],
                  ['city', 'City', 'text'],
                  ['pincode', 'Pincode', 'text'],
                  ['state', 'State', 'text'],
                ] as const
              ).map(([key, label, type]) => (
                <label key={key} className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  {label}
                  <input
                    type={type}
                    value={address[key]}
                    onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-4 py-3 text-sm text-forest outline-none backdrop-blur-sm focus:ring-2 focus:ring-brand/30"
                    required
                  />
                </label>
              ))}
              <button
                type="submit"
                className="w-full rounded-full bg-brand py-4 text-sm font-semibold text-page hover:bg-brand-dark"
              >
                Place Order
              </button>
            </form>
          ) : null}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-24 rounded-3xl border border-white/55 bg-white/40 p-8 shadow-lg backdrop-blur-2xl">
            <h2 className="font-serif text-2xl text-forest">Order summary</h2>
            <ul className="mt-6 space-y-3 text-sm text-forest/80">
              {items.map((it) => (
                <li key={`${it.productId}:${it.variantGrams}`} className="flex justify-between gap-4">
                  <span>
                    {it.name} · {it.variantGrams}g × {it.qty}
                  </span>
                  <span className="shrink-0 font-medium text-forest">{formatINR(it.unitPrice * it.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-white/50 pt-4 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd className="font-medium">{delivery === 0 ? 'Free' : formatINR(delivery)}</dd>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold text-forest">
                <dt>Total</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
