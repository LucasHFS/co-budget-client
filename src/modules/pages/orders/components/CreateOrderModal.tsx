import { Form, Formik, FieldArray } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, ToggleButton, ToggleButtonGroup, Select } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useClient } from "@/modules/clients/view/hooks/useClient";
import { isNotEmpty } from "@/modules/utils/string";
import { useProduct } from "@/modules/products";
import { NumericFormat } from "react-number-format";
import { useState } from 'react';
import { useOrder } from '@/modules/orders';
import styles from "../Order.module.scss";

export const CreateOrderModal = ({open, onClose}: any) => {
  const { errors: requestErrors, createOrder, refetchOrders } = useOrder()

  const { clients } = useClient()
  const [clientId, setClientId] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [isDelivery, setIsDelivery] = useState(true)
  const clientsWithName = clients.filter((client) => isNotEmpty(client.name))
  const { products } = useProduct()

  const calculateTotal = (formikProducts: {quantity: number, id:number}[]) => {
    //@ts-ignore
    return formikProducts.reduce((sum, formikProduct) => {
      const productPrice = products.find(p => p.id === formikProduct.id)?.price
      if(productPrice)
        return sum + (formikProduct.quantity * productPrice)
    }, 0)
  }

  const handleClose = () => {
    setIsDelivery(true)

    onClose()
  }

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    let client = {
      address: values.address,
      phone: values.phone,
      referencePoint: values.referencePoint,
      gpsLink: values.gpsLink,
      district: values.district,
    }

    if(clientId) {
  //@ts-ignore
      client = {...client, id: clientId}
    } else {
  //@ts-ignore
      client = {...client, name: values.client}
    }
  //@ts-ignore
    const products = values.products.map(p => ({
      id: p.id,
      quantity: parseInt(p.quantity),
    }))

    const success = await createOrder({
      client,
      products,
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
      <DialogTitle color="black">Novo Pedido</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{ client: '', products:[{id:null, quantity: 1}], address: '', district:'', referencePoint: '', phone: '', gpsLink: '', notes: ''}}
          onSubmit={handleCreate}
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
              <Autocomplete
                freeSolo
                onBlur={handleBlur}
                value={values.client}
                onChange={(e, newValue)=>{
  //@ts-ignore
                  const foundClient = clients.find((client) => client.id == newValue?.value)

                  if(foundClient){
                    // @ts-ignore
                    setSelectedClient(foundClient)
                    setFieldValue('client', newValue)
                    setFieldValue('address', foundClient.address)
                    setFieldValue('phone', foundClient.phone)
                    setFieldValue('district', foundClient.district)
                    setFieldValue('gpsLink', foundClient.gpsLink)
                    setFieldValue('referencePoint', foundClient.referencePoint)
  //@ts-ignore
                    setClientId(foundClient.id)
                  } else {
  //@ts-ignore
                    setSelectedClient(null)
                  }
                }}
                options={clientsWithName.map((client) => ({ label: client.name, value: client.id, }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cliente"
                    margin="dense"
                    name="client"
                    required
                    onChange={e => {
  //@ts-ignore
                      if(selectedClient?.id)
  //@ts-ignore
                        setClientId(null)
                      handleChange(e)
                    }}
                    value={values.client}
                  />)}
              />

              <FieldArray name="products">
                {({ push, remove }) => (
                  <div>
                    {values.products.map((product, index) => (
                      <div key={index} className={styles.productRow} >
                        <FormControl className={styles.dynamicFields}>
                          <div className={styles.productRow}>
                            <InputLabel id={`product-label${index}`}>Produto</InputLabel>
                            <Select
                              labelId={`product-label${index}`}
                              name={`products[${index}].id`}
                              id={`products[${index}].id`}
                              value={product.id}
                              label="Produto"
                              required
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
                              margin="dense"
                              name={`products[${index}].quantity`}
                              id={`products[${index}].quantity`}
                              value={product.quantity}
                              InputProps={{ inputProps: { min: 1 } }}
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
                        <Button variant="outlined" color="error" onClick={() => remove(index)}>Remover</Button>

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
              <DialogActions>
                <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
                <Button type="submit" variant="outlined">Cadastrar</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
