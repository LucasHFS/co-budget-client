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
import { isNotEmpty } from "@/modules/utils/string";
import { NumericFormat } from "react-number-format";
import { useState } from 'react';
import { useExpense } from '@/modules/expenses';
import styles from "../Expense.module.scss";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";


export const CreateExpenseModal = ({open, onClose}: any) => {
  const { errors: requestErrors, createExpense, refetchExpenses } = useExpense()
  const [price, setPrice] = useState('')
  const [dueAt, setDueDate] = useState("");
  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const expenseKinds = [
    { value: 'once', name: 'Única' },
    { value: 'fixed', name: 'Fixa' },
    { value: 'installment', name: 'Parcelas' }
  ]

  const installmentKind = expenseKinds[2]

  const handleClose = () => {
    onClose()
  }

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      dueAt,
      price,
    }

    const success = await createExpense(data);

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Nova Despesa</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            name: '',
            kind: 'once',
            installmentNumber: 1,
          }}
          onSubmit={handleCreate}
        >
          {
          ({
            values,
            handleChange,
            handleBlur,
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
                  setDueDate(newValue?.format("DD/MM/YYYY"));
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
              {expenseKinds.map((expense) => (
                <MenuItem key={`${expense.name}`} value={expense.value} className={styles.menuItem}>{expense.name}</MenuItem>
              ))}
            </Select>

            { values.kind === installmentKind.value &&
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
