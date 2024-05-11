import { api } from "@/lib/http/api";
import { NewTransaction } from "../domain/Transaction";

export const createTransactionRequest = async (transaction: NewTransaction) => {
  return api.post("/transactions", {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}
