import { useContext } from "react";
import { BudgetContext } from "../components/BudgetProvider";

export const useBudget = () => {
  const value = useContext(BudgetContext);

  if (!value) {
    throw new Error(
      "Cannot call useBudget without having an BudgetContext higher up in the tree!"
    );
  }

  const {
    deleteBudget,
    budgets,
    setBudgets,
    selectedBudgetId,
    setSelectedBudgetId,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    deleteBudget,
    budgets,
    setBudgets,
    selectedBudgetId,
    setSelectedBudgetId,
    isLoading,
    errors,
    setErrors,
  };
};
