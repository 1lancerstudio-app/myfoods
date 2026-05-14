export const LS_KEYS = {
  cart: 'myfoods_cart_v1',
  products: 'myfoods_products_v1',
  orders: 'myfoods_orders_v1',
  reviews: 'myfoods_reviews_v1',
  auth: 'myfoods_auth_v1',
  admin: 'myfoods_admin_session_v1',
} as const

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, '')
  if (digits.length >= 10) return digits.slice(-10)
  return digits
}

export function formatINR(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export const MOCK_OTP = '1234'

/** Demo-only. Never ship real admin auth like this. */
export const ADMIN_DEMO = {
  email: 'admin@myfoods.com',
  password: 'myfoodsadmin',
} as const

export const DELIVERY_FLAT = 49
export const FREE_DELIVERY_ABOVE = 499
