import { Transaction } from "@sentry/nextjs/types/client"
import { useCallback } from "react"

export const useCalculateTotals = ({transactions}: { transactions: Transaction[]}) => {
  const calculateTotal = useCallback((transactionType: 'expense'|'income') =>
    transactions.reduce((acc, transaction) => {
        // @ts-ignore
        if(transaction.transactionType === transactionType){
          // @ts-ignore
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
          // @ts-ignore
          const value = transaction.transactionType === 'income' ? transaction.price : -transaction.price
          return acc + value
        } else {
          return acc
        }
      },0)
    ,[transactions])

    const calculateLastingExpenses = () => {
      return transactions.reduce((acc, transaction) => {
          // @ts-ignore
          if(transaction.transactionType === 'expense' && transaction.status !== 'pago'){
          // @ts-ignore
            return acc + transaction.price
          } else {
            return acc
          }
        },0)
    }

  return {
    calculateTotal,
    calculateBalance,
    calculateLastingExpenses,
  }
}
