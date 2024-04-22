export type Transaction = {
  id: number
  name: string
  status: string
  kind: string
  price: number
  transactionType: string
  dueAt: string
}

export type NewTransaction = {
  name: string
  kind: string
  price: number
  transactionType: string
  dueAt: string
  installmentNumber: number
  budgetId: number
}
