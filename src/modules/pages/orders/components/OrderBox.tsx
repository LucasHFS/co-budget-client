import { Button } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useConfirm } from "material-ui-confirm";

import { useOrder } from "@/modules/orders";
import styles from "./OrderBox.module.scss";
import { Order } from "@/modules/orders/domain/Order";

import cx from "classnames";
import { UpdateOrderModal } from "./UpdateOrderModal";

export const OrderBox = ({order, selected, onClick}: {order: Order, selected: boolean, onClick: any}) => {
  const [open, setOpen] = useState(false);
  const { deleteOrder, setErrors } = useOrder()
  const confirm = useConfirm();

  const handleExclude = async (id: number) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira o pedido', titleProps: { color: 'black'}})
      .then(async()=>{
        const success = await deleteOrder({id});

        if(success){
          handleClose()
        }
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  return (
    <>
      <div
        className={cx(styles.box, { [styles.selected]: selected })}
        onClick={() => onClick(order.id)}
      >
        <div className={styles.title}>#{order.id}</div>
        <div className={styles.title}>{order.client.name}</div>
        {order.products.map((product) => (
          <div key={product.name} className={styles.title}>
            {product.name} - {product.quantity} unidade(s) - <NumericFormat
              prefix="R$  "
              displayType="text"
              //@ts-ignore
              value={parseFloat(product.price).toFixed(2)}
            />
          </div>
        ))}
        <div className={styles.title}>{order.isDelivery ? 'P/ Entrega' : 'Retirada no Local'}</div>
        <div className={styles.title}>
          Total: <NumericFormat
            prefix="R$  "
            displayType="text"
            //@ts-ignore
            value={parseFloat(order.price).toFixed(2)}
          />
        </div>
        {selected && (
          <div className={styles.editLine}>
            <Button variant="contained" onClick={handleClickOpen}>Editar</Button>
            {/* @ts-ignore */}
            <Button variant="contained" onClick={() => handleExclude(order.id)} color= "error">Excluir</Button>
          </div>
        )}
      </div>

      <UpdateOrderModal open={open} order={order} handleClose={handleClose}/>
    </>
  );
}
