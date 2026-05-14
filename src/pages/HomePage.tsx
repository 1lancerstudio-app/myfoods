import { HomeHero } from '@/components/home/HomeHero'
import { HomeInstagramGrid } from '@/components/home/HomeInstagramGrid'
import { HomeNewsletter } from '@/components/home/HomeNewsletter'
import { HomeProductCarousel } from '@/components/home/HomeProductCarousel'
import { HomeReviews } from '@/components/home/HomeReviews'
import { HomeWhy } from '@/components/home/HomeWhy'

export function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeProductCarousel />
      <HomeWhy />
      <HomeReviews />
      <HomeInstagramGrid />
      <HomeNewsletter />
    </>
  )
}
