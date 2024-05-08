import { api } from "@/lib/http/api";

export const createBudgetRequest = async ({ name }: {name:string}) => {
  return api.post("/budgets", {
    budget: {
      name,
    },
  });
}
