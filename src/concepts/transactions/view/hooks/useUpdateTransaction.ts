import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../domain/Transaction";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/concepts/utils/date";
import { updateTransactionRequest } from "@/concepts/infra/http/updateTransactionRequest";
import { toastError } from "@/concepts/utils/toastify";

export const useUpdateTransaction = ({onSuccess}: any) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (transaction: Transaction) => updateTransactionRequest(transaction),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao atualizar transaçãox'
      toastError(errorMsg)
    }
  })

  return {
    updateTransaction: mutate,
    isLoading: isPending,
  }
}
