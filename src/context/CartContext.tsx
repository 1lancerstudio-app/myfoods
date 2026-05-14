import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem } from '@/types'
import { LS_KEYS, readJson, writeJson } from '@/lib/storage'

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void
  setQty: (productId: string, variantGrams: 250 | 500, qty: number) => void
  increment: (productId: string, variantGrams: 250 | 500) => void
  decrement: (productId: string, variantGrams: 250 | 500) => void
  remove: (productId: string, variantGrams: 250 | 500) => void
  clear: () => void
  cartCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

function mergeKey(it: CartItem) {
  return `${it.productId}:${it.variantGrams}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readJson<CartItem[]>(LS_KEYS.cart, []))

  useEffect(() => {
    writeJson(LS_KEYS.cart, items)
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, 'qty'> & { qty?: number }) => {
    const qty = item.qty ?? 1
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.productId === item.productId && p.variantGrams === item.variantGrams,
      )
      if (idx === -1) return [...prev, { ...item, qty }]
      const next = [...prev]
      next[idx] = { ...next[idx], qty: next[idx].qty + qty }
      return next
    })
  }, [])

  const setQty = useCallback((productId: string, variantGrams: 250 | 500, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((p) => mergeKey(p) !== `${productId}:${variantGrams}`)
      return prev.map((p) =>
        p.productId === productId && p.variantGrams === variantGrams ? { ...p, qty } : p,
      )
    })
  }, [])

  const increment = useCallback((productId: string, variantGrams: 250 | 500) => {
    setItems((prev) =>
      prev.map((p) =>
        p.productId === productId && p.variantGrams === variantGrams ? { ...p, qty: p.qty + 1 } : p,
      ),
    )
  }, [])

  const decrement = useCallback((productId: string, variantGrams: 250 | 500) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.productId === productId && p.variantGrams === variantGrams
            ? { ...p, qty: p.qty - 1 }
            : p,
        )
        .filter((p) => p.qty > 0),
    )
  }, [])

  const remove = useCallback((productId: string, variantGrams: 250 | 500) => {
    setItems((prev) => prev.filter((p) => mergeKey(p) !== `${productId}:${variantGrams}`))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const cartCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.unitPrice * i.qty, 0), [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      setQty,
      increment,
      decrement,
      remove,
      clear,
      cartCount,
      subtotal,
    }),
    [items, addItem, setQty, increment, decrement, remove, clear, cartCount, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
