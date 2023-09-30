import { useExpense } from "@/modules/expenses";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";

export const useExpenseBox = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  const { deleteExpense, setErrors } = useExpense()

  const confirm = useConfirm();
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

  return {
    handleExclude,
    handleClickOpen,
    handleClose,
    open,
  }
}
