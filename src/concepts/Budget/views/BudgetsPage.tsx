import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

import { BudgetsList } from "./BudgetList/BudgetsList";
import styles from "./Budget.module.scss";
import { CreateBudgetModal } from "./CreateBudgetModal/CreateBudgetModal";
import { Fab } from "@mui/material";
import { useFetchBudgets } from "../hooks/useFetchBudgets";

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <h2>Você ainda não possui nenhum orçamento</h2>
      <p>Crie um orçamento para começar a controlar suas finanças</p>
    </div>
  )
}

export const BudgetsPage = () => {
  const { budgets, isLoading } = useFetchBudgets()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Co-Finance - Budgets</title>
      </Head>

      <div className={styles.content}>
        <CreateBudgetModal open={open} onClose={handleClose}/>
        { isLoading ? "Carregando..." : budgets.length ? <BudgetsList budgets={budgets}/> : <EmptyState/> }

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen} id="add">
          <AddIcon/>
        </Fab>
      </div>
    </>
  );
};

