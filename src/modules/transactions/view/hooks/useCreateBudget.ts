import { createBudgetRequest } from "@/modules/infra/http/createBudgetRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError } from "@/modules/utils/toastify";

export const useCreateBudget = ({ onSuccess }: { onSuccess: any}) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: ({name}: { name:string }) => createBudgetRequest({ name }),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.error?.details.join('. ') || 'Erro ao criar orçamento'
      toastError(errorMsg)
    }
  })

  return {
    createBudget: mutate,
    isLoading: isPending,
  }
}
