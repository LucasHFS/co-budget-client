import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import { useConfirm } from "material-ui-confirm";

import { useSaleEvent } from "@/modules/orders";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "./SaleEventBox.module.scss";
import { formatDate, parseDate, ptBrToDDMMYYY } from "@/modules/utils/date";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

export const SaleEventBox = ({saleEvent}: any) => {
  const [open, setOpen] = useState(false);
  const { updateSaleEvent, deleteSaleEvent, errors: requestErrors, setErrors } = useSaleEvent()
  const [date, setDate] = useState(() => {
    parseDate(saleEvent.date)
  });

  //@ts-ignore
  const modifiedValue = moment(moment(date,"DD/MM/YYYY"),"MM-DD-YYYY");

  const confirm = useConfirm();

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o Evento', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteSaleEvent({id});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleClickOpen = () => {
    const utcDate = (new Date(saleEvent.date)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
  //@ts-ignore
    setDate(utcDate)

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  //@ts-ignore
    setDate('')
  };

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const {id, name } = values
    const success = await updateSaleEvent({id, name, date: date });
    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <>
      <div className={styles.box} onClick={handleClickOpen}>
        <div className={styles.title}>#{saleEvent.id}</div>
        <div className={styles.title}>{saleEvent.name}</div>
        <div className={styles.title}>{formatDate(saleEvent.date)}</div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="black">Atualizar Evento (#{saleEvent.id})</DialogTitle>
        <DialogContent className={styles.dialog_content}>
          <Formik
            initialValues={{ id: saleEvent.id, name: saleEvent.name, date: saleEvent.date }}
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
    </>
  );
}
