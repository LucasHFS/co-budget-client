import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../domain/Transaction";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";
import updateTransactionRequest from "@/modules/infra/http/updateTransactionRequest";
import { toastError } from "@/modules/utils/toastify";

const useUpdateTransaction = ({onSuccess}: any) => {
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

export default useUpdateTransaction;
