import Head from "next/head";
import { TransactionsPage } from "../TransactionsPage";

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
