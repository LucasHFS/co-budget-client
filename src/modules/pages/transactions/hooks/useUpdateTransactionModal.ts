import { useState } from "react";
import moment from "moment";
import { parseDate } from "@/modules/utils/date";
import { Transaction } from "@/modules/transactions/domain/Transaction";
import { useTransaction } from "@/modules/transactions";
import { useConfirm } from "material-ui-confirm";

export const useUpdateTransactionModal = ({transaction, handleClose}: any) => {
  const [price, setPrice] = useState(transaction.price)
  const { updateTransaction, errors: requestErrors, payTransaction, unpayTransaction, refetchTransactions } = useTransaction()
  const [dueAt, setDueAt] = useState(() => parseDate(transaction.dueAt));

  //@ts-ignore
  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const targetTransactionOptions = [
    { value: 'one', name: 'Apenas esta' },
    { value: 'this_and_next', name: 'Essa e as proximas' },
    { value: 'all', name: 'Todas' }
  ]

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      id: transaction.id,
      dueAt,
      price,
    }

    const success = await updateTransaction(data);

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  const { deleteTransaction, setErrors } = useTransaction()

  const confirm = useConfirm();
  // @ts-ignore
  const handleExclude = async (transaction) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira a despesa', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteTransaction({id: transaction.id, targetTransactions: 'one'});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handlePayTransaction = (id: number) => {
    payTransaction(id)
    refetchTransactions()
    handleClose()
  };

  const handleUnpayTransaction = (id: number) => {
    unpayTransaction(id)
    refetchTransactions()
    handleClose()
  };

  return {
    handleUpdate,
    setDueAt,
    setPrice,
    price,
    modifiedValue,
    targetTransactionOptions,
    handleUnpayTransaction,
    handlePayTransaction,
    requestErrors,
    handleExclude,
  }
}
