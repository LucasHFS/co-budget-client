import { useContext } from "react";
import { SaleEventContext } from "../components/SaleEventProvider";

export const useSaleEvent = () => {
  const value = useContext(SaleEventContext);

  if (!value) {
    throw new Error(
      "Cannot call useSaleEvent without having an SaleEventContext higher up in the tree!"
    );
  }

  const {
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
  } = value;

  return {
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
  };
};
