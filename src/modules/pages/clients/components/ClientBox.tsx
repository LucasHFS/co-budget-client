import { useState } from "react";

import { useClient } from "@/modules/clients";
import styles from "./ClientBox.module.scss";
import { Client } from "@/modules/clients/domain/Client";
import { UpdateClientModal } from "./UpdateClientModal";

export const ClientBox = ({client}: {client: Client}) => {
  const [open, setOpen] = useState(false);
  const { setErrors} = useClient()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  return (
    <>
      <div className={styles.box} onClick={handleClickOpen}>
        <div className={styles.title}>#{client.id}</div>
        <div className={styles.title}>{client.name}</div>
        <div className={styles.title}>{client.address}</div>
        <div className={styles.title}>{client.district}</div>
      </div>

      <UpdateClientModal open={open} handleClose={handleClose} client={client} />
    </>
  );
}
