export type ProductCategory = 'muesli' | 'granola' | 'honey'

export type OrderStatus = 'order_received' | 'packed' | 'shipped' | 'delivered'

export interface ProductVariant {
  grams: 250 | 500
  price: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  tagline: string
  description: string
  ingredients: string[]
  nutrition: { label: string; value: string }[]
  images: string[]
  variants: ProductVariant[]
  rating: number
  stock: number
}

export interface CartItem {
  productId: string
  variantGrams: 250 | 500
  qty: number
  unitPrice: number
  name: string
  image: string
}

export interface Address {
  name: string
  line1: string
  city: string
  pincode: string
  state: string
}

export interface OrderLine {
  productId: string
  name: string
  variantGrams: 250 | 500
  qty: number
  unitPrice: number
  image: string
}

export interface Order {
  id: string
  createdAt: string
  customerName: string
  phone: string
  address: Address
  items: OrderLine[]
  subtotal: number
  delivery: number
  total: number
  status: OrderStatus
}

export interface Review {
  id: string
  productId: string
  authorName: string
  rating: number
  text: string
  hidden: boolean
  orderId?: string
}
