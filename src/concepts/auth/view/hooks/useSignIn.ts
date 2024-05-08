import { signInRequest } from "@/concepts/infra/http/signInRequest";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/router";
import { formatedErrorsArray } from "@/concepts/utils/request";

export const useSignIn = () => {
  const { authenticateUser } = useAuth();
  const router = useRouter();

  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const signIn = async ({ email, password }: {email:string, password: string}) => {
      setisLoading(true);
      try {
        const response = await signInRequest({ email, password });

        authenticateUser(response.data.user);
        router.push('/budgets')
      } catch (err) {
        // @ts-ignore
        setErrors(formatedErrorsArray(err));
        setisLoading(false);
      }

      setisLoading(false);
  }

  return {
    signIn,
    isLoading,
    errors,
  }
}
