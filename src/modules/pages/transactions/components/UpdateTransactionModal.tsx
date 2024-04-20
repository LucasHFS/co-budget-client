
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import Select from '@mui/material/Select';
import styles from "./TransactionBox.module.scss";
import { NumericFormat } from "react-number-format";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useUpdateTransactionModal } from "../hooks/useUpdateTransactionModal";

export const UpdateTransactionModal= ({ handleClose, open, transaction }:any) => {
  const payText = transaction.transactionType == 'expense' ? 'Pagar' : 'Receber'
  const unpayText = transaction.transactionType == 'expense' ? 'Remover pagamento' : 'Remover recebimento'

  const {
    handleUpdate,
    handleExclude,
    setDueAt,
    setPrice,
    price,
    modifiedValue,
    targetTransactionOptions,
    handleUnpayTransaction,
    handlePayTransaction,
  } = useUpdateTransactionModal({transaction, handleClose})

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="black">Atualizar Despesa</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{
            name: transaction.name,
            transactionType: transaction.transactionType,
            installmentNumber: transaction.installmentNumber,
            targetTransactions: 'one',
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

          { transaction.kind !== "once" &&
              <>
                  <InputLabel id={`targetTransactions-label`}>Despesa recorrente, quais editar?</InputLabel>
                  <Select
                    labelId={`targetTransactions-label`}
                    name={`targetTransactions`}
                    id={`targetTransactions`}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.targetTransactions}

                  >
                    {targetTransactionOptions.map((targetTransactions) => (
                      <MenuItem key={`${targetTransactions.name}`} value={targetTransactions.value} className={styles.menuItem}>{targetTransactions.name}</MenuItem>
                    ))}
                  </Select>

              </>
            }

            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={values.transactionType}
                onChange={handleChange}
              >
                <FormControlLabel value="expense" control={<Radio required />} name='transactionType' label="Despesa" />
                <FormControlLabel value="income" control={<Radio required />} name='transactionType' label="Receita" />
              </RadioGroup>
            </FormControl>


          {transaction.status === "pago" ?

            <Button color="warning" variant='outlined' onClick={() => handleUnpayTransaction(transaction.id)}>
              {unpayText}
            </Button>
            :
            <Button color="success" variant='outlined' onClick={() => handlePayTransaction(transaction.id)}>
              {payText}
            </Button>
            }

            {/* {requestErrors && <ErrorMessage messages={requestErrors} />} */}

            <DialogActions>
              <Button onClick={handleClose} color="warning" variant="outlined">Sair</Button>
              <Button variant="contained" onClick={() => handleExclude(transaction)} color= "error">Excluir</Button>
              <Button type="submit" variant="outlined">Atualizar</Button>
            </DialogActions>
          </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
