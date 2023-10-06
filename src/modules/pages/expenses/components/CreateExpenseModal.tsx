import { Form, Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { NumericFormat } from "react-number-format";
import styles from "../Expense.module.scss";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCreateExpenseModal } from '../hooks/useCreateExpenseModal';

export const CreateExpenseModal = ({open, onClose}: any) => {
  const { handleClose, handleCreate, modifiedValue, expenseKinds, installmentKind, setPrice, price, requestErrors, setDueDate } = useCreateExpenseModal({onClose})

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

            <FormControl>
              <InputLabel
                id={`kind-label`}
              >
                Recorrencia
              </InputLabel>

              <Select
                labelId={`kind-label`}
                name={`kind`}
                id={`kind`}
                label="Recorrencia"
                required

                onChange={handleChange}
                onBlur={handleBlur}
                value={values.kind}
                className={styles.select}
              >
                {expenseKinds.map((expense) => (
                  <MenuItem key={`${expense.name}`} value={expense.value} className={styles.menuItem}>{expense.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

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
