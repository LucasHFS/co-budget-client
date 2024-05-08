import { useContext } from "react";
import { BudgetContext } from "../store/BudgetProvider";

export const useBudget = () => {
  const value = useContext(BudgetContext);

  if (!value) {
    throw new Error(
      "Cannot call useBudget without having an BudgetContext higher up in the tree!"
    );
  }

  const {
    selectedBudgetId,
    setSelectedBudgetId,
  } = value;

  return {
    selectedBudgetId,
    setSelectedBudgetId,
  };
};
