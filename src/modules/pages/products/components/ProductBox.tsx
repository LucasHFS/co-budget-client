import { useState } from "react";
import { NumericFormat } from "react-number-format";

import { useProduct } from "@/modules/products";
import styles from "./ProductBox.module.scss";
import { UpdateProductModal } from "./UpdateProductModal";

export const ProductBox = ({product}: any) => {
  const [open, setOpen] = useState(false);
  const { setErrors} = useProduct()
  const [price, setPrice] = useState(product.price)


  const handleClickOpen = () => {
    setPrice(product.price)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
    setPrice('')
  };

  return (
    <>
      <div className={styles.box} onClick={handleClickOpen}>
        <div className={styles.title}>#{product.id}</div>
        <div className={styles.title}>{product.name}</div>
        <div className={styles.title}>
          <NumericFormat
            prefix="R$  "
            displayType="text"
            value={parseFloat(product.price).toFixed(2)}
          />
        </div>
      </div>

      <UpdateProductModal handleClose={handleClose} product={product} open={open} price={price} setPrice={setPrice}/>
    </>
  );
}
