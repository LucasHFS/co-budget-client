import Head from "next/head";
import { TransactionsPage } from "../transactions/TransactionsPage";

export const HomePage = () => {
  return (
    <>
      <Head>
        <title>Co-Finance - Home</title>
      </Head>
      <TransactionsPage />
    </>
  );
};
