import { useContext } from "react";
import { TransactionContext } from "../components/TransactionProvider";

export const useTransaction = () => {
  const value = useContext(TransactionContext);

  if (!value) {
    throw new Error(
      "Cannot call useTransaction without having an TransactionContext higher up in the tree!"
    );
  }

  const {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    transactions,
    setTransactions,
    refetchTransactions,
    selectedMonthDate,
    setSelectedMonthDate,
    payTransaction,
    unpayTransaction,
    calculateBalance,
    calculateTotal,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    transactions,
    setTransactions,
    refetchTransactions,
    selectedMonthDate,
    setSelectedMonthDate,
    payTransaction,
    unpayTransaction,
    calculateBalance,
    calculateTotal,
    isLoading,
    errors,
    setErrors,
  };
};
