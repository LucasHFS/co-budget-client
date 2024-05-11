import { useState } from "react";
import Head from "next/head";

import styles from "./Transaction.module.scss";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { CreateTransactionModal } from "./CreateTransactionModal/CreateTransactionModal";
import { BudgetSelect } from "./BudgetSelect";
import { WarnModal } from "./WarnModal";
import Router from 'next/router'
import { TransactionsList } from "./TransactionList/TransactionsList";
import { MonthSelect } from "./MonthSelect/MonthSelect";
import { TotalValues } from "./TotalValues/TotalValues";
import { useBudget } from "@/concepts/Budget/hooks/useBudget";
import { useFetchTransactions } from "../hooks/useFetchTransactions";

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

        <Fab className={styles.floating_button} color="primary" aria-label="add" id="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};
