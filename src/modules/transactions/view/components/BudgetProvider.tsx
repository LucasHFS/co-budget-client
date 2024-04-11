import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { formatedErrorsArray } from "@/modules/utils/request";
import { Budget } from "@/modules/transactions/domain/Budget";
import { useAuth } from "@/modules/auth";
import fetchBudgetsRequest from "@/modules/infra/http/fetchBudgetsRequest";

type BudgetProviderValue = {
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

  const fetchBudgets = () => {
    setisLoading(true);
    fetchBudgetsRequest()
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
  }


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

  useEffect(() => {
    if(isAuthenticated){
      fetchBudgets()
    }

    return () => setErrors([]);
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      budgets,
      setBudgets,
      selectedBudgetId,
      setSelectedBudgetId,
      isLoading,
      errors,
      setErrors,
    }),
    [
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
