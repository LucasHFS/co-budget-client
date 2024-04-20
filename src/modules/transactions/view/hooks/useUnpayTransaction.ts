import { api } from "@/modules/infra/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useBudget } from "./useBudget";
import { useTransaction } from "./useTransaction";
import { formatedErrorsArray } from "@/modules/utils/request";
import { formatDate } from "@/modules/utils/date";

const useUnpayTransaction = ({onSuccess}: {onSuccess:any}) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (id:number) => {
      return api.put(`/transactions/${id}/unpay`, {});
    },
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      alert(formatedErrorsArray(error))
    }
  })

  return {
    unPayTransaction: mutate,
    isLoading: isPending,
    // errors,
  }
}

export default useUnpayTransaction;
