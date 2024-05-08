import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useBudget } from "./useBudget";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/concepts/utils/date";
import { toastError } from "@/concepts/utils/toastify";
import { api } from "@/lib/http/api";

export const usePayTransaction = ({onSuccess}: {onSuccess:any}) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate, } = useMutation({
    mutationFn: (id:number) => {
      return api.put(`/transactions/${id}/pay`, {});
    },
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao atualizar pagar'
      toastError(errorMsg)
    }
  })

  return {
    payTransaction: mutate,
  }
}
