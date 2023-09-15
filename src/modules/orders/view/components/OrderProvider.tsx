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
import { Order } from "../../domain/Order";
import { Client } from "@/modules/clients/domain/Client";
import { Product } from "@/modules/products/domain/Product";
import { useBudget } from "../hooks/useBudget";
import { useAuth } from "@/modules/auth";


type OrderProviderValue = {
  createOrder: any
  updateOrder: any
  deleteOrder: any
  ordersByState: OrdersByStateType
  setOrdersByState: any
  refetchOrders: any
  prepareOrder: any
  registerOrder: any
  sendOrder: any
  completeOrder: any
  cancelOrder: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export type OrdersByStateType = {
  Registrados?: Order[]
  Preparados?: Order[]
  Enviados?: Order[]
  Finalizados?: Order[]
  Cancelados?: Order[]
}

export const OrderContext = createContext<OrderProviderValue | undefined>(
  undefined
);

type OrderContextProviderProps = {
  children: ReactNode;
};

export const OrderProvider = ({ children }: OrderContextProviderProps) => {
  const [ordersByState, setOrdersByState] = useState<OrdersByStateType>({})
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const { selectedBudgetId } = useBudget()

  const fetchOrdersByState = useCallback(
    () => {
      api
        .get("/orders/by_state", {params: {
          budgetId: selectedBudgetId
        }})
        .then((response) => {
          const data = response.data.orders_by_state

          setOrdersByState({
            Registrados: data && data['Registrado'] || {orders: []},
            Preparados: data && data['Preparado'] || {orders: []},
            Enviados: data && data['Enviado'] || {orders: []},
            Finalizados: data && data['Finalizado'] || {orders: []},
            Cancelados: data && data['Cancelado'] || {orders: []}
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


  const refetchOrders = useCallback(() => {
    setTimeout(function() {
      fetchOrdersByState()
    }, 400);
  }, [fetchOrdersByState]);

  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    refetchOrders()
    return () => setErrors([]);
  }, [refetchOrders, isAuthenticated]);

  const createOrder = useCallback(
    async ({ client, products, isDelivery, notes }: {client: Client, products: Product[], isDelivery: boolean, notes:string}) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/orders", {
            order: {
              client,
              products,
              budgetId: selectedBudgetId,
              isDelivery,
              notes,
            },
          });

          if (response.status === 201) {
            refetchOrders()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [selectedBudgetId, refetchOrders])

  const updateOrder = useCallback(
    async ({ id, client, products, isDelivery, notes }: {id:number, client:Client, products:Product[],isDelivery: boolean, notes:string}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/orders/${id}`, {
            order: {
              client,
              products,
              isDelivery,
              notes,
            },
          });

          if (response.status === 200) {
            refetchOrders()

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
      }, [refetchOrders])

  const deleteOrder = useCallback(
    async ({ id }: {id: number}) =>  {
      try {
          setisLoading(true);

          const response = await api.delete(`/orders/${id}`);

          if (response.status === 204) {
            refetchOrders()
            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  }, [refetchOrders])

  const registerOrder = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/orders/register`, {
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

  const prepareOrder = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/orders/prepare`, {
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

  const sendOrder = useCallback(
    async ({ ids, driverId}: {ids: number[], driverId:number}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/orders/send`, {
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

  const completeOrder = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/orders/complete`, {
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

  const cancelOrder = useCallback(
    async ({ ids }: {ids: number[]}) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/orders/cancel`, {
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
      ordersByState,
      setOrdersByState,
      refetchOrders,
      createOrder,
      updateOrder,
      deleteOrder,
      registerOrder,
      prepareOrder,
      sendOrder,
      completeOrder,
      cancelOrder,
      isLoading,
      errors,
      setErrors,
    }),
    [
      ordersByState,
      setOrdersByState,
      refetchOrders,
      createOrder,
      updateOrder,
      deleteOrder,
      registerOrder,
      prepareOrder,
      sendOrder,
      completeOrder,
      cancelOrder,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
