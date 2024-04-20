import fetchTransactionsRequest from "@/modules/infra/http/fetchTransactionsRequest"
import { useQuery } from "@tanstack/react-query"
import { useBudget } from "./useBudget"
import { useTransaction } from "./useTransaction"
import { formatDate } from "@/modules/utils/date"

const useFetchTransactions = () => {
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

  // useEffect(() => {
  //   if (error) {
  //     console.log(error)
  //   }
  // }, [error])

  return {
    transactions: data?.data?.transactions || [],
    isLoading,
    error,
  }
}

export default useFetchTransactions;
