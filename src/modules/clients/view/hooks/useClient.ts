import { useContext } from "react";
import { ClientContext } from "../components/ClientProvider";

export const useClient = () => {
  const value = useContext(ClientContext);

  if (!value) {
    throw new Error(
      "Cannot call useClient without having an ClientContext higher up in the tree!"
    );
  }

  const {
    createClient,
    updateClient,
    deleteClient,
    clients,
    setClients,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createClient,
    updateClient,
    deleteClient,
    clients,
    setClients,
    isLoading,
    errors,
    setErrors,
  };
};
