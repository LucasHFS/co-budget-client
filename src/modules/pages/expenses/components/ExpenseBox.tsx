import { Button } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useConfirm } from "material-ui-confirm";

import { useExpense } from "@/modules/expenses";
import styles from "./ExpenseBox.module.scss";
import { Expense } from "@/modules/expenses/domain/Expense";

import cx from "classnames";
import { UpdateExpenseModal } from "./UpdateExpenseModal";
import { formatDate } from "@/modules/utils/date";

export const ExpenseBox = ({expense, selected, onClick}: {expense: Expense, selected: boolean, onClick: any}) => {
  const [open, setOpen] = useState(false);
  const { deleteExpense, setErrors } = useExpense()
  const confirm = useConfirm();

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o pedido', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteExpense({id});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  return (
    <>
      <div
        className={cx(styles.box, { [styles.selected]: selected })}
        onClick={() => onClick(expense.id)}
      >
        <div className={styles.title}>{expense.name}</div>
        <div className={styles.title}>{formatDate(expense.dueAt)}</div>
        <div className={styles.title}>
          Total: <NumericFormat
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(expense.price).toFixed(2)}
          />
        </div>
        { expense.status !== 'Criado' ? <div className={styles.title}>{expense.status}</div> : null }
        {selected && (
          <div className={styles.editLine}>
            <Button variant="contained" onClick={handleClickOpen}>Editar</Button>
            {/* @ts-ignore */}
            <Button variant="contained" onClick={() => handleExclude(expense.id)} color= "error">Excluir</Button>
          </div>
        )}
      </div>

      <UpdateExpenseModal open={open} expense={expense} handleClose={handleClose}/>
    </>
  );
}
