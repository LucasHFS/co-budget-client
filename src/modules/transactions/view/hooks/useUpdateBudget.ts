import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatedErrorsArray } from "@/modules/utils/request";
import updateBudgetRequest from "@/modules/infra/http/updateBudgetRequest";
import { Budget } from "../../domain/Budget";

const useUpdateBudget = ({onSuccess}: any) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (budget: Budget) => updateBudgetRequest(budget),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      alert(formatedErrorsArray(error))
    }
  })

  return {
    updateBudget: mutate,
    isLoading: isPending,
    errors: formatedErrorsArray(error),
  }
}

export default useUpdateBudget;
