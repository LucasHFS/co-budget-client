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
import { Driver } from "../../domain/Driver";
import { useAuth } from "@/modules/auth";

type DriverProviderValue = {
  createDriver: any
  updateDriver: any
  deleteDriver: any
  drivers: Driver[]
  setDrivers: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const DriverContext = createContext<DriverProviderValue | undefined>(
  undefined
);

type DriverContextProviderProps = {
  children: ReactNode;
};

export const DriverProvider = ({ children }: DriverContextProviderProps) => {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const createDriver = useCallback(
    async ({ name, phone }: Driver) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/drivers", {
            driver: {
              name,
              phone,
            },
          });

          if (response.status === 201) {
            const driver = response.data.driver
            //@ts-ignore
            setDrivers(prevDrivers => [
              ...prevDrivers,
              driver
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

      const updateDriver = useCallback(
        async ({ id, name, phone }: Driver) =>  {
          try {
              setisLoading(true);

              const response = await api.put(`/drivers/${id}`, {
                driver: {
                  name,
                  phone,
                },
              });

              if (response.status === 200) {
                const driver = response.data.driver

                //@ts-ignore
                setDrivers((prevDrivers) => {
                  return prevDrivers.map((cli) => {
                    // @ts-ignore
                    if (cli.id === driver.id) {
                      return driver;
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

      const deleteDriver = useCallback(
        async ({ id }: {id: number}) =>  {
          try {
              setisLoading(true);

              const response = await api.delete(`/drivers/${id}`);

              if (response.status === 204) {
                // @ts-ignore
                const driversWithoutDeleted = drivers.filter((driver)=> id !== driver.id)
                setDrivers(driversWithoutDeleted)

                return true
              }
            } catch (err) {
              //@ts-ignore
              setErrors(formatedErrorsArray(err));
              return false
            }
            setisLoading(false);
      }, [drivers])

  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    api
      .get("/drivers")
      .then((response) => {
        setDrivers(response.data.drivers);
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
      drivers,
      setDrivers,
      createDriver,
      updateDriver,
      deleteDriver,
      isLoading,
      errors,
      setErrors,
    }),
    [
      drivers,
      setDrivers,
      createDriver,
      updateDriver,
      deleteDriver,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
  );
};
