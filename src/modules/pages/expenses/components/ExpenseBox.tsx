import { Button } from "@mui/material";
import { NumericFormat } from "react-number-format";

import styles from "./ExpenseBox.module.scss";
import { Expense } from "@/modules/expenses/domain/Expense";

import cx from "classnames";
import { UpdateExpenseModal } from "./UpdateExpenseModal";
import { formatDate } from "@/modules/utils/date";
import {  ArrowRightAlt } from "@mui/icons-material";
import { useExpenseBox } from "../hooks/useExpenseBox";

export const ExpenseBox = ({ expense }: {expense: Expense }) => {
  const { handleClickOpen, handleClose, open } = useExpenseBox()

  return (
    <>
      <div
        className={
          cx(styles.box,
            {
              [styles.paid]: expense.status === 'Pago',
              [styles.overdue]: expense.status === 'Atrasado',
            }
          )
        }
        onClick={handleClickOpen}
      >
        <div className={styles.firstRow}>
          {expense.name}
          <NumericFormat
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(expense.price).toFixed(2)}
          />
        </div>

        <div className={styles.secondRow}>
          { expense.status !== 'Criado' ? <span className={styles.title}> {expense.status}</span> : null }
          {formatDate(expense.dueAt)}
        </div>
      </div>

      <UpdateExpenseModal open={open} expense={expense} handleClose={handleClose}/>
    </>
  );
}
