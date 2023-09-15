import Head from "next/head";
import { OrdersPage } from "../orders/OrdersPage";

export const HomePage = () => {
  return (
    <>
      <Head>
        <title>Marmitex - Home</title>
      </Head>
      <OrdersPage />
    </>
  );
};
