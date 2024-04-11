import { api } from "../services/apiClient";

const fetchBudgetsRequest = async () => {
  return api.get(`/budgets`);
}

export default fetchBudgetsRequest;
