
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
  const { updateExpense, errors: requestErrors, payExpense, unpayExpense, refetchExpenses } = useExpense()
  const [price, setPrice] = useState(expense.price)
  const [dueAt, setDueAt] = useState(() => parseDate(expense.dueAt));

  //@ts-ignore
  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const targetExpenseOptions = [
    { value: 'one', name: 'Apenas esta' },
    { value: 'this_and_next', name: 'Essa e as proximas' },
    { value: 'all', name: 'Todas' }
  ]

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

  const handlePayExpense = (id: number) => {
    payExpense(id)
    refetchExpenses()
    handleClose()
  };

  const handleUnpayExpense = (id: number) => {
    unpayExpense(id)
    refetchExpenses()
    handleClose()
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Despesa</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            name: expense.name,
            installmentNumber: expense.installmentNumber,
            targetExpenses: 'one',
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

          { expense.kind !== "once" &&
              <>
                <InputLabel id={`targetExpenses-label`}>Despesa Repetida, quais deseja editar?</InputLabel>
                <Select
                  labelId={`targetExpenses-label`}
                  name={`targetExpenses`}
                  id={`targetExpenses`}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.targetExpenses}

                  sx={{ minWidth: '200px', color: '#e0e0e2' }}
                >
                  {targetExpenseOptions.map((targetExpenses) => (
                    <MenuItem key={`${targetExpenses.name}`} value={targetExpenses.value} className={styles.menuItem}>{targetExpenses.name}</MenuItem>
                  ))}
                </Select>
              </>
            }


          {expense.status === "Pago" ?

            <Button onClick={() => handleUnpayExpense(expense.id)}>
              Remover Pagamento
            </Button>
            :
            <Button onClick={() => handlePayExpense(expense.id)}>
              Pagar
            </Button>
            }

            {requestErrors && <ErrorMessage messages={requestErrors} />}

            <DialogActions>
              <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
              <Button type="submit" variant="outlined">Atualizar</Button>
            </DialogActions>
          </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
