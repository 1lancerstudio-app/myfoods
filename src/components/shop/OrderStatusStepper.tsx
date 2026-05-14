import type { OrderStatus } from '@/types'
import { ORDER_FLOW, statusStepIndex } from '@/lib/orderStatus'

export function OrderStatusStepper({ status }: { status: OrderStatus }) {
  const current = statusStepIndex(status)

  return (
    <div className="mt-6">
      <ol className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
        {ORDER_FLOW.map((step, i) => {
          const done = i <= current
          return (
            <li key={step.status} className="flex flex-1 flex-col items-center text-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                  done ? 'bg-brand text-page' : 'border border-white/50 bg-white/25 text-forest/40 backdrop-blur-md'
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`mt-2 text-[11px] font-semibold uppercase tracking-wide ${
                  done ? 'text-brand' : 'text-forest/45'
                }`}
              >
                {step.label}
              </span>
              {i < ORDER_FLOW.length - 1 ? (
                <div
                  className={`mt-2 hidden h-0.5 w-full max-w-[80px] sm:mt-6 sm:block ${
                    i < current ? 'bg-brand' : 'bg-brand/15'
                  }`}
                  aria-hidden
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
