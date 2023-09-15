import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

import { DriversList } from "./components/DriversList";
import { useDriver } from "@/modules/drivers";
import styles from "./Driver.module.scss";
import { CreateDriverModal } from "./components/CreateDriverModal";
import { Fab } from "@mui/material";

export const DriversPage = () => {
  const { drivers, setErrors } = useDriver()

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
        <title>Marmitex - Drivers</title>
      </Head>
      <div className={styles.content}>
        <CreateDriverModal open={open} onClose={handleClose}/>

        {!!drivers.length && <DriversList drivers={drivers}/>}

        <Fab className={styles.floating_button} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon color="primary"/>
        </Fab>
      </div>
    </>
  );
};

