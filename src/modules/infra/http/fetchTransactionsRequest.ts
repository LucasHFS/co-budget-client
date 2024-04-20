import { api } from "../services/apiClient";

type FetchTransactionsParams = {
  budgetId: number;
  selectedMonthDate: Date;
}

const fetchTransactionsRequest = async (params: FetchTransactionsParams) => {
  return api.get("/transactions", { params })
}

export default fetchTransactionsRequest;
