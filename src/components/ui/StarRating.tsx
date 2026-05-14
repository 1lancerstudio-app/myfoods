import { Star } from 'lucide-react'

export function StarRating({ value, size = 18 }: { value: number; size?: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span className="inline-flex items-center gap-0.5 text-brand" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half)
        return (
          <Star
            key={i}
            size={size}
            className={filled ? 'fill-brand text-brand' : 'text-brand/25'}
            strokeWidth={1.25}
          />
        )
      })}
    </span>
  )
}
