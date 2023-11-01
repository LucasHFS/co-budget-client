import { Form, Formik } from 'formik';
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { NumericFormat } from "react-number-format";
import styles from "../Transaction.module.scss";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCreateTransactionModal } from '../hooks/useCreateTransactionModal';

export const CreateTransactionModal = ({open, onClose}: any) => {
  const { handleClose, handleCreate, modifiedValue, transactionKinds, installmentKind, setPrice, price, requestErrors, setDueDate } = useCreateTransactionModal({onClose})

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Nova Transação</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            name: '',
            kind: 'once',
            transactionType: 'expense',
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
                renderInput={(params) => <TextField required {...params} />}
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
                {transactionKinds.map((transaction) => (
                  <MenuItem key={`${transaction.name}`} value={transaction.value} className={styles.menuItem}>{transaction.name}</MenuItem>
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

            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={values.transactionType}
                onChange={handleChange}
              >
                <FormControlLabel value="expense" control={<Radio required />} name='transactionType' label="Despesa" />
                <FormControlLabel value="income" control={<Radio required />} name='transactionType' label="Receita" />
              </RadioGroup>
            </FormControl>

              {requestErrors && <ErrorMessage messages={requestErrors} />}

              <DialogActions>
                <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
                <Button type="submit" variant="outlined">Criar</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
