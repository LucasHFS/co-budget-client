import { useContext } from "react";
import { DriverContext } from "../components/DriverProvider";

export const useDriver = () => {
  const value = useContext(DriverContext);

  if (!value) {
    throw new Error(
      "Cannot call useDriver without having an DriverContext higher up in the tree!"
    );
  }

  const {
    createDriver,
    updateDriver,
    deleteDriver,
    drivers,
    setDrivers,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createDriver,
    updateDriver,
    deleteDriver,
    drivers,
    setDrivers,
    isLoading,
    errors,
    setErrors,
  };
};
