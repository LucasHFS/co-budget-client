import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/router";
import { toastSuccess } from "@/concepts/utils/toastify";
import { formatedErrorsArray } from "@/concepts/utils/request";
import { signUpRequest } from "@/concepts/Auth/repository/signUpRequest";

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
