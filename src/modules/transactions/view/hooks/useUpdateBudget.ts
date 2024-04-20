import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateBudgetRequest from "@/modules/infra/http/updateBudgetRequest";
import { Budget } from "../../domain/Budget";
import { toastError } from "@/modules/utils/toastify";

const useUpdateBudget = ({onSuccess}: any) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, } = useMutation({
    mutationFn: (budget: Budget) => updateBudgetRequest(budget),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao atualizar orçamento'
      toastError(errorMsg)
    }
  })

  return {
    updateBudget: mutate,
    isLoading: isPending,
  }
}

export default useUpdateBudget;
