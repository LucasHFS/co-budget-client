import { api } from "../services/apiClient";

const deleteBudgetRequest = async (id: number) => {
  return api.delete(`/budgets/${id}`);
}

export default deleteBudgetRequest;
