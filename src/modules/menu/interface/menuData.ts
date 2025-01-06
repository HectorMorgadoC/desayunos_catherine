export interface DataMenu {
  balance: number
  product: Product[]
  payment_method: PaymentMethod[]
}

export interface Product {
  id: string
  description: string
  value: number
}

export interface PaymentMethod {
  id: string
  description: string
}

export interface MenuError {
  message: string
  status: number
}
