import { useContext } from "react";
import { DeliveryContext } from "../components/DeliveryProvider";

export const useDelivery = () => {
  const value = useContext(DeliveryContext);

  if (!value) {
    throw new Error(
      "Cannot call useDelivery without having an DeliveryContext higher up in the tree!"
    );
  }

  const {
    updateDelivery,
    deliveriesByState,
    setDeliveriesByState,
    refetchDeliveries,
    registerDelivery,
    startDelivery,
    completeDelivery,
    cancelDelivery,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    updateDelivery,
    deliveriesByState,
    setDeliveriesByState,
    refetchDeliveries,
    registerDelivery,
    startDelivery,
    completeDelivery,
    cancelDelivery,
    isLoading,
    errors,
    setErrors,
  };
};
