import type { Review } from '@/types'

export const SEED_REVIEWS: Review[] = [
  {
    id: 'seed-r1',
    productId: 'p-muesli',
    authorName: 'Ananya K.',
    rating: 5,
    text: 'Crisp, not too sweet, and genuinely filling. Our whole family switched from boxed cereal.',
    hidden: false,
  },
  {
    id: 'seed-r2',
    productId: 'p-granola',
    authorName: 'Rahul M.',
    rating: 5,
    text: 'The jaggery note is subtle and sophisticated. Great on Greek yogurt.',
    hidden: false,
  },
  {
    id: 'seed-r3',
    productId: 'p-honey',
    authorName: 'Priya S.',
    rating: 5,
    text: 'Tastes like real honey — the seed mix adds texture without feeling heavy.',
    hidden: false,
  },
]
