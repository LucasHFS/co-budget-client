import { useOrder } from "@/modules/orders";
import { Order } from "@/modules/orders/domain/Order";
import { Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Head from "next/head";
import { useEffect, useState } from "react";
import { OrderBox } from "./OrderBox";
import styles from "./OrdersList.module.scss";
import TextField from '@mui/material/TextField';
  //@ts-ignore
import diacritic from "diacritic";
import { SelectDriverModal } from "./SelectDriverModal";

export const OrdersList = ({orders, title}: {orders:Order[], title:string}) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const { registerOrder, prepareOrder, sendOrder,  completeOrder, cancelOrder, refetchOrders } = useOrder()
  const [searchQuery, setSearchQuery] = useState("");
  const { setErrors } = useOrder()


  const [open, setOpen] = useState(false);
  const [driverId, setDriverId] = useState(undefined);

  const handleClose = () => {
    setOpen(false);
    setErrors([])
  };

  const filteredOrders = orders?.filter((order) => {
    // Search by client name
    const clientNameMatches = diacritic.clean(order.client.name).toLowerCase().includes(diacritic.clean(searchQuery).toLowerCase());

    // Search by product names
    const productNames = order.products.map((p) => p.name);
    const productNamesMatches = diacritic.clean(productNames.join(' ')).toLowerCase().includes(diacritic.clean(searchQuery).toLowerCase());

    return clientNameMatches || productNamesMatches;
  });

  //@ts-ignore
  const handleBoxClick = (orderId) => {
  //@ts-ignore
    setSelectedOrders((prevSelectedOrders) => {
  //@ts-ignore
      if (prevSelectedOrders.includes(orderId)) {
        // Order is already selected, remove it from the list
        return prevSelectedOrders.filter((id) => id !== orderId);
      } else {
        // Order is not selected, add it to the list
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const handleRegisterSelected = () => {
    registerOrder({ ids: selectedOrders } )
    refetchOrders()
    setSelectedOrders([])
  };

  const handlePrepareSelected = () => {
    prepareOrder({ ids: selectedOrders } )
    refetchOrders()
    setSelectedOrders([])
  };

  const handleSelectDriver = () => {
    // display modal for selecting driver
    setOpen(true)
  };

  const handleSendSelected = () => {
    sendOrder({ ids: selectedOrders, driverId } )
    handleClose()
    refetchOrders()
    setSelectedOrders([])
  }

  const handleCompleteSelected = () => {
    completeOrder({ ids: selectedOrders } )
    refetchOrders()
    setSelectedOrders([])
  };

  const handleCancelSelected = () => {
    cancelOrder({ ids: selectedOrders } )
    refetchOrders()
    setSelectedOrders([])
  };

  useEffect(()=>{
    setSelectedOrders([])
  }, [orders])

  return (
    <>
      <Head>
        <title>Marmitex - Orders</title>
      </Head>

      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>

        <TextField
          margin="dense"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          sx={{color: 'gray'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ fill: "gray" }} />
              </InputAdornment>
            ),
          }}
        />

      </div>
      <div className={styles.buttonsContainer}>
        {!!selectedOrders.length && title !== 'Cancelados' && (
          <>
            {title !== 'Registrados' && <Button variant="contained" onClick={handleRegisterSelected} color="secondary">Mover ao Inicio</Button>}
            {title !== 'Preparados' && <Button variant="contained" onClick={handlePrepareSelected}>Preparar</Button>}
            {title !== 'Enviados' && <Button variant="contained" onClick={handleSelectDriver} color="warning">Enviar</Button>}
            {title !== 'Finalizados' && <Button variant="contained" onClick={handleCompleteSelected} color="success">Finalizar</Button>}
            <Button variant="contained" onClick={handleCancelSelected} color="error">Cancelar</Button>
          </>
        )}
      </div>

      <div className={styles.container}>
        {!!filteredOrders?.length ? (
          <>
            {/* @ts-ignore */}
            {filteredOrders?.map((order) => <OrderBox key={order.id} order={order} selected={selectedOrders.includes(order.id)} onClick={handleBoxClick} />)}
          </>
        ) : (
          <h3>Pedidos não encontrados...</h3>
        )}
      </div>

      <SelectDriverModal
        open={open}
        onClose={handleClose}
        setDriverId={setDriverId}
        driverId={driverId}
        handleSendSelected={handleSendSelected}
      />
    </>
  );
};

