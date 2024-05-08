import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudgetRequest } from "@/concepts/infra/http/deleteBudgetRequest";
import { toastError } from "@/concepts/utils/toastify";

export const useDeleteBudget = ({onSuccess}: any) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteBudgetRequest(id),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao remover orçamento'
      toastError(errorMsg)
    }
  })

  return {
    deleteBudget: mutate,
  }
}
