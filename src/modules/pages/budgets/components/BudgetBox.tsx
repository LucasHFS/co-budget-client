import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "./BudgetBox.module.scss";
import { useBudgetBox } from "../hooks/useBudgetBox";

export const BudgetBox = ({budget}: any) => {
  const { handleClickOpen, handleClose, handleUpdate, requestErrors, handleExclude, open, } = useBudgetBox()

  return (
    <>
      <div className={styles.box} onClick={handleClickOpen}>
        <div className={styles.title}>#{budget.id}</div>
        <div className={styles.title}>{budget.name}</div>
      </div>

      <Dialog open={open} onClose={handleClose}>
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
