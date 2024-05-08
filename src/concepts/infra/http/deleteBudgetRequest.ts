import { api } from "../services/apiClient";

export const deleteBudgetRequest = async (id: number) => {
  return api.delete(`/budgets/${id}`);
}
