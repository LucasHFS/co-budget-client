

import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatedErrorsArray } from "@/modules/utils/request";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";
import deleteTransactionRequest from "@/modules/infra/http/deleteTransactionRequest";

type DeleteTransactionParams = {
  id: number,
  targetTransactions: 'one' | 'this_and_next' | 'all'
}

const useDeleteTransaction = ({onSuccess}: any) => {
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
      alert(formatedErrorsArray(error))
    }
  })

  return {
    deleteTransaction: mutate,
  }
}

export default useDeleteTransaction;
