import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

import { BudgetsList } from "./components/BudgetsList";
import { useBudget } from "@/modules/expenses";
import styles from "./Budget.module.scss";
import { CreateBudgetModal } from "./components/CreateBudgetModal";
import { Fab } from "@mui/material";

export const BudgetsPage = () => {
  const { budgets, setErrors } = useBudget()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  return (
    <>
      <Head>
        <title>Co-Finance - Budgets</title>
      </Head>

      <div className={styles.content}>
        <CreateBudgetModal open={open} onClose={handleClose}/>

        {!!budgets.length && <BudgetsList budgets={budgets}/>}

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};

