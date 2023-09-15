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
import { SaleEvent } from "@/modules/orders/domain/SaleEvent";
import { useAuth } from "@/modules/auth";

type SaleEventProviderValue = {
  createSaleEvent: any
  updateSaleEvent: any
  deleteSaleEvent: any
  saleEvents: SaleEvent[]
  setSaleEvents: any
  selectedSaleEventId: SaleEvent
  setselectedSaleEventId: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const SaleEventContext = createContext<SaleEventProviderValue | undefined>(
  undefined
);

type OrderContextProviderProps = {
  children: ReactNode;
};

export const SaleEventProvider = ({ children }: OrderContextProviderProps) => {
  const [saleEvents, setSaleEvents] = useState<SaleEvent[]>([])
  //@ts-ignore
  const [selectedSaleEventId, setselectedSaleEventId] = useState<SaleEvent | undefined>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('selectedSaleEventId');
      return storedValue;
    }
  })

  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    try {
      if(selectedSaleEventId){
        //@ts-ignore
        localStorage.setItem('selectedSaleEventId', selectedSaleEventId);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedSaleEventId]);

  const createSaleEvent = useCallback(
    async ({ name, date }: SaleEvent) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/sale_events", {
            sale_event: {
              name,
              date,
            },
          });

          if (response.status === 201) {
            const saleEvent = response.data.saleEvent
            //@ts-ignore
            setSaleEvents(prevSaleEvents => [
              ...prevSaleEvents,
              {
                id: saleEvent.id,
                name: saleEvent.name,
                date: saleEvent.date,
              }
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

  const updateSaleEvent = useCallback(
    async ({ id, name, date }: SaleEvent) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/sale_events/${id}`, {
            sale_event: {
              name,
              date,
            },
          });

          if (response.status === 200) {
            const saleEvent = response.data.saleEvent

            setSaleEvents(prevSaleEvents => {
              return prevSaleEvents.map((saleEv)=>{
                if(saleEv.id === saleEvent.id){
                  return {
                    id: saleEvent.id,
                    name: saleEvent.name,
                    date: saleEvent.date,
                  }
                } else {
                  return saleEv;
                }
              })
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

  const deleteSaleEvent = useCallback(
    async ({ id }: {id: number}) =>  {
      try {
          setisLoading(true);

          const response = await api.delete(`/sale_events/${id}`);

          if (response.status === 204) {
            const saleEventsWithoutDeleted = saleEvents.filter((saleEvent)=> id !== saleEvent.id)
            setSaleEvents(saleEventsWithoutDeleted)

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  }, [saleEvents])


  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    setisLoading(true);
    api
      .get("/sale_events")
      .then((response) => {
        setSaleEvents(response.data.sale_events);
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
      createSaleEvent,
      updateSaleEvent,
      deleteSaleEvent,
      saleEvents,
      setSaleEvents,
      selectedSaleEventId,
      setselectedSaleEventId,
      isLoading,
      errors,
      setErrors,
    }),
    [
      createSaleEvent,
      updateSaleEvent,
      deleteSaleEvent,
      saleEvents,
      setSaleEvents,
      selectedSaleEventId,
      setselectedSaleEventId,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <SaleEventContext.Provider value={value}>{children}</SaleEventContext.Provider>
  );
};
