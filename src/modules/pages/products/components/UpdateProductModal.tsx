import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { useConfirm } from "material-ui-confirm";
import { useProduct } from "@/modules/products";
import { NumericFormat } from "react-number-format";
import styles from "./ProductBox.module.scss";

export const UpdateProductModal = ({open, handleClose, product,price, setPrice}:any) => {
  const { updateProduct, deleteProduct, errors: requestErrors } = useProduct()

  const confirm = useConfirm();

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o produto', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteProduct({id});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const {id, name } = values
    const success = await updateProduct({id, name, price: parseFloat(price) });
    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Produto (#{product.id})</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{ id: product.id, name: product.name }}
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
                decimalScale={2}
              />

              {requestErrors && <ErrorMessage messages={requestErrors} />}

              <DialogActions style={{display: "flex", flexDirection: 'column', gap: '5px'}}>
                <div style={{flexDirection: 'row'}}>
                <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
                  <Button type="submit" variant="outlined">Atualizar</Button>
                </div>
                <Button color="error" onClick={() => handleExclude(values.id)} variant="outlined">Excluir</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
