import { Product } from "@/modules/products/domain/Product";
import Head from "next/head";
import { ProductBox } from "./ProductBox";
import styles from "./ProductsList.module.scss";

export const ProductsList = ({products}: {products:Product[]}) => {
  return (
    <>
      <Head>
        <title>Marmitex - Products</title>
      </Head>

      <h2 className={styles.title}>Produtos Cadastrados</h2>

      <div className={styles.container}>
        {products?.map((product) => <ProductBox key={product.id} product={product} />)}
      </div>
    </>
  );
};

