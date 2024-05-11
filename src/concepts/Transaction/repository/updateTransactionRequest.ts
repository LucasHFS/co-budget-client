import { api } from "@/lib/http/api";
import { Transaction } from "../domain/Transaction";

export const updateTransactionRequest = async (transaction: Transaction) => {
  return api.put(`/transactions/${transaction.id}`, {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}
