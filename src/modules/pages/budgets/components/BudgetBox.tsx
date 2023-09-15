import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import { useConfirm } from "material-ui-confirm";

import { useBudget } from "@/modules/orders";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";
import styles from "./BudgetBox.module.scss";
import Link from "next/link";

export const BudgetBox = ({budget}: any) => {
  const [open, setOpen] = useState(false);
  const { updateBudget, deleteBudget, errors: requestErrors, setErrors } = useBudget()


  const confirm = useConfirm();

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o Orçamento', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteBudget({id});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const {id, name } = values
    const success = await updateBudget({id, name });
    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.title}>#{budget.id}</div>
        <div className={styles.title}>{budget.name}</div>
        <div className={styles.title}>
          <Link className={styles.title} href={`/budgets/${budget.id}`}>Expenses</Link>
          <br/>
          <br/>
          <span onClick={handleClickOpen}>edit</span>
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
