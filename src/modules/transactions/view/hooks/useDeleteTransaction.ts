

import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";
import { deleteTransactionRequest } from "@/modules/infra/http/deleteTransactionRequest";
import { toastError } from "@/modules/utils/toastify";

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
