import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { Formik } from "formik";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "./BudgetBox.module.scss";
import { useBudgetBox } from "../hooks/useBudgetBox";
import EditIcon from '@mui/icons-material/Edit';


export const BudgetBox = ({budget}: any) => {
  const { handleClickOpen, handleClose, handleUpdate, requestErrors, handleExclude, open, handleSelectedBudgetId } = useBudgetBox()

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}} className={styles.box}>
        <div style={{flex: 3}} onClick={() => handleSelectedBudgetId(budget.id)}>
          <div className={styles.title}>#{budget.id}</div>
          <div className={styles.title}>{budget.name}</div>
        </div>

        <div style={{ flex: 1}}>
          <Fab aria-label="edit" onClick={handleClickOpen}>
            {/* @ts-ignore */}
            <EditIcon className={styles.editIcon}/>
          </Fab>
        </div>
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
                  <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
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
