import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { useConfirm } from "material-ui-confirm";
import { useClient } from "@/modules/clients";
import styles from "./ClientBox.module.scss";


export const UpdateClientModal = ({open, handleClose, client}:any) => {
  const { updateClient, deleteClient, errors: requestErrors, setErrors} = useClient()
  const confirm = useConfirm();

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const { id, name, address, phone, gpsLink, referencePoint, district } = values
    const success = await updateClient({ id, name, address, phone, gpsLink, referencePoint, district });
    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o cliente', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteClient({id});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Cliente (#{client.id})</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            id: client.id,
            name: client.name,
            address: client.address,
            phone: client.phone,
            gpsLink: client.gpsLink,
            referencePoint: client.referencePoint,
            district: client.district,
          }}
          onSubmit={handleUpdate}
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
                autoFocus
                margin="dense"
              />

              <TextField
                name='phone'
                label="Celular"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                autoFocus
                margin="dense"
              />

              <TextField
                name='address'
                label="Endereco"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                autoFocus
                margin="dense"
              />

              <TextField
                name='district'
                label="Bairro"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                autoFocus
                margin="dense"
              />

              <TextField
                name='referencePoint'
                label="Referencia de endereco"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.referencePoint}
                autoFocus
                margin="dense"
              />

              <TextField
                name='gpsLink'
                label="Link GPS"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gpsLink}
                autoFocus
                margin="dense"
              />

              {requestErrors && <ErrorMessage messages={requestErrors} />}

              <DialogActions style={{display: "flex", flexDirection: 'column', gap: '5px'}}>
                <div style={{flexDirection: 'row'}}>
                  <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
                  <Button type="submit" variant="outlined">Atualizar</Button>
                </div>
                {/* @ts-ignore */}
                <Button color="error" onClick={() => handleExclude(values.id)} variant="outlined">Excluir</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
