import createBudgetRequest from "@/modules/infra/http/createBudgetRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatedErrorsArray } from "@/modules/utils/request";

export const useCreateBudget = ({ onSuccess }: { onSuccess: any}) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({name}: { name:string }) => createBudgetRequest({ name }),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      alert(formatedErrorsArray(error))
    }
  })

  return {
    createBudget: mutate,
    isLoading: isPending,
    errors: formatedErrorsArray(error),
  }
}
