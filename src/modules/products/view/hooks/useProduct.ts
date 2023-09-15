import { useContext } from "react";
import { ProductContext } from "../components/ProductProvider";

export const useProduct = () => {
  const value = useContext(ProductContext);

  if (!value) {
    throw new Error(
      "Cannot call useProduct without having an ProductContext higher up in the tree!"
    );
  }

  const {
    createProduct,
    updateProduct,
    deleteProduct,
    products,
    setProducts,
    isLoading,
    errors,
    setErrors,
  } = value;

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    products,
    setProducts,
    isLoading,
    errors,
    setErrors,
  };
};
