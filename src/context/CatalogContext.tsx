import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '@/types'
import { SEED_PRODUCTS } from '@/data/seedProducts'
import { LS_KEYS, readJson, writeJson } from '@/lib/storage'

type CatalogContextValue = {
  products: Product[]
  getBySlug: (slug: string) => Product | undefined
  getById: (id: string) => Product | undefined
  upsertProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  replaceAll: (products: Product[]) => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = readJson<Product[] | null>(LS_KEYS.products, null)
    return stored && stored.length ? stored : SEED_PRODUCTS
  })

  useEffect(() => {
    writeJson(LS_KEYS.products, products)
  }, [products])

  const getBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products],
  )

  const getById = useCallback((id: string) => products.find((p) => p.id === id), [products])

  const upsertProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id)
      if (idx === -1) return [...prev, product]
      const next = [...prev]
      next[idx] = product
      return next
    })
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const replaceAll = useCallback((next: Product[]) => {
    setProducts(next.length ? next : SEED_PRODUCTS)
  }, [])

  const value = useMemo(
    () => ({
      products,
      getBySlug,
      getById,
      upsertProduct,
      deleteProduct,
      replaceAll,
    }),
    [products, getBySlug, getById, upsertProduct, deleteProduct, replaceAll],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
