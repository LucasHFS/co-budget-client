import Head from "next/head";
import { TransactionBox } from "../TransactionBox/TransactionBox";
import styles from "./TransactionsList.module.scss";
import { Transaction } from "../../domain/Transaction";

export const TransactionsList = ({transactions, isLoading }: { transactions: Transaction[], isLoading: boolean}) => {

  return (
    <>
      <Head>
        <title>Co-Finance - Transactions</title>
      </Head>

      <div className={styles.container}>
        { isLoading ? 'Loading...' : null }
        <>
          { transactions.map((transaction) => (
              <TransactionBox
                key={transaction.id}
                transaction={transaction}
              />
            ))
          }
        </>
      </div>
    </>
  );
};

