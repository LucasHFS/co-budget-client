import axios from "axios";
import { parseCookies } from "nookies";

export const MARMITEX_API_URL = process.env.NEXT_PUBLIC_MARMITEX_API_URL;

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  if (cookies["marmitex.token"]) {
    const api = axios.create({
      baseURL: MARMITEX_API_URL,
      headers: {
        Authorization: `Bearer ${cookies["marmitex.token"]}`,
      },
    });

    return api;
  } else {
    const api = axios.create({
      baseURL: MARMITEX_API_URL,
    });

    return api;
  }
}
