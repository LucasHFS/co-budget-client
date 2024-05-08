import { Transaction } from "@/concepts/transactions/domain/Transaction";
import { api } from "../services/apiClient";

export const updateTransactionRequest = async (transaction: Transaction) => {
  return api.put(`/transactions/${transaction.id}`, {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}
