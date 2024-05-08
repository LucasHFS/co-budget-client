import { api } from "@/lib/http/api";

export const fetchBudgetsRequest = async () => {
  return api.get(`/budgets`);
}
