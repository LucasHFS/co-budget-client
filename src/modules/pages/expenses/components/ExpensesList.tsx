import { useExpense } from "@/modules/expenses";
import { Expense } from "@/modules/expenses/domain/Expense";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ExpenseBox } from "./ExpenseBox";
import styles from "./ExpensesList.module.scss";


export const ExpensesList = ({expenses}: {expenses:Expense[]}) => {
  return (
    <>
      <Head>
        <title>Co-Finance - Expenses</title>
      </Head>

      <div className={styles.container}>
          <>
            { expenses.map((expense) => (
                <ExpenseBox
                  key={expense.id}
                  expense={expense}
                />
              ))
            }
          </>
      </div>
    </>
  );
};

