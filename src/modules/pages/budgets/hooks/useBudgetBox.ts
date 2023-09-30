import { useBudget } from "@/modules/expenses";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";

export const useBudgetBox = () => {
  const [open, setOpen] = useState(false);
  const { updateBudget, deleteBudget, errors: requestErrors, setErrors } = useBudget()

  const confirm = useConfirm();

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o Orçamento', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteBudget({id});

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

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const {id, name } = values
    const success = await updateBudget({id, name });
    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return {
    handleClickOpen,
    handleClose,
    handleUpdate,
    requestErrors,
    handleExclude,
    open,
  }
}
