import { api } from "../services/apiClient";

const createBudgetRequest = async ({ name }: {name:string}) => {
  return api.post("/budgets", {
    budget: {
      name,
    },
  });
}

export default createBudgetRequest;
