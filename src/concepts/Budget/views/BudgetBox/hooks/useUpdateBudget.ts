import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Budget } from "../../../domain/Budget";
import { updateBudgetRequest } from "../../../repository/updateBudgetRequest";
import { toastError } from "@/concepts/utils/toastify";

export const useUpdateBudget = ({onSuccess}: any) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, } = useMutation({
    mutationFn: (budget: Budget) => updateBudgetRequest(budget),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      // @ts-ignore
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao atualizar orçamento'
      toastError(errorMsg)
    }
  })

  return {
    updateBudget: mutate,
    isLoading: isPending,
  }
}
