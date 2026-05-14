import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Review } from '@/types'
import { SEED_REVIEWS } from '@/data/seedReviews'
import { LS_KEYS, readJson, writeJson } from '@/lib/storage'

function newReviewId() {
  return `rv-${Math.random().toString(36).slice(2, 10)}`
}

type ReviewsContextValue = {
  reviews: Review[]
  visibleForProduct: (productId: string) => Review[]
  addReview: (input: Omit<Review, 'id' | 'hidden'> & { hidden?: boolean }) => void
  setHidden: (id: string, hidden: boolean) => void
  removeReview: (id: string) => void
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null)

function mergeSeed(stored: Review[]) {
  const ids = new Set(stored.map((r) => r.id))
  const merged = [...stored]
  for (const s of SEED_REVIEWS) {
    if (!ids.has(s.id)) merged.push(s)
  }
  return merged
}

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = readJson<Review[]>(LS_KEYS.reviews, [])
    return stored.length ? mergeSeed(stored) : SEED_REVIEWS
  })

  useEffect(() => {
    writeJson(LS_KEYS.reviews, reviews)
  }, [reviews])

  const visibleForProduct = useCallback(
    (productId: string) =>
      reviews.filter((r) => r.productId === productId && !r.hidden),
    [reviews],
  )

  const addReview = useCallback((input: Omit<Review, 'id' | 'hidden'> & { hidden?: boolean }) => {
    const row: Review = {
      ...input,
      id: newReviewId(),
      hidden: input.hidden ?? false,
    }
    setReviews((prev) => [row, ...prev])
  }, [])

  const setHidden = useCallback((id: string, hidden: boolean) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, hidden } : r)))
  }, [])

  const removeReview = useCallback((id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const value = useMemo(
    () => ({ reviews, visibleForProduct, addReview, setHidden, removeReview }),
    [reviews, visibleForProduct, addReview, setHidden, removeReview],
  )

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

export function useReviews() {
  const ctx = useContext(ReviewsContext)
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider')
  return ctx
}
