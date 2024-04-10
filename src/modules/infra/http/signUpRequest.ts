import { api } from "@/modules/infra/services/apiClient";

type ParamType = {
  email:string;
  username: string;
  password: string;
}

const signUpRequest = async (params: ParamType) => {
  return api.post("/users", {
    user: params,
  });
}

export default signUpRequest;
