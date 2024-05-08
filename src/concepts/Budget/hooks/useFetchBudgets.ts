import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { toastError } from "@/concepts/utils/toastify";
import { fetchBudgetsRequest } from "../repository/fetchBudgetsRequest";

export const useFetchBudgets = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => fetchBudgetsRequest(),
  })

  useEffect(() => {
    if (error) {
      toastError('Falha ao carregar orçamentos.')
    }
  }, [error])

  return {
    budgets: data?.data?.budgets || [],
    isLoading: isFetching,
  }
}
