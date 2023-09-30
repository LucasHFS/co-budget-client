import { useState } from "react";
import moment from "moment";
import { useExpense } from '@/modules/expenses';

export const useCreateExpenseModal = ({onClose}: any) => {
  const [price, setPrice] = useState('')
  const [dueAt, setDueDate] = useState("");

  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");
  const { errors: requestErrors, createExpense, refetchExpenses } = useExpense()

  const expenseKinds = [
    { value: 'once', name: 'Única' },
    { value: 'fixed', name: 'Fixa' },
    { value: 'installment', name: 'Parcelas' }
  ]

  const installmentKind = expenseKinds[2]

  const handleClose = () => {
    onClose()
  }

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      dueAt,
      price,
    }
    console.log({data})
    const success = await createExpense(data);
    console.log({success})

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return {
    handleClose,
    handleCreate,
    modifiedValue,
    expenseKinds,
    installmentKind,
    setPrice,
    price,
    requestErrors,
    setDueDate,
  }
}
