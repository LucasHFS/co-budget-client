import { Transaction } from "@/modules/transactions/domain/Transaction";
import { api } from "../services/apiClient";

const updateTransactionRequest = async (transaction: Transaction) => {
  return api.put(`/transactions/${transaction.id}`, {
    transaction: { ...transaction, price: Number(transaction.price)}
  });
}

export default updateTransactionRequest;
