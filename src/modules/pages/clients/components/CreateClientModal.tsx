import { useClient } from "@/modules/clients";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "../Client.module.scss";

export const CreateClientModal = ({open, onClose}:any) => {
  const { createClient, errors: requestErrors } = useClient()

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const { name, address, district, phone, gpsLink, referencePoint } = values
    const success = await createClient({ name, address, district, phone, gpsLink, referencePoint });

    if(success){
      onClose()
    }

    setSubmitting(false);
  }

  return(
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="black">Novo Cliente</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{ name: '', address: '', phone: '', district:'', gpsLink: '', referencePoint: '' }}
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

              <TextField
                name='address'
                label="Endereco"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />

              <TextField
                name='district'
                label="Bairro"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
              />

              <TextField
                name='referencePoint'
                label="Referencia de Endereco"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.referencePoint}
              />

              <TextField
                name='gpsLink'
                label="Link de GPS"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gpsLink}
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
