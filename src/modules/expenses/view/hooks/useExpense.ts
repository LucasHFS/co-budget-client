import { useContext } from "react";
import { ExpenseContext } from "../components/ExpenseProvider";

export const useExpense = () => {
  const value = useContext(ExpenseContext);

  if (!value) {
    throw new Error(
      "Cannot call useExpense without having an ExpenseContext higher up in the tree!"
    );
  }

  const {
    createExpense,
    updateExpense,
    deleteExpense,
    expenses,
    setExpenses,
    refetchExpenses,
    selectedMonthDate,
    setSelectedMonthDate,
    payExpense,
    unpayExpense,
    calculateTotalPayable,
    calculateBalanceToPay,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createExpense,
    updateExpense,
    deleteExpense,
    expenses,
    setExpenses,
    refetchExpenses,
    selectedMonthDate,
    setSelectedMonthDate,
    payExpense,
    unpayExpense,
    calculateTotalPayable,
    calculateBalanceToPay,
    isLoading,
    errors,
    setErrors,
  };
};
