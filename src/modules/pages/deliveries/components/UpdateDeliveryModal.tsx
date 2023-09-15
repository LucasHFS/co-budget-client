
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { useDelivery } from "@/modules/deliveries";
import styles from "./DeliveryBox.module.scss";

export const UpdateDeliveryModal= ({ handleClose, open, delivery }:any) => {
  const { updateDelivery, errors: requestErrors } = useDelivery()

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const success = await updateDelivery({
      // todo: fill params
    });

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Entrega</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            // todo: fill params
          }}
          onSubmit={handleUpdate}
        >
          {
          ({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setValues,
          }) => (
            <Form className={styles.form}>

              <DialogActions style={{display: "flex", flexDirection: 'column', gap: '5px'}}>
                <div style={{flexDirection: 'row', gap: '5px'}}>
                  <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
                  <Button type="submit" variant="outlined">Atualizar</Button>
                </div>
  {/* @ts-ignore */}
                <Button color="error" onClick={() => handleExclude(delivery.id)} variant="outlined">Excluir</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
