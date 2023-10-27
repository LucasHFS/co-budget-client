import { useTransaction } from "@/modules/transactions";
import { useState } from "react";

export const useTransactionBox = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  const { setErrors } = useTransaction()

  return {
    handleClickOpen,
    handleClose,
    open,
  }
}
