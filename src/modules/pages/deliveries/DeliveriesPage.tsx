import { useState } from "react";
import Head from "next/head";

import { useDelivery } from "@/modules/deliveries";
import styles from "./Delivery.module.scss";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { DeliveriesByState } from "./components/DeliveriesByState";
import Router from 'next/router'
import { WarnModal } from "../orders/components/WarnModal";
import { BudgetSelect } from "../orders/components/BudgetSelect";

export const DeliveriesPage = () => {
  const { deliveriesByState, setErrors } = useDelivery()
  const [openWarn, setOpenWarn] = useState(false);

  const handleAction = () => {
    setOpenWarn(false)
    Router.push('/budgets')
  }

  return (
    <>
      <Head>
        <title>Marmitex - Deliveries</title>
      </Head>

      <BudgetSelect />
      <div className={styles.content}>
        <WarnModal
          open={openWarn}
          title="Selecione um orçamento"
          body="Para gerenciar os pedidos, selecione ou crie um orçamento de venda antes."
          handleClose={() => {
            setOpenWarn(false)
          }}
          action={{text: 'Criar Orçamento', handle: handleAction}}
        />

        <DeliveriesByState deliveriesByState={deliveriesByState}/>
      </div>
    </>
  );
};
