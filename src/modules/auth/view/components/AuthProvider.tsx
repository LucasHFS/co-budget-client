import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { api } from "@/modules/infra/services/apiClient";
import { useRouter } from 'next/router'
import { User } from "../../domain/User";
import { fetchCurrentUserRequest } from "@/modules/infra/http/fetchCurrentUserRequest";

type AuthProviderValue = {
  authenticateUser: (userData: { username: string; id: number; token: string }) => void;
  signOut: ()=> void;
  isAuthenticated: boolean
  user: User | {}
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

  function authenticateUser({ username, id, token }: {username:string, id:number, token:string}) {
    setCookie(undefined, "co-budget.token", token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    setUser({
      id,
      username,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  const signOut = useCallback(() => {
    destroyCookie(undefined, "co-budget.token");
    setUser({});
    router.push('/login')

  }, [router]);

  const fetchuser = useCallback(() => {
    setisLoading(true);

    fetchCurrentUserRequest()
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
  }, [signOut]);

  useEffect(() => {
    const { "co-budget.token": token } = parseCookies();

    if (token) {
      fetchuser()
    }

    return () => setErrors([]);
  }, [fetchuser, signOut]);

  const value = {
      authenticateUser,
      signOut,
      isAuthenticated,
      user,
      isLoading,
      errors,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
