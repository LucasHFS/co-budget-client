import { createTransactionRequest } from "@/modules/infra/http/createTransactionRequest";
import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewTransaction } from "../../domain/Transaction";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";
import { toastError } from "@/modules/utils/toastify";

export const useCreateTransaction = ({onSuccess}: any) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (newTransaction: NewTransaction) => createTransactionRequest({...newTransaction, budgetId: selectedBudgetId}),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao criar orçamento'
      toastError(errorMsg)
    }
  })

  return {
    createTransaction: mutate,
    isLoading: isPending,
  }
}
