import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { NumericFormat } from 'react-number-format';
import { useState } from "react";
import { useProduct } from "@/modules/products";
import styles from "../Product.module.scss";

export const CreateProductModal = ({open, onClose}: any) => {
  const [price, setPrice] = useState('')
  const { createProduct, errors: requestErrors } = useProduct()

  const handleClose = () => {
    setPrice('')
    return onClose()
  }
  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const {name} = values
    const success = await createProduct({ name, price: parseFloat(price) });

    if(success){
      onClose()
    }

    setSubmitting(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Novo Produto</DialogTitle>
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

              <NumericFormat
                style={{color: 'black'}}
                name='price'
                label="Preço"
                onValueChange={(values,source) => {
                  setPrice(values.value)
                }}
                onBlur={handleBlur}
                value={price}
                required
                prefix='R$ '
                decimalSeparator=","
                customInput={TextField}
                valueIsNumericString
                allowNegative={false}
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
