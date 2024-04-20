import fetchBudgetsRequest from "@/modules/infra/http/fetchBudgetsRequest"
import { formatedErrorsArray } from "@/modules/utils/request"
import { useQuery } from "@tanstack/react-query"

const useFetchBudgets = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => fetchBudgetsRequest(),
  })

  // useEffect(() => {
  //   if (error) {
  //     console.log(error)
  //   }
  // }, [error])

  return {
    budgets: data?.data?.budgets || [],
    isLoading,
    errors: formatedErrorsArray(error),
  }
}

export default useFetchBudgets;
