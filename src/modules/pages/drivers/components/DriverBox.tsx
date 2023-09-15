import { useState } from "react";

import { useDriver } from "@/modules/drivers";
import styles from "./DriverBox.module.scss";
import { Driver } from "@/modules/drivers/domain/Driver";
import { UpdateDriverModal } from "./UpdateDriverModal";

export const DriverBox = ({driver}: {driver: Driver}) => {
  const [open, setOpen] = useState(false);
  const { setErrors} = useDriver()

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
        <div className={styles.title}>#{driver.id}</div>
        <div className={styles.title}>{driver.name}</div>
        <div className={styles.title}>{driver.phone}</div>
      </div>

      <UpdateDriverModal open={open} handleClose={handleClose} driver={driver} />
    </>
  );
}
