import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatedErrorsArray } from "@/modules/utils/request";
import deleteBudgetRequest from "@/modules/infra/http/deleteBudgetRequest";

const useDeleteBudget = ({onSuccess}: any) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteBudgetRequest(id),
    onSuccess: () => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
    onError: (error) => {
      alert(formatedErrorsArray(error))
    }
  })

  return {
    deleteBudget: mutate,
  }
}

export default useDeleteBudget;
