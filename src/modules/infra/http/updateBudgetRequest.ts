import { Budget } from "@/modules/transactions/domain/Budget";
import { api } from "../services/apiClient";

const updateBudgetRequest = async ({ id, name }: Budget) => {
  return api.put(`/budgets/${id}`, {
    budget: {
      name,
    },
  });
}

export default updateBudgetRequest;
