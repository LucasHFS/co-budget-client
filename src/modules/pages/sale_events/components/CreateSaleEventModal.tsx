import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { useState } from 'react';
import { useSaleEvent } from '@/modules/orders';
import styles from "../SaleEvent.module.scss";

export const CreateSaleEventModal = ({open, onClose}:any) => {
  const { createSaleEvent, errors: requestErrors } = useSaleEvent()

  const [date, setDate] = useState("");


  const modifiedValue = moment(moment(date,"DD/MM/YYYY"),"MM-DD-YYYY");

  const handleClose = () =>{
    //@ts-ignore
    setDate(null)
    onClose()
  }

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const {name} = values
    const success = await createSaleEvent({ name, date: date });

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle color="black">Novo Evento</DialogTitle>
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data"
                value={modifiedValue}
                onChange={(newValue) => {
//@ts-ignore
                  setDate(newValue?.format("DD/MM/YYYY"));
                }}
                renderInput={(params) => <TextField {...params} />}
                mask="__/__/____"
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>

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
