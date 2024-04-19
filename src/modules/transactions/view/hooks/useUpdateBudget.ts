import { useState } from "react";
import { Budget } from "../../domain/Budget";
import { useBudget } from "./useBudget";
import updateBudgetRequest from "@/modules/infra/http/updateBudgetRequest";

export const useUpdateBudget = () => {
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setBudgets }= useBudget()

  const updateBudget = async ({ id, name }: Budget) =>  {
      try {
          setisLoading(true);

          const response = await updateBudgetRequest({ id, name });

          if (response.status === 200) {
            const budget = response.data.budget

            setBudgets((prevBudgets: Budget[]) => {
              return prevBudgets.map((budg)=>{
                if(budg.id === budget.id){
                  return {
                    id: budget.id,
                    name: budget.name,
                  }
                } else {
                  return budg;
                }
              })
            });
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
    updateBudget,
    isLoading,
    errors,
  }
}
