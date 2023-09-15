import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { useConfirm } from "material-ui-confirm";
import { useDriver } from "@/modules/drivers";
import styles from "./DriverBox.module.scss";

export const UpdateDriverModal = ({open, handleClose, driver}:any) => {
  const { updateDriver, deleteDriver, errors: requestErrors, setErrors} = useDriver()
  const confirm = useConfirm();

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const { id, name, phone } = values
    const success = await updateDriver({ id, name, phone });
    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o drivere', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteDriver({id});

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
      <DialogTitle color="black">Atualizar Motorista (#{driver.id})</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            id: driver.id,
            name: driver.name,
            phone: driver.phone,
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
