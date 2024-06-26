import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Budget } from "@/concepts/Budget/domain/Budget";

type BudgetProviderValue = {
  selectedBudgetId: number
  setSelectedBudgetId: (budgetId: number) => void
};

export const BudgetContext = createContext<BudgetProviderValue | undefined>(
  undefined
);

type TransactionContextProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: TransactionContextProviderProps) => {
  //@ts-ignore
  const [selectedBudgetId, setSelectedBudgetId] = useState<Budget | undefined>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('selectedBudgetId');
      return storedValue;
    }
  })

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


  const value = {
    selectedBudgetId,
    setSelectedBudgetId,
  }

  return (
    //@ts-ignore
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
