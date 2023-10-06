import { useExpense } from "@/modules/expenses";
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

  const { setErrors } = useExpense()

  return {
    handleClickOpen,
    handleClose,
    open,
  }
}
