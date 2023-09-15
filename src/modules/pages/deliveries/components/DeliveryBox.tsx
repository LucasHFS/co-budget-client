import { useState } from "react";
import { useConfirm } from "material-ui-confirm";

import { useDelivery } from "@/modules/deliveries";
import styles from "./DeliveryBox.module.scss";
import { Delivery } from "@/modules/deliveries/domain/Delivery";

import cx from "classnames";
import { UpdateDeliveryModal } from "./UpdateDeliveryModal";

export const DeliveryBox = ({delivery, selected, onClick}: {delivery: Delivery, selected: boolean, onClick: any}) => {
  const [open, setOpen] = useState(false);
  const { setErrors } = useDelivery()

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  return (
    <>
      <div
        className={cx(styles.box, { [styles.selected]: selected })}
        onClick={() => onClick(delivery?.id)}
      >
        <div className={styles.title}>#{delivery?.id}</div>
        <div className={styles.title}>Pedido: #{delivery?.order?.id}</div>
        <div className={styles.title}>Motorista: {delivery?.driver?.name}</div>
      </div>

      <UpdateDeliveryModal open={open} delivery={delivery} handleClose={handleClose}/>
    </>
  );
}
