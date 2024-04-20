import { api } from "../services/apiClient";

type DeleteTransactionParams = {
  id: number,
  targetTransactions: 'one' | 'this_and_next' | 'all'
}

const deleteTransactionRequest = async ({ id, targetTransactions }: DeleteTransactionParams) => {
  return api.delete(`/transactions/${id}?targetTransactions=${targetTransactions}`);
}

export default deleteTransactionRequest;
