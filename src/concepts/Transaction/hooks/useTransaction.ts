import { useContext } from "react";
import { TransactionContext } from "../store/TransactionProvider";

export const useTransaction = () => {
  const value = useContext(TransactionContext);

  if (!value) {
    throw new Error(
      "Cannot call useTransaction without having an TransactionContext higher up in the tree!"
    );
  }

  const {
    selectedMonthDate,
    setSelectedMonthDate,
  } = value;

  return {
    selectedMonthDate,
    setSelectedMonthDate,
  };
};
