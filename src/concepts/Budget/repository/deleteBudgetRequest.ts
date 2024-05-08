import { api } from "@/lib/http/api";

export const deleteBudgetRequest = async (id: number) => {
  return api.delete(`/budgets/${id}`);
}
