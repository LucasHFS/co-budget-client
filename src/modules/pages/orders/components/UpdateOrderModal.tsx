
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import { useProduct } from "@/modules/products";
import { useOrder } from "@/modules/orders";
import { useState } from "react";
import styles from "./OrderBox.module.scss";
import { NumericFormat } from "react-number-format";

export const UpdateOrderModal= ({ handleClose, open, order }:any) => {
  const [removedProducts, setRemovedProducts] = useState([]);
  const { updateOrder, errors: requestErrors } = useOrder()
  const { products } = useProduct()
  const [isDelivery, setIsDelivery] = useState(order.isDelivery)

  const calculateTotal = (cart: {quantity: number, id:number}[]) => {
    //@ts-ignore
    const total = cart.reduce((sum, {quantity, id}) => {
      const productPrice = products.find(p => p.id === id)?.price
      if(productPrice)
        return sum + (quantity * productPrice)
    }, 0)
    return total
  }


  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const client = {
      id: values.client.id,
      name: values.client.name,
      address: values.address,
      phone: values.phone,
      district: values.district,
      referencePoint: values.referencePoint,
      gpsLink: values.gpsLink,
    }

    const success = await updateOrder({
      id: order.id,
      client,
      products: [...values.products, ...removedProducts],
      isDelivery: isDelivery,
      notes: values.notes,
    });

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Pedido</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            client: { id: order.client.id, name: order.client.name,},
            /* @ts-ignore */
            products: order.products.map(p => ({id: p.id, quantity: p.quantity})),
            address: order.client.address,
            phone: order.client.phone,
            district:order.client.district,
            referencePoint: order.client.referencePoint,
            gpsLink: order.client.gpsLink,
            notes: order.notes
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
              <TextField
                disabled
                value={values.client.name}
                name="client"
                label="Cliente"
                margin="dense"
              />

              <FieldArray name="products">
                {({ push, remove }) => (
                  <div>
                    {/* @ts-ignore */}
                    {values.products.map((product, index) => (
                      <div key={`update-modal-${index}`} className={styles.productRow} >
                        <FormControl className={styles.dynamicFields}>
                          <div className={styles.productRow}>
                            <InputLabel margin="dense" id={`product-label${index}`}>Produto</InputLabel>
                            <Select
                              margin="dense"
                              labelId={`product-label${index}`}
                              name={`products[${index}].id`}
                              id={`products[${index}].id`}
                              value={product?.id || ''}
                              label="Produto"
                              onChange={(e) => {
                                const newProducts = [...values.products];
                                newProducts[index] = {
                                  ...newProducts[index],
  //@ts-ignore
                                  id: e.target.value,
                                };
                                setFieldValue('products', newProducts);
                              }}
                              sx={{ minWidth: '200px' }}
                            >
                              {products.map((product) => (
                                <MenuItem key={product.name} value={product.id} className={styles.menuItem}>{product.name}</MenuItem>
                              ))}
                            </Select>

                            <TextField
                              label="Quantidade"
                              InputProps={{ inputProps: { min: 1 } }}
                              margin="dense"
                              name={`products[${index}].quantity`}
                              id={`products[${index}].quantity`}
                              value={product.quantity}
                              required
                              type="number"
                              sx={{ width: '80px' }}
                              onChange={(e) => {
                                const newProducts = [...values.products];
                                newProducts[index] = {
                                  ...newProducts[index],
                                  //@ts-ignore
                                  quantity: e.target.value,
                                };
                                setFieldValue('products', newProducts);
                              }}
                            />
                            {/* @ts-ignore */}
                          </div>
                        </FormControl>
                        <Button variant="outlined" color="error" onClick={() => {
                          remove(index)
  //@ts-ignore
                          setRemovedProducts([...removedProducts, { id: product.id, remove: true }]);
                        }}>Remover</Button>

                        { product.id && (
                          <>
                            <NumericFormat
                              prefix="R$  "
                              displayType="text"
                              // @ts-ignore
                              value={parseFloat(products.find((p) => product.id == p.id )?.price * (product.quantity)).toFixed(2)}
                            />
                          </>
                        )}
                      </div>
                    ))}
                    <Button variant="outlined" onClick={() => push({ id: null, quantity: 1 })}>+ Produto</Button>
                  </div>
                )}
              </FieldArray>

              <ToggleButtonGroup
                color="primary"
                value={isDelivery}
                exclusive
                onChange={(e, newValue) => {
                  setIsDelivery(newValue)
                }}
                aria-label="Platform"
                className={styles.buttonGroup}
              >
                <ToggleButton value={false}>Retirada no local</ToggleButton>
                <ToggleButton value={true}>Para entrega</ToggleButton>
              </ToggleButtonGroup>

              <TextField
                autoFocus
                margin="dense"
                name="phone"
                label="Celular"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />

              {isDelivery && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="address"
                    label="Endereço"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    name="district"
                    label="Bairro"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.district}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    name="referencePoint"
                    label="Referência do endereço"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.referencePoint}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    name="gpsLink"
                    label="Link do GPS"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gpsLink}
                  />
                </>
              )}

              <TextField
                name="notes"
                label="Observações"
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.notes}
              />

              {requestErrors && <ErrorMessage messages={requestErrors} />}

              <span style={{textAlign: 'center'}}>Valor Total: <NumericFormat
                              prefix="R$  "
                              displayType="text"
                              // @ts-ignore
                              value={parseFloat(calculateTotal(values.products)).toFixed(2)}
                            /></span>

              <DialogActions style={{display: "flex", flexDirection: 'column', gap: '5px'}}>
                <div style={{flexDirection: 'row', gap: '5px'}}>
                  <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
                  <Button type="submit" variant="outlined">Atualizar</Button>
                </div>
  {/* @ts-ignore */}
                <Button color="error" onClick={() => handleExclude(order.id)} variant="outlined">Excluir</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
