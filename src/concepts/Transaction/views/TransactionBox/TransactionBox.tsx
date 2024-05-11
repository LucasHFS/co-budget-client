import { NumericFormat } from "react-number-format";

import styles from "./TransactionBox.module.scss";

import cx from "classnames";
import { UpdateTransactionModal } from "../UpdateTransactionModal/UpdateTransactionModal";
import { formatDate } from "@/concepts/utils/date";
import { useTransactionBox } from "./hooks/useTransactionBox";
import { Transaction } from "../../domain/Transaction";

export const TransactionBox = ({ transaction }: {transaction: Transaction }) => {
  const { handleClickOpen, handleClose, open } = useTransactionBox()
  const formattedStatus = transaction.status === 'pago' ? (transaction.transactionType == 'expense' ? 'pago' : 'recebido') : transaction.status

  return (
    <>
      <div
        className={styles.box}
        onClick={handleClickOpen}
        data-testid="transactionBox"
      >
        <div className={styles.firstRow} data-testid="transactionTitle">
          {transaction.name}
          <NumericFormat
            className={
              cx(
                {
                  [styles.income]: transaction.transactionType === 'income',
                  [styles.expense]: transaction.transactionType === 'expense',
                }
              )
            }
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(transaction.price).toFixed(2)}
          />
        </div>

        <div>
           { transaction.status !== 'criado' ?
              <span
                className={
                  cx(
                    styles.secondRow,
                    {
                      [styles.paid]: transaction.status === 'pago',
                      [styles.overdue]: transaction.status === 'atrasado',
                    }
                  )
            }>{formattedStatus}</span> : null }
            <span>{ formatDate(transaction.dueAt)}</span>
        </div>
      </div>

      <UpdateTransactionModal open={open} transaction={transaction} handleClose={handleClose}/>
    </>
  );
}
