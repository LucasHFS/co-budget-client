import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

import { useExpense } from "@/modules/expenses";
import styles from "./ExpenseBox.module.scss";
import { Expense } from "@/modules/expenses/domain/Expense";

import cx from "classnames";
import { UpdateExpenseModal } from "./UpdateExpenseModal";
import { formatDate } from "@/modules/utils/date";
import { useConfirm } from "material-ui-confirm";
import { ArrowRight, ArrowRightAlt } from "@mui/icons-material";

export const ExpenseBox = ({expense, selected, onClick}: {expense: Expense, selected: boolean, onClick: any}) => {
  const [open, setOpen] = useState(false);
  const { deleteExpense, setErrors } = useExpense()
  const confirm = useConfirm();

  const targetExpenseOptions = [
    { value: 'one', name: 'Apenas esta' },
    { value: 'this_and_next', name: 'Essa e as proximas' },
  ]

  // @ts-ignore
  const handleExclude = async (expense) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira a despesa', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteExpense({id: expense.id, targetExpenses: 'one'});

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
        className={
          cx(styles.box,
            {
              [styles.selected]: selected,
              [styles.paid]: expense.status === 'Pago',
              [styles.overdue]: expense.status === 'Atrasado',
            }
          )
        }
        onClick={() => onClick(expense.id)}
      >
        <div className={styles.title} style={{display: 'flex', alignItems: 'center', }}>
          {expense.name} <ArrowRightAlt /> <NumericFormat
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(expense.price).toFixed(2)}
          /> <ArrowRightAlt /> {formatDate(expense.dueAt)}

        </div>
        <div className={styles.title}>

        </div>
        { expense.status !== 'Criado' ? <div className={styles.title}>{expense.status}</div> : null }
        {selected && (
          <div className={styles.editLine}>
            <Button variant="contained" onClick={handleClickOpen}>Editar</Button>
            {/* @ts-ignore */}
            <Button variant="contained" onClick={() => handleExclude(expense)} color= "error">Excluir</Button>
          </div>
        )}
      </div>

      <UpdateExpenseModal open={open} expense={expense} handleClose={handleClose}/>
    </>
  );
}
