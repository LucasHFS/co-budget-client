import { useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/router";
import { signUpRequest } from "@/concepts/infra/http/signUpRequest";
import { toastSuccess } from "@/concepts/utils/toastify";
import { formatedErrorsArray } from "@/concepts/utils/request";

export const useSignUp = () => {
  const { authenticateUser } = useAuth();
  const router = useRouter();

  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const signUp = async ({email, username, password}: {email:string,username:string,password:string}) =>  {
    try {
        setisLoading(true);

        const response = await signUpRequest({ email, username, password })

        if (response.status === 200) {
          toastSuccess("Account Created!");

          authenticateUser(response.data.user);
          router.push('/budgets')
        }
      } catch (err) {
        //@ts-ignore
        setErrors(formatedErrorsArray(err));
      }
      setisLoading(false);
    }

  return {
    signUp,
    isLoading,
    errors,
  }
}
