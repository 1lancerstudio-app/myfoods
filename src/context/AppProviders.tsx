import type { ReactNode } from 'react'
import { AdminAuthProvider } from '@/context/AdminAuthContext'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { CatalogProvider } from '@/context/CatalogContext'
import { OrdersProvider } from '@/context/OrdersContext'
import { ReviewsProvider } from '@/context/ReviewsContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <CatalogProvider>
          <OrdersProvider>
            <ReviewsProvider>
              <CartProvider>{children}</CartProvider>
            </ReviewsProvider>
          </OrdersProvider>
        </CatalogProvider>
      </AuthProvider>
    </AdminAuthProvider>
  )
}
