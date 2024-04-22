import { useBudget } from "@/modules/transactions";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useRouter } from 'next/router'
import { useUpdateBudget } from "@/modules/transactions/view/hooks/useUpdateBudget";
import { useDeleteBudget } from "@/modules/transactions/view/hooks/useDeleteBudget";

export const useBudgetBox = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setSelectedBudgetId } = useBudget()

  const confirm = useConfirm();

  const handleClose = () => {
    setOpen(false);
  };

  const { updateBudget, isLoading, } = useUpdateBudget({ onSuccess: handleClose })

  const { deleteBudget } = useDeleteBudget({ onSuccess: handleClose })

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o Orçamento', titleProps: { color: 'black'}})
      .then(async()=>{
        await deleteBudget(id);
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const {id, name } = values

    await updateBudget({id, name });

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
    handleExclude,
    isLoading,
    open,
    handleSelectedBudgetId,
  }
}
