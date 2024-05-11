import { api } from "@/lib/http/api";

type FetchTransactionsParams = {
  budgetId: number;
  selectedMonthDate: Date;
}

export const fetchTransactionsRequest = async (params: FetchTransactionsParams) => {
  return api.get("/transactions", { params })
}

