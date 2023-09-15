import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

import { SaleEventsList } from "./components/SaleEventsList";
import { useSaleEvent } from "@/modules/orders";
import styles from "./SaleEvent.module.scss";
import { CreateSaleEventModal } from "./components/CreateSaleEventModal";
import { Fab } from "@mui/material";

export const SaleEventsPage = () => {
  const { saleEvents, setErrors } = useSaleEvent()

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
        <title>Marmitex - SaleEvents</title>
      </Head>

      <div className={styles.content}>
        <CreateSaleEventModal open={open} onClose={handleClose}/>

        {!!saleEvents.length && <SaleEventsList saleEvents={saleEvents}/>}

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};

