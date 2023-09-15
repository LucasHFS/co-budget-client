import { useContext } from "react";
import { OrderContext } from "../components/OrderProvider";

export const useOrder = () => {
  const value = useContext(OrderContext);

  if (!value) {
    throw new Error(
      "Cannot call useOrder without having an OrderContext higher up in the tree!"
    );
  }

  const {
    createOrder,
    updateOrder,
    deleteOrder,
    ordersByState,
    setOrdersByState,
    refetchOrders,
    registerOrder,
    prepareOrder,
    sendOrder,
    completeOrder,
    cancelOrder,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createOrder,
    updateOrder,
    deleteOrder,
    ordersByState,
    setOrdersByState,
    refetchOrders,
    registerOrder,
    prepareOrder,
    sendOrder,
    completeOrder,
    cancelOrder,
    isLoading,
    errors,
    setErrors,
  };
};
