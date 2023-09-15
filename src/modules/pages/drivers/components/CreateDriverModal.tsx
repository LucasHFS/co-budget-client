import { useDriver } from "@/modules/drivers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "../Driver.module.scss";

export const CreateDriverModal = ({open, onClose}:any) => {
  const { createDriver, errors: requestErrors } = useDriver()

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const { name, address, district, phone, gpsLink, referencePoint } = values
    const success = await createDriver({ name, address, district, phone, gpsLink, referencePoint });

    if(success){
      onClose()
    }

    setSubmitting(false);
  }

  return(
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="black">Novo Motorista</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{ name: '', phone: '' }}
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

              <TextField
                name='phone'
                label="Celular"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />

              {requestErrors && <ErrorMessage messages={requestErrors} />}

              <DialogActions>
                <Button onClick={onClose} color="warning" variant="contained">Sair</Button>
                <Button type="submit" variant="contained">Cadastrar</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
