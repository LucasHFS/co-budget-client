import { api } from "@/lib/http/api";

type ParamType = {
  email:string;
  username: string;
  password: string;
}

export const signUpRequest = async (params: ParamType) => {
  return api.post("/users", {
    user: params,
  });
}
