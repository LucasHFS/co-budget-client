import { Budget } from "@/concepts/transactions/domain/Budget";
import { api } from "@/lib/http/api";

export const updateBudgetRequest = async ({ id, name }: Budget) => {
  return api.put(`/budgets/${id}`, {
    budget: {
      name,
    },
  });
}
