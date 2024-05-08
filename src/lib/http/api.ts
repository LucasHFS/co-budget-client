import axios from "axios";
import { parseCookies } from "nookies";

export const CO_BUDGET_API_URL = process.env.NEXT_PUBLIC_CO_BUDGET_API_URL;

function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  if (cookies["co-budget.token"]) {
    const api = axios.create({
      baseURL: CO_BUDGET_API_URL,
      headers: {
        Authorization: `Bearer ${cookies["co-budget.token"]}`,
      },
    });

    return api;
  } else {
    const api = axios.create({
      baseURL: CO_BUDGET_API_URL,
    });

    return api;
  }
}

export const api = setupApiClient();
