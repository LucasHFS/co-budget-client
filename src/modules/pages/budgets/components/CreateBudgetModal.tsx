import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from 'formik';
import styles from "../Budget.module.scss";
import { useCreateBudget } from "@/modules/transactions/view/hooks/useCreateBudget";

export const CreateBudgetModal = ({open, onClose}:any) => {
  const { createBudget, isLoading } = useCreateBudget({ onSuccess: onClose})

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const {name} = values
    await createBudget({ name });

    setSubmitting(false);
  }

  const submitText = isLoading ? 'Criando...' : 'Criar'

  return (
    <Dialog open={open} onClose={onClose}>
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

            <DialogActions>
              <Button onClick={onClose} color="warning" variant="outlined">Sair</Button>
              <Button type="submit" variant="outlined">{submitText}</Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
  )
}
