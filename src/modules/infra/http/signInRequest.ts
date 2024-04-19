import { api } from "@/modules/infra/services/apiClient";

type ParamType = {
  email:string;
  password: string;
}

const signInRequest = async (params: ParamType) => {
  return api.post('users/login', {
    user: params
  });
}

export default signInRequest;
