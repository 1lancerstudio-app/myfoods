import type { OrderStatus } from '@/types'

export const ORDER_FLOW: { status: OrderStatus; label: string }[] = [
  { status: 'order_received', label: 'Order Received' },
  { status: 'packed', label: 'Packed' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' },
]

export function statusStepIndex(status: OrderStatus) {
  return ORDER_FLOW.findIndex((s) => s.status === status)
}
