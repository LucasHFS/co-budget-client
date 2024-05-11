import { useBudget } from "../../../../Budget/hooks/useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../../domain/Transaction";
import { useTransaction } from "../../../hooks/useTransaction";
import { formatDate } from "@/concepts/utils/date";
import { toastError } from "@/concepts/utils/toastify";
import { updateTransactionRequest } from "@/concepts/Transaction/repository/updateTransactionRequest";

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
      // @ts-ignore
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao atualizar transaçãox'
      toastError(errorMsg)
    }
  })

  return {
    updateTransaction: mutate,
    isLoading: isPending,
  }
}
