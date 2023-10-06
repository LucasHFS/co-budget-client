
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import Select from '@mui/material/Select';
import styles from "./ExpenseBox.module.scss";
import { NumericFormat } from "react-number-format";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useUpdateExpenseModal } from "../hooks/useUpdateExpenseModal";

export const UpdateExpenseModal= ({ handleClose, open, expense }:any) => {

  const {
    handleUpdate,
    handleExclude,
    setDueAt,
    setPrice,
    price,
    modifiedValue,
    targetExpenseOptions,
    handleUnpayExpense,
    handlePayExpense,
    requestErrors,
  } = useUpdateExpenseModal({expense, handleClose})

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
                  <InputLabel id={`targetExpenses-label`}>Despesa recorrente, quais editar?</InputLabel>
                  <Select
                    labelId={`targetExpenses-label`}
                    name={`targetExpenses`}
                    id={`targetExpenses`}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.targetExpenses}

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
              <Button variant="contained" onClick={() => handleExclude(expense)} color= "error">Excluir</Button>
              <Button type="submit" variant="outlined">Atualizar</Button>
            </DialogActions>
          </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
