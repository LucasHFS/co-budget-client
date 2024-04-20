import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatedErrorsArray } from "@/modules/utils/request";
import { Transaction } from "../../domain/Transaction";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";
import updateTransactionRequest from "@/modules/infra/http/updateTransactionRequest";

const useUpdateTransaction = ({onSuccess}: any) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (transaction: Transaction) => updateTransactionRequest(transaction),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      alert(formatedErrorsArray(error))
    }
  })

  return {
    updateTransaction: mutate,
  }
}

export default useUpdateTransaction;
