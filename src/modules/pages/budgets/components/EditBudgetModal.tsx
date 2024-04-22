import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import styles from "./BudgetBox.module.scss";
import { Budget } from "@/modules/transactions/domain/Budget";

type EditBudgetModalProps = {
  budget: Budget
  open: boolean
  onClose: () => void
  handleUpdate: (values: any, { setSubmitting }: any) => void
  handleExclude: (id: number) => void
}

export const EditBudgetModal = ({ budget, open, onClose, handleUpdate, handleExclude }: EditBudgetModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="black">Atualizar Orçamento (#{budget.id})</DialogTitle>
      <DialogContent className={styles.dialog_content}>
        <Formik
          initialValues={{ id: budget.id, name: budget.name }}
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

              <DialogActions style={{display: "flex", flexDirection: 'column', gap: '5px'}}>
                <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                  <Button onClick={onClose} color="warning" variant="outlined">Sair</Button>
                  <Button type="submit" variant="outlined">Atualizar</Button>
                </div>
                <Button color="error" onClick={() => handleExclude(values.id)} variant="outlined">Excluir</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
