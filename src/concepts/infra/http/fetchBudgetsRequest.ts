import { api } from "../services/apiClient";

export const fetchBudgetsRequest = async () => {
  return api.get(`/budgets`);
}
