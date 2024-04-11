import { useState } from "react";
import { useBudget } from "./useBudget";
import deleteBudgetRequest from "@/modules/infra/http/deleteBudgetRequest";

export const useDeleteBudget = () => {
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { budgets, setBudgets }= useBudget()

  const deleteBudget = async ({ id }: {id: number}) =>  {
    try {
      setisLoading(true);

      const response = await deleteBudgetRequest(id);

      if (response.status === 204) {
        const budgetsWithoutDeleted = budgets.filter((budget)=> id !== budget.id)
        setBudgets(budgetsWithoutDeleted)

        return true
      }
    } catch (err) {
      //@ts-ignore
      setErrors(formatedErrorsArray(err));
      return false
    }

      setisLoading(false);
    }

  return {
    deleteBudget,
    isLoading,
    errors,
  }
}
