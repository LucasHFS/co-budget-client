import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      "Cannot call useAuth without having an AuthContext higher up in the tree!"
    );
  }

  const {
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    user,
    isLoading,
    errors,
  } = value;

  return {
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    user,
    isLoading,
    errors,
  };
};