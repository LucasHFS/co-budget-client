import { api } from "../services/apiClient";

const updateBudgetRequest = async ({ id, name }: {id:string, name:string}) => {
  return api.put(`/budgets/${id}`, {
    budget: {
      name,
    },
  });
}

export default updateBudgetRequest;
