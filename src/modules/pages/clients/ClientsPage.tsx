import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

import { ClientsList } from "./components/ClientsList";
import { useClient } from "@/modules/clients";
import styles from "./Client.module.scss";
import { CreateClientModal } from "./components/CreateClientModal";
import { Fab } from "@mui/material";

export const ClientsPage = () => {
  const { clients, setErrors } = useClient()

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
        <title>Marmitex - Clients</title>
      </Head>
      <div className={styles.content}>
        <CreateClientModal open={open} onClose={handleClose}/>

        {!!clients.length && <ClientsList clients={clients}/>}

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};

