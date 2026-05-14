import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type Props = {
  children: ReactNode
  className?: string
}

export function FadeInSection({ children, className = '' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`motion-safe-transition transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
