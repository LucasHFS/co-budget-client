import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

import { BudgetsList } from "./components/BudgetsList";
import styles from "./Budget.module.scss";
import { CreateBudgetModal } from "./components/CreateBudgetModal";
import { Fab } from "@mui/material";
import useFetchBudgets from "@/modules/transactions/view/hooks/useFetchBudgets";

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <h2>Você ainda não possui nenhum orçamento</h2>
      <p>Crie um orçamento para começar a controlar suas finanças</p>
    </div>
  )
}

export const BudgetsPage = () => {
  // const { setErrors } = useBudget()
  const { budgets, isLoading, errors } = useFetchBudgets()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setErrors([])
  };

  return (
    <>
      <Head>
        <title>Co-Finance - Budgets</title>
      </Head>

      <div className={styles.content}>
        <CreateBudgetModal open={open} onClose={handleClose}/>

        { budgets.length ? <BudgetsList budgets={budgets}/> : <EmptyState/> }

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon/>
        </Fab>
      </div>
    </>
  );
};

