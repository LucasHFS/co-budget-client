import { NewTransaction } from "@/modules/transactions/domain/Transaction";
import { api } from "../services/apiClient";

const createTransactionRequest = async (transaction: NewTransaction) => {
  return api.post("/transactions", {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}

export default createTransactionRequest;
