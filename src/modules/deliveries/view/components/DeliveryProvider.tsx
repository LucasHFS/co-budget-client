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
import { Delivery } from "../../domain/Delivery";
import { Client } from "@/modules/clients/domain/Client";
import { Product } from "@/modules/products/domain/Product";
import { useAuth } from "@/modules/auth";
import { useBudget } from "@/modules/orders";


type DeliveryProviderValue = {
  updateDelivery: any
  deleteDelivery: any
  deliveriesByState: DeliveriesByStateType
  setDeliveriesByState: any
  refetchDeliveries: any
  startDelivery: any
  registerDelivery: any
  completeDelivery: any
  cancelDelivery: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export type DeliveriesByStateType = {
  Registrados?: Delivery[]
  'Em Progresso'?: Delivery[]
  Finalizados?: Delivery[]
  Cancelados?: Delivery[]
}

export const DeliveryContext = createContext<DeliveryProviderValue | undefined>(
  undefined
);

type DeliveryContextProviderProps = {
  children: ReactNode;
};

export const DeliveryProvider = ({ children }: DeliveryContextProviderProps) => {
  const [deliveriesByState, setDeliveriesByState] = useState<DeliveriesByStateType>({})
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const { selectedBudgetId } = useBudget()

  const fetchDeliveriesByState = useCallback(
    () => {
      api
        .get("/deliveries", {params: {
          budgetId: selectedBudgetId
        }})
        .then((response) => {
          const data = response.data.deliveries_by_state

          setDeliveriesByState({
            Registrados: data && data['Registrado'] || {deliveries: []},
            'Em Progresso': data && data['Em Progresso'] || {deliveries: []},
            Finalizados: data && data['Finalizado'] || {deliveries: []},
            Cancelados: data && data['Cancelado'] || {deliveries: []}
          });
        })
        .catch((err) => {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
        })
        .finally(() => {
          setisLoading(false);
        });
    },[selectedBudgetId])


  const refetchDeliveries = useCallback(() => {
    setTimeout(function() {
      fetchDeliveriesByState()
    }, 400);
  }, [fetchDeliveriesByState]);

  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    refetchDeliveries()
    return () => setErrors([]);
  }, [refetchDeliveries, isAuthenticated]);

  const updateDelivery = useCallback(
    async ({ id, client, products, isDelivery, notes }: {id:number, client:Client, products:Product[],isDelivery: boolean, notes:string}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/deliveries/${id}`, {
            delivery: {
              // todo: fill params
            },
          });

          if (response.status === 200) {
            refetchDeliveries()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [refetchDeliveries])

  const registerDelivery = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/deliveries/register`, {
            ids,
          });

          if (response.status === 200) {
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  },[])

  const startDelivery = useCallback(
    async ({ ids, driverId }: {ids: number[], driverId: number}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/deliveries/start`, {
            ids,
            driverId,
          });

          if (response.status === 200) {
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  },[])

  const completeDelivery = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/deliveries/complete`, {
            ids
          });

          if (response.status === 200) {
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  },[])

  const cancelDelivery = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/deliveries/cancel`, {
            ids
          });

          if (response.status === 200) {
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  },[])

  const value = useMemo(
    () => ({
      deliveriesByState,
      setDeliveriesByState,
      refetchDeliveries,
      updateDelivery,
      registerDelivery,
      startDelivery,
      completeDelivery,
      cancelDelivery,
      isLoading,
      errors,
      setErrors,
    }),
    [
      deliveriesByState,
      setDeliveriesByState,
      refetchDeliveries,
      updateDelivery,
      registerDelivery,
      startDelivery,
      completeDelivery,
      cancelDelivery,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>
  );
};
