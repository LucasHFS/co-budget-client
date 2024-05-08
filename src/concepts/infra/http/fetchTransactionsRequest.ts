import { api } from "../services/apiClient";

type FetchTransactionsParams = {
  budgetId: number;
  selectedMonthDate: Date;
}

export const fetchTransactionsRequest = async (params: FetchTransactionsParams) => {
  return api.get("/transactions", { params })
}

