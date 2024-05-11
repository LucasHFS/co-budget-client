import { useState } from "react";
import moment from "moment";
import { useCreateTransaction } from "./useCreateTransaction";

export const useCreateTransactionModal = ({onClose}: any) => {
  const [price, setPrice] = useState('')
  const [dueAt, setDueDate] = useState(moment(new Date()).format("DD/MM/YYYY"));

  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const onSuccess = () => {
    setPrice('')
    setDueDate(moment(new Date()).format("DD/MM/YYYY"))
    handleClose()
  }

  const { createTransaction, isLoading } = useCreateTransaction({ onSuccess })

  const transactionKinds = [
    { value: 'once', name: 'Única' },
    { value: 'fixed', name: 'Fixa' },
    { value: 'installment', name: 'Parcelas' }
  ]

  const installmentKind = transactionKinds[2]

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

    await createTransaction(data);

    setSubmitting(false);
  }

  return {
    handleClose,
    handleCreate,
    modifiedValue,
    transactionKinds,
    installmentKind,
    setPrice,
    price,
    setDueDate,
    submitText: isLoading ? 'Criando...' : 'Criar'
  }
}
