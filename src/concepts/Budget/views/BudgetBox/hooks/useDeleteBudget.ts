import { deleteBudgetRequest } from "@/concepts/Budget/repository/deleteBudgetRequest";
import { toastError } from "@/concepts/utils/toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBudget = ({onSuccess}: any) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteBudgetRequest(id),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      // @ts-ignore
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao remover orçamento'
      toastError(errorMsg)
    }
  })

  return {
    deleteBudget: mutate,
  }
}
