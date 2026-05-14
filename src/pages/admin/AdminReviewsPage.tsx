import { useReviews } from '@/context/ReviewsContext'
import { StarRating } from '@/components/ui/StarRating'

export function AdminReviewsPage() {
  const { reviews, setHidden } = useReviews()

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Reviews</h1>
      <p className="mt-2 text-sm text-forest/65">Hide reviews from the storefront without deleting them.</p>
      <div className="mt-8 space-y-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/55 bg-white/35 p-6 shadow-md backdrop-blur-2xl sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <StarRating value={r.rating} />
              <p className="mt-3 text-sm text-forest/80">“{r.text}”</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-forest/50">
                {r.authorName} · {r.productId}
                {r.hidden ? ' · Hidden' : ''}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="rounded-full border border-white/55 bg-white/30 px-4 py-2 text-xs font-semibold text-forest backdrop-blur-md hover:border-brand/40"
                onClick={() => setHidden(r.id, !r.hidden)}
              >
                {r.hidden ? 'Show' : 'Hide'}
              </button>
            </div>
          </article>
        ))}
        {reviews.length === 0 ? <p className="text-sm text-forest/65">No reviews.</p> : null}
      </div>
    </div>
  )
}
