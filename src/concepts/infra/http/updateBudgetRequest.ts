import { Budget } from "@/concepts/transactions/domain/Budget";
import { api } from "../services/apiClient";

export const updateBudgetRequest = async ({ id, name }: Budget) => {
  return api.put(`/budgets/${id}`, {
    budget: {
      name,
    },
  });
}
