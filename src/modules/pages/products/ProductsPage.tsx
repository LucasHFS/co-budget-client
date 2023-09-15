import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import Head from "next/head";

import { ProductsList } from "./components/ProductsList";
import { useProduct } from "@/modules/products";
import styles from "./Product.module.scss";
import { CreateProductModal } from "./components/CreateProductModal";

export const ProductsPage = () => {
  const { products, setErrors } = useProduct()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  return (
    <>
      <Head>
        <title>Marmitex - Products</title>
      </Head>

      <div className={styles.content}>
        <CreateProductModal open={open} onClose={handleClose}/>

        {!!products.length && <ProductsList products={products}/>}

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};

