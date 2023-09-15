import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { useBudget } from '@/modules/orders';
import styles from "../Budget.module.scss";

export const CreateBudgetModal = ({open, onClose}:any) => {
  const { createBudget, errors: requestErrors } = useBudget()


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
              required
            />

            {requestErrors && <ErrorMessage messages={requestErrors} />}

            <DialogActions>
              <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
              <Button type="submit" variant="outlined">Cadastrar</Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
  )
}
