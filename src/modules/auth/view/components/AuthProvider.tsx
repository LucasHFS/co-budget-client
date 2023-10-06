import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { api } from "@/modules/infra/services/apiClient";
import { toastSuccess } from "@/modules/utils/toastify";
import { useRouter } from 'next/router'
import { formatedErrorsArray } from "@/modules/utils/request";
import { User } from "../../domain/User";


type AuthProviderValue = {
  signIn: any
  signUp: any
  signOut: any
  isAuthenticated: boolean
  user: User
  isLoading: boolean
  errors: string[]
};

export const AuthContext = createContext<AuthProviderValue | undefined>(
  undefined
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const isAuthenticated = !!Object.keys(user).length;

  function authenticateUser({ username, id, token }: {username:string, id:string, token:string}) {
    setCookie(undefined, "marmitex.token", token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    setUser({
      id,
      username,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  const signIn = useCallback(
      async ({ email, password }: {email:string, password: string}) => {
        try {
          setisLoading(true);

          const response = await api.post("users/login", {
            user: {
              email,
              password,
            },
          });

          authenticateUser(response.data.user);
          router.push('/budgets')
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
        }
        setisLoading(false);
    }, [router])

  const signUp = useCallback(
    async ({email, username, password}: {email:string,username:string,password:string}) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/users", {
            user: {
              username,
              email,
              password,
            },
          });

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
      }, [router])

  const signOut = useCallback(() => {
    destroyCookie(undefined, "marmitex.token");
    setUser({});
    router.push('/budgets')

  }, [router]);

  useEffect(() => {
    const { "marmitex.token": token } = parseCookies();

    if (token) {
      setisLoading(true);
      api
        .get("/user")
        .then((response) => {
          const { id, username } = response.data.user;

          setUser({ id, username });
        })
        .catch(() => {
          signOut();
        })
        .finally(() => {
          setisLoading(false);
        });
    }
    return () => setErrors([]);
  }, [signOut]);

  const value = useMemo(
    () => ({
      signIn,
      signUp,
      signOut,
      isAuthenticated,
      user,
      isLoading,
      errors,
    }),
    [
      signIn,
      signUp,
      signOut,
      isAuthenticated,
      user,
      isLoading,
      errors,
    ]
  );

  return (
    //@ts-ignore
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
