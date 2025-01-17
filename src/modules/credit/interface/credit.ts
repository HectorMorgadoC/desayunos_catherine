export interface Credit {

    id?: string
    date: string
    description_product: string
    quantity: number
    total_price: number
    creditor_name: string
    status?: boolean
  }

export interface CreditCancelled {

      id: string
      registration_date: string
      cancellation_date: string
      description_product: string
      total_price: number,
      creditor_name: string,
      payment_method: string
}
