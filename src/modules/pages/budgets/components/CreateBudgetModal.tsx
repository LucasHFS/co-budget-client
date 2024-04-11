import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "../Budget.module.scss";
import { useCreateBudget } from "@/modules/transactions/view/hooks/useCreateBudget";

export const CreateBudgetModal = ({open, onClose}:any) => {
  const { createBudget, isLoading, errors: requestErrors} = useCreateBudget()

  const handleClose = () =>{
    onClose()
  }

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const {name} = values
    const success = await createBudget({ name });

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  const submitText = isLoading ? 'Criando...' : 'Criar'

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle color="black">Novo Orçamento</DialogTitle>
    <DialogContent className={styles.dialog_content}>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={handleCreate}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              name='name'
              label="Nome"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              autoFocus
              required
            />

            {requestErrors && <ErrorMessage messages={requestErrors} />}

            <DialogActions>
              <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
              <Button type="submit" variant="outlined">{submitText}</Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
  )
}
