import { api } from "../services/apiClient";

export const createBudgetRequest = async ({ name }: {name:string}) => {
  return api.post("/budgets", {
    budget: {
      name,
    },
  });
}
