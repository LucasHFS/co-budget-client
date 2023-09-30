import { useExpense } from "@/modules/expenses";
import { Expense } from "@/modules/expenses/domain/Expense";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ExpenseBox } from "./ExpenseBox";
import styles from "./ExpensesList.module.scss";


export const ExpensesList = ({expenses}: {expenses:Expense[]}) => {
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  //@ts-ignore
  const handleBoxClick = (expenseId) => {
  //@ts-ignore
    setSelectedExpenses((prevSelectedExpenses) => {
  //@ts-ignore
      if (prevSelectedExpenses.includes(expenseId)) {
        // Expense is already selected, remove it from the list
        return prevSelectedExpenses.filter((id) => id !== expenseId);
      } else {
        // Expense is not selected, add it to the list
        return [...prevSelectedExpenses, expenseId];
      }
    });
  };

  useEffect(()=>{
    setSelectedExpenses([])
  }, [expenses])

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
                  // @ts-ignore
                  selected={selectedExpenses.includes(expense.id)}
                  onClick={handleBoxClick}
                />
              ))
            }
          </>
      </div>
    </>
  );
};

