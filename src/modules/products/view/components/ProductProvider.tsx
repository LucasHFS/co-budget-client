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
import { Product } from "../../domain/Product";
import { useAuth } from "@/modules/auth";


type ProductProviderValue = {
  createProduct: any
  updateProduct: any
  deleteProduct: any
  products: Product[]
  setProducts: any
  isLoading: boolean
  errors: string[]
  setErrors: any
};

export const ProductContext = createContext<ProductProviderValue | undefined>(
  undefined
);

type ProductContextProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductContextProviderProps) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const {isAuthenticated} = useAuth()

  const createProduct = useCallback(
    async ({ name, price }: Product) =>  {
      try {
          setisLoading(true);

          const response = await api.post("/products", {
            product: {
              name,
              price,
            },
          });

          if (response.status === 201) {
            const product = response.data.product
            //@ts-ignore
            setProducts(prevProducts => [
              ...prevProducts,
              product
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

  const updateProduct = useCallback(
    async ({ id, name, price }: Product) =>  {
      try {
          setisLoading(true);

          const response = await api.put(`/products/${id}`, {
            product: {
              name,
              price,
            },
          });

          if (response.status === 200) {
            const product = response.data.product
  //@ts-ignore
            setProducts(prevProducts => {
              return prevProducts.map((prod)=>{
  //@ts-ignore
                if(prod.id === product.id){
                  return product
                } else {
                  return prod;
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

  const deleteProduct = useCallback(
    async ({ id }: {id: number}) =>  {
      try {
          setisLoading(true);

          const response = await api.delete(`/products/${id}`);

          if (response.status === 204) {
                // @ts-ignore
            const productsWithoutDeleted = products.filter((prod)=> id !== prod.id)
            setProducts(productsWithoutDeleted)

            return true
          }
        } catch (err) {
          //@ts-ignore
          setErrors(formatedErrorsArray(err));
          return false
        }
        setisLoading(false);
  }, [products])

  useEffect(() => {
    if(!isAuthenticated){
      return
    }

    setisLoading(true);
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
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
      products,
      setProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      isLoading,
      errors,
      setErrors,
    }),
    [
      products,
      setProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      isLoading,
      errors,
      setErrors,
    ]
  );

  return (
    //@ts-ignore
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
