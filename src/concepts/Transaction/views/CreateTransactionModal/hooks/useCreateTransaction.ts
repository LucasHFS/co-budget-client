import { useBudget } from "../../../../Budget/hooks/useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewTransaction } from "../../../domain/Transaction";
import { useTransaction } from "../../../hooks/useTransaction";
import { formatDate } from "@/concepts/utils/date";
import { toastError } from "@/concepts/utils/toastify";
import { createTransactionRequest } from "@/concepts/Transaction/repository/createTransactionRequest";

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
      // @ts-ignore
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao criar orçamento'
      toastError(errorMsg)
    }
  })

  return {
    createTransaction: mutate,
    isLoading: isPending,
  }
}
