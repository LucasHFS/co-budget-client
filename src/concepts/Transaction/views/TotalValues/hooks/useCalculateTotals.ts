import { Transaction } from "@sentry/nextjs/types/client"

export const useCalculateTotals = ({transactions}: { transactions: Transaction[]}) => {
  const calculateTotal = (transactionType: 'expense'|'income') => {
    return transactions.reduce((acc, transaction) => {
      // @ts-ignore
      if(transaction.transactionType === transactionType){
        // @ts-ignore
        return acc + transaction.price
      } else {
        return acc
      }
    },0)
  }

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      if(transaction.status === 'pago'){
          // @ts-ignore
          const value = transaction.transactionType === 'income' ? transaction.price : -transaction.price
          return acc + value
        } else {
          return acc
        }
      },0)
  }

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
