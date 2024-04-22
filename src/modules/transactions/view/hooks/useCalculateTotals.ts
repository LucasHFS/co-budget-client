import { Transaction } from "@sentry/nextjs/types/client"
import { useCallback } from "react"

export const useCalculateTotals = ({transactions}: { transactions: Transaction[]}) => {
  const calculateTotal = useCallback((transactionType: 'expense'|'income') =>
    transactions.reduce((acc, transaction) => {
        if(transaction.transactionType === transactionType){
          return acc + transaction.price
        } else {
          return acc
        }
      },0)
    ,[transactions]
  )

  const calculateBalance = useCallback(() =>
    transactions.reduce((acc, transaction) => {
      if(transaction.status === 'pago'){
          const value = transaction.transactionType === 'income' ? transaction.price : -transaction.price
          return acc + value
        } else {
          return acc
        }
      },0)
    ,[transactions])


  return {
    calculateTotal,
    calculateBalance,
  }
}
