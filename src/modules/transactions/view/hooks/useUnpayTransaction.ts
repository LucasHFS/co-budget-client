import { api } from "@/modules/infra/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useBudget } from "./useBudget";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";
import { toastError } from "@/modules/utils/toastify";

const useUnpayTransaction = ({onSuccess}: {onSuccess:any}) => {
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

export default useUnpayTransaction;
