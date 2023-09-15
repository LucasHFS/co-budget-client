import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/modules/infra/services/apiClient";
import { formatedErrorsArray } from "@/modules/utils/request";
import { Client } from "../../domain/Client";
import { useAuth } from "@/modules/auth";


type ClientProviderValue = {
  createClient: any
  updateClient: any
  deleteClient: any
  clients: Client[]
  setClients: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const ClientContext = createContext<ClientProviderValue | undefined>(
  undefined
);

type ClientContextProviderProps = {
  children: ReactNode;
};

export const ClientProvider = ({ children }: ClientContextProviderProps) => {
  const [clients, setClients] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const createClient = useCallback(
    async ({ name, address, district, gpsLink, phone, referencePoint }: Client) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/clients", {
            client: {
              name,
              address,
              district,
              gpsLink,
              phone,
              referencePoint,
            },
          });

          if (response.status === 201) {
            const client = response.data.client
            //@ts-ignore
            setClients(prevClients => [
              ...prevClients,
              client
            ]);
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [])

      const updateClient = useCallback(
        async ({ id, name, address, district, phone, gpsLink, referencePoint, }: Client) =>  {
          try {
              setisLoading(true);

              const response = await api.put(`/clients/${id}`, {
                client: {
                  name,
                  address,
                  district,
                  phone,
                  gpsLink,
                  referencePoint,
                },
              });

              if (response.status === 200) {
                const client = response.data.client

                //@ts-ignore
                setClients((prevClients) => {
                  return prevClients.map((cli) => {
                    // @ts-ignore
                    if (cli.id === client.id) {
                      return client;
                    } else {
                      return cli;
                    }
                  });
                });
                return true
              }
            } catch (err) {
              //@ts-ignore
              setErrors(formatedErrorsArray(err));
              return false
            }
            setisLoading(false);
      }, [])

      const deleteClient = useCallback(
        async ({ id }: {id: number}) =>  {
          try {
              setisLoading(true);

              const response = await api.delete(`/clients/${id}`);

              if (response.status === 204) {
                // @ts-ignore
                const clientsWithoutDeleted = clients.filter((client)=> id !== client.id)
                setClients(clientsWithoutDeleted)

                return true
              }
            } catch (err) {
              //@ts-ignore
              setErrors(formatedErrorsArray(err));
              return false
            }
            setisLoading(false);
      }, [clients])

  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    api
      .get("/clients")
      .then((response) => {
        setClients(response.data.clients);
      })
      .catch((err) => {
        //@ts-ignore
        setErrors(formatedErrorsArray(err));
      })
      .finally(() => {
        setisLoading(false);
      });
    return () => setErrors([]);
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      clients,
      setClients,
      createClient,
      updateClient,
      deleteClient,
      isLoading,
      errors,
      setErrors,
    }),
    [
      clients,
      setClients,
      createClient,
      updateClient,
      deleteClient,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};
