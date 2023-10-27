import { useBudget } from "@/modules/transactions";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useRouter } from 'next/router'

export const useBudgetBox = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { updateBudget, deleteBudget, errors: requestErrors, setErrors, setSelectedBudgetId } = useBudget()

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

  const handleSelectedBudgetId = (id: number) => {
    setSelectedBudgetId(id)
    router.push('/', undefined, { shallow: true })

  }

  return {
    handleClickOpen,
    handleClose,
    handleUpdate,
    requestErrors,
    handleExclude,
    open,
    handleSelectedBudgetId,
  }
}
