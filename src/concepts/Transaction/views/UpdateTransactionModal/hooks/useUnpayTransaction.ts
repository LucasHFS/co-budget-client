import { api } from "@/lib/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useBudget } from "../../../../Budget/hooks/useBudget";
import { useTransaction } from "../../../hooks/useTransaction";
import { formatDate } from "@/concepts/utils/date";
import { toastError } from "@/concepts/utils/toastify";

export const useUnpayTransaction = ({onSuccess}: {onSuccess:any}) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate, } = useMutation({
    mutationFn: (id:number) => {
      return api.put(`/transactions/${id}/unpay`, {});
    },
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao remover pagamento'
      toastError(errorMsg)
    }
  })

  return {
    unPayTransaction: mutate,
  }
}
