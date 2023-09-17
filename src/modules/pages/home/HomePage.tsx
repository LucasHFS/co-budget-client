import Head from "next/head";
import { ExpensesPage } from "../expenses/ExpensesPage";

export const HomePage = () => {
  return (
    <>
      <Head>
        <title>Co-Finance - Home</title>
      </Head>
      <ExpensesPage />
    </>
  );
};
