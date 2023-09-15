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
    createBudget,
    updateBudget,
    deleteBudget,
    budgets,
    setBudgets,
    selectedBudgetId,
    setselectedBudgetId,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createBudget,
    updateBudget,
    deleteBudget,
    budgets,
    setBudgets,
    selectedBudgetId,
    setselectedBudgetId,
    isLoading,
    errors,
    setErrors,
  };
};
