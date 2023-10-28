import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/modules/infra/services/apiClient";
import { formatedErrorsArray } from "@/modules/utils/request";
import { Budget } from "@/modules/transactions/domain/Budget";
import { useAuth } from "@/modules/auth";

type BudgetProviderValue = {
  createBudget: any
  updateBudget: any
  deleteBudget: any
  budgets: Budget[]
  setBudgets: any
  selectedBudgetId: any
  setSelectedBudgetId: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const BudgetContext = createContext<BudgetProviderValue | undefined>(
  undefined
);

type TransactionContextProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: TransactionContextProviderProps) => {
  const [budgets, setBudgets] = useState<Budget[]>([])
  //@ts-ignore
  const [selectedBudgetId, setSelectedBudgetId] = useState<Budget | undefined>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('selectedBudgetId');
      return storedValue;
    }
  })

  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    try {
      if(selectedBudgetId){
        //@ts-ignore
        localStorage.setItem('selectedBudgetId', selectedBudgetId);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedBudgetId]);

  const createBudget = useCallback(
    async ({ name }: Budget) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/budgets", {
            budget: {
              name,
            },
          });

          if (response.status === 201) {
            const budget = response.data.budget
            //@ts-ignore
            setBudgets(prevBudgets => [
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
        }
        setisLoading(false);
    }, [])

  const updateBudget = useCallback(
    async ({ id, name }: Budget) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/budgets/${id}`, {
            budget: {
              name,
            },
          });

          if (response.status === 200) {
            const budget = response.data.budget

            setBudgets(prevBudgets => {
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
  }, [])

  const deleteBudget = useCallback(
    async ({ id }: {id: number}) =>  {
      try {
          setisLoading(true);

          const response = await api.delete(`/budgets/${id}`);

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
  }, [budgets])


  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    api
      .get("/budgets")
      .then((response) => {
        setBudgets(response.data.budgets);
      })
      .catch((err) => {
          //@ts-ignore
        setErrors(formatedErrorsArray(err));
      })
      .finally(() => {
        setisLoading(false);
      });
    return () => setErrors([]);
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      createBudget,
      updateBudget,
      deleteBudget,
      budgets,
      setBudgets,
      selectedBudgetId,
      setSelectedBudgetId,
      isLoading,
      errors,
      setErrors,
    }),
    [
      createBudget,
      updateBudget,
      deleteBudget,
      budgets,
      setBudgets,
      selectedBudgetId,
      setSelectedBudgetId,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
