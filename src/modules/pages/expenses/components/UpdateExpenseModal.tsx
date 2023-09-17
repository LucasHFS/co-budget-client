
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import { useExpense } from "@/modules/expenses";
import { useState } from "react";
import styles from "./ExpenseBox.module.scss";
import { NumericFormat } from "react-number-format";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { parseDate } from "@/modules/utils/date";

export const UpdateExpenseModal= ({ handleClose, open, expense }:any) => {
  const { updateExpense, errors: requestErrors } = useExpense()
  const [price, setPrice] = useState(expense.price)
  const [dueAt, setDueAt] = useState(() => parseDate(expense.dueAt));

  //@ts-ignore
  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const expenseKinds = {
    once: 'Única',
    fixed: 'Fixa',
    installment: 'Parcelas'
  }

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      id: expense.id,
      dueAt,
      price,
    }

    const success = await updateExpense(data);

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Despesa</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            name: expense.name,
            kind: expense.kind,
            installmentNumber: expense.installmentNumber,
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
              autoFocus
              margin="dense"
              name="name"
              label="Nome"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data"
              value={modifiedValue}
              onChange={(newValue) => {
//@ts-ignore
                setDueAt(newValue?.format("DD/MM/YYYY"));
              }}
              renderInput={(params) => <TextField {...params} />}
              mask="__/__/____"
              inputFormat="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <Select
            labelId={`kind-label`}
            name={`kind`}
            id={`kind`}
            label="Orçamento"
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.kind}

            sx={{ minWidth: '200px', color: '#e0e0e2' }}
          >
            {Object.entries(expenseKinds).map(([key, value]) => (
              <MenuItem key={key} value={key} sx={{ color: '#e0e0e2' }}>
                {value}
              </MenuItem>
            ))}
          </Select>

          { values.kind === 'installment' &&
            <TextField
              label="Parcelas"
              margin="dense"
              name="installmentNumber"
              id="installmentNumber"
              InputProps={{ inputProps: { min: 1 } }}
              required
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.installmentNumber}
              // sx={{ width: '80px' }}
            />
          }

            {requestErrors && <ErrorMessage messages={requestErrors} />}

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
