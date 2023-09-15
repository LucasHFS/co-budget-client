import { useState } from "react";
import Head from "next/head";

import { useOrder, useBudget } from "@/modules/orders";
import styles from "./Order.module.scss";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { CreateOrderModal } from "./components/CreateOrderModal";
import { BudgetSelect } from "./components/BudgetSelect";
import { OrdersByState } from "./components/OrdersByState";
import { WarnModal } from "./components/WarnModal";
import Router from 'next/router'

export const OrdersPage = () => {
  const { selectedBudgetId } = useBudget()
  const { ordersByState, setErrors } = useOrder()
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
        <title>Marmitex - Orders</title>
      </Head>

      <BudgetSelect />
      <div className={styles.content}>
        <CreateOrderModal open={open} onClose={handleClose}/>
        <WarnModal
          open={openWarn}
          title="Selecione um orçamento"
          body="Para gerenciar os pedidos, selecione ou crie um orçamento de venda antes."
          handleClose={() => {
            setOpenWarn(false)
          }}
          action={{text: 'Criar Orçamento', handle: handleAction}}
          />

        <OrdersByState ordersByState={ordersByState}/>

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};