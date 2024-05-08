import { useState } from "react";
import Head from "next/head";

import { useBudget } from "@/concepts/transactions";
import styles from "./Transaction.module.scss";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { CreateTransactionModal } from "./components/CreateTransactionModal";
import { BudgetSelect } from "./components/BudgetSelect";
import { WarnModal } from "./components/WarnModal";
import Router from 'next/router'
import { TransactionsList } from "./components/TransactionsList";
import { MonthSelect } from "./components/MonthSelect";
import { TotalValues } from "./components/TotalValues";
import { useFetchTransactions } from "@/concepts/transactions/view/hooks/useFetchTransactions";

export const TransactionsPage = () => {
  const { transactions, isLoading, error } = useFetchTransactions()

  const { selectedBudgetId } = useBudget()
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
  };

  const handleAction = () => {
    setOpenWarn(false)
    Router.push('/budgets')
  }

  return (
    <>
      <Head>
        <title>Co-Finance - Transactions</title>
      </Head>

      <MonthSelect />

      <BudgetSelect />

      <div className={styles.content}>
        <CreateTransactionModal open={open} onClose={handleClose}/>
        <WarnModal
          open={openWarn}
          title="Selecione um orçamento"
          body="Para gerenciar os pedidos, selecione ou crie um orçamento de venda antes."
          handleClose={() => {
            setOpenWarn(false)
          }}
          action={{text: 'Criar Orçamento', handle: handleAction}}
          />

        <TotalValues transactions={transactions}/>

        <TransactionsList transactions={transactions} isLoading={isLoading}/>

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};
