import createTransactionRequest from "@/modules/infra/http/createTransactionRequest";
import { useBudget } from "./useBudget";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatedErrorsArray } from "@/modules/utils/request";
import { NewTransaction } from "../../domain/Transaction";
import { useTransaction } from "./useTransaction";
import { formatDate } from "@/modules/utils/date";

const useCreateTransaction = ({onSuccess}: any) => {
  const { selectedMonthDate } = useTransaction()
  const { selectedBudgetId } = useBudget()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (newTransaction: NewTransaction) => createTransactionRequest({...newTransaction, budgetId: selectedBudgetId}),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['transactions', selectedBudgetId, formatDate(selectedMonthDate)] })
    },
    onError: (error) => {
      alert(formatedErrorsArray(error))
    }
  })

  return {
    createTransaction: mutate,
  }
}

export default useCreateTransaction;
