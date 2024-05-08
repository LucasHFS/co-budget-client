import { api } from "@/lib/http/api";
import { Budget } from "../domain/Budget";

export const updateBudgetRequest = async ({ id, name }: Budget) => {
  return api.put(`/budgets/${id}`, {
    budget: {
      name,
    },
  });
}
