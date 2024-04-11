import { useState } from "react";
import { Budget } from "../../domain/Budget";
import { useBudget } from "./useBudget";
import createBudgetRequest from "@/modules/infra/http/createBudgetRequest";

export const useCreateBudget = () => {
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setBudgets }= useBudget()

  const createBudget = async ({ name }: Budget) =>  {
      try {
          setisLoading(true);

          const response = await createBudgetRequest({ name });

          if (response.status === 201) {
            const budget = response.data.budget

            setBudgets((prevBudgets: Budget[]) => [
              ...prevBudgets,
              {
                id: budget.id,
                name: budget.name,
              }
            ]);
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        } finally {
          setisLoading(false);
        }
    }

  return {
    createBudget,
    isLoading,
    errors,
  }
}
