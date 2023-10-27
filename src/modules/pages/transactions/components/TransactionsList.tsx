import { useTransaction } from "@/modules/transactions";
import { Transaction } from "@/modules/transactions/domain/Transaction";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TransactionBox } from "./TransactionBox";
import styles from "./TransactionsList.module.scss";


export const TransactionsList = ({transactions}: {transactions:Transaction[]}) => {
  return (
    <>
      <Head>
        <title>Co-Finance - Transactions</title>
      </Head>

      <div className={styles.container}>
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

