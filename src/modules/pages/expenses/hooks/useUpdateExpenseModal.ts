import { useState } from "react";
import moment from "moment";
import { parseDate } from "@/modules/utils/date";
import { Expense } from "@/modules/expenses/domain/Expense";
import { useExpense } from "@/modules/expenses";

export const useUpdateExpenseModal = ({expense, handleClose}: any) => {
  const [price, setPrice] = useState(expense.price)
  const { updateExpense, errors: requestErrors, payExpense, unpayExpense, refetchExpenses } = useExpense()
  const [dueAt, setDueAt] = useState(() => parseDate(expense.dueAt));

  //@ts-ignore
  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const targetExpenseOptions = [
    { value: 'one', name: 'Apenas esta' },
    { value: 'this_and_next', name: 'Essa e as proximas' },
    { value: 'all', name: 'Todas' }
  ]

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      id: expense.id,
      dueAt,
      price,
    }

    const success = await updateExpense(data);

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  const handlePayExpense = (id: number) => {
    payExpense(id)
    refetchExpenses()
    handleClose()
  };

  const handleUnpayExpense = (id: number) => {
    unpayExpense(id)
    refetchExpenses()
    handleClose()
  };

  return {
    handleUpdate,
    setDueAt,
    setPrice,
    price,
    modifiedValue,
    targetExpenseOptions,
    handleUnpayExpense,
    handlePayExpense,
    requestErrors,
  }
}
