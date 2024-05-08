import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      "Cannot call useAuth without having an AuthContext higher up in the tree!"
    );
  }

  const {
    authenticateUser,
    signOut,
    isAuthenticated,
    user,
    isLoading,
    errors,
  } = value;

  return {
    authenticateUser,
    signOut,
    isAuthenticated,
    user,
    isLoading,
    errors,
  };
};
