import { Transaction } from "@/concepts/transactions/domain/Transaction";
import { api } from "@/lib/http/api";

export const updateTransactionRequest = async (transaction: Transaction) => {
  return api.put(`/transactions/${transaction.id}`, {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}
