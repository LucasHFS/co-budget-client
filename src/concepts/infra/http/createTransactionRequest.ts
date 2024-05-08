import { NewTransaction } from "@/concepts/transactions/domain/Transaction";
import { api } from "@/lib/http/api";

export const createTransactionRequest = async (transaction: NewTransaction) => {
  return api.post("/transactions", {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}
