import { useState } from "react";
import Head from "next/head";

import { useExpense, useBudget } from "@/modules/expenses";
import styles from "./Expense.module.scss";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { CreateExpenseModal } from "./components/CreateExpenseModal";
import { BudgetSelect } from "./components/BudgetSelect";
import { WarnModal } from "./components/WarnModal";
import Router from 'next/router'
import { ExpensesList } from "./components/ExpensesList";
import { MonthSelect } from "./components/MonthSelect";
import { TotalValues } from "./components/TotalValues";

export const ExpensesPage = () => {
  const { selectedBudgetId } = useBudget()
  const { expenses, setErrors } = useExpense()
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);

  const handleClickOpen = () => {
    if(!selectedBudgetId){
      setOpenWarn(true)
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  const handleAction = () => {
    setOpenWarn(false)
    Router.push('/budgets')
  }

  return (
    <>
      <Head>
        <title>Co-Finance - Expenses</title>
      </Head>

      <MonthSelect />

      <BudgetSelect />


      <div className={styles.content}>
        <CreateExpenseModal open={open} onClose={handleClose}/>
        <WarnModal
          open={openWarn}
          title="Selecione um orçamento"
          body="Para gerenciar os pedidos, selecione ou crie um orçamento de venda antes."
          handleClose={() => {
            setOpenWarn(false)
          }}
          action={{text: 'Criar Orçamento', handle: handleAction}}
          />

        <TotalValues />

        <ExpensesList expenses={expenses} />


        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};
