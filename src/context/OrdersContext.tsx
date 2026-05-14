import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Order, OrderStatus } from '@/types'
import { LS_KEYS, normalizePhone, readJson, writeJson } from '@/lib/storage'

function newOrderId() {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `MF-${part}`
}

type OrdersContextValue = {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: OrderStatus }) => Order
  updateStatus: (orderId: string, status: OrderStatus) => void
  getByPhone: (phone: string) => Order[]
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => readJson<Order[]>(LS_KEYS.orders, []))

  useEffect(() => {
    writeJson(LS_KEYS.orders, orders)
  }, [orders])

  const addOrder = useCallback(
    (
      order: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: OrderStatus },
    ): Order => {
      const full: Order = {
        ...order,
        id: newOrderId(),
        createdAt: new Date().toISOString(),
        status: order.status ?? 'order_received',
      }
      setOrders((prev) => [full, ...prev])
      return full
    },
    [],
  )

  const updateStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
  }, [])

  const getByPhone = useCallback(
    (phone: string) => {
      const n = normalizePhone(phone)
      if (!n) return []
      return orders.filter((o) => normalizePhone(o.phone) === n)
    },
    [orders],
  )

  const value = useMemo(
    () => ({ orders, addOrder, updateStatus, getByPhone }),
    [orders, addOrder, updateStatus, getByPhone],
  )

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider')
  return ctx
}
