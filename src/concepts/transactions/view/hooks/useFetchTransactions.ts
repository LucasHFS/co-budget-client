import { fetchTransactionsRequest } from "@/concepts/infra/http/fetchTransactionsRequest"
import { useQuery } from "@tanstack/react-query"
import { useBudget } from "./useBudget"
import { useTransaction } from "./useTransaction"
import { formatDate } from "@/concepts/utils/date"
import { toastError } from "@/concepts/utils/toastify"
import { useEffect } from "react"

export const useFetchTransactions = () => {
  const { selectedBudgetId } = useBudget()
  const { selectedMonthDate } = useTransaction()

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)],
    queryFn: () => {

      return fetchTransactionsRequest({
        budgetId: selectedBudgetId,
        selectedMonthDate: formatDate(selectedMonthDate)}
      )
    },
  })

  useEffect(() => {
    if (error) {
      toastError('Falha ao carregar transaçoes.')
    }
  }, [error])

  return {
    transactions: data?.data?.transactions || [],
    isLoading,
    error,
  }
}
