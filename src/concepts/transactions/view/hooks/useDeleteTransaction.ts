

import { useBudget } from "../../../Budget/hooks/useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/concepts/utils/date";
import { deleteTransactionRequest } from "@/concepts/infra/http/deleteTransactionRequest";
import { toastError } from "@/concepts/utils/toastify";

type DeleteTransactionParams = {
  id: number,
  targetTransactions: 'one' | 'this_and_next' | 'all'
}

export const useDeleteTransaction = ({onSuccess}: any) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (params : DeleteTransactionParams) => deleteTransactionRequest(params),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao remover orçamento'
      toastError(errorMsg)
    }
  })

  return {
    deleteTransaction: mutate,
  }
}
