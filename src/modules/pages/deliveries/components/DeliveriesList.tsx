import { useDelivery } from "@/modules/deliveries";
import { Delivery } from "@/modules/deliveries/domain/Delivery";
import { Button } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DeliveryBox } from "./DeliveryBox";
import styles from "./DeliveriesList.module.scss";

export const DeliveriesList = ({deliveries, title}: {deliveries:Delivery[], title:string}) => {
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const { registerDelivery, startDelivery,  completeDelivery, cancelDelivery, refetchDeliveries } = useDelivery()

  //@ts-ignore
  const handleBoxClick = (deliveriesId) => {
  //@ts-ignore
    setSelectedDeliveries((prevSelectedDeliveries) => {
  //@ts-ignore
      if (prevSelectedDeliveries.includes(deliveriesId)) {
        // Delivery is already selected, remove it from the list
        return prevSelectedDeliveries.filter((id) => id !== deliveriesId);
      } else {
        // Delivery is not selected, add it to the list
        return [...prevSelectedDeliveries, deliveriesId];
      }
    });
  };

  const handleRegisterSelected = () => {
    registerDelivery({ ids: selectedDeliveries } )
    refetchDeliveries()
    setSelectedDeliveries([])
  };

  const handleStartSelected = () => {
    startDelivery({ ids: selectedDeliveries } )
    refetchDeliveries()
    setSelectedDeliveries([])
  };

  const handleCompleteSelected = () => {
    completeDelivery({ ids: selectedDeliveries } )
    refetchDeliveries()
    setSelectedDeliveries([])
  };

  const handleCancelSelected = () => {
    cancelDelivery({ ids: selectedDeliveries } )
    refetchDeliveries()
    setSelectedDeliveries([])
  };

  useEffect(()=>{
    setSelectedDeliveries([])
  }, [deliveries])

  return (
    <>
      <Head>
        <title>Marmitex - Deliveries</title>
      </Head>

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.buttonsContainer}>
        {!!selectedDeliveries.length && title !== 'Cancelados' && (
          <>
            {title !== 'Registrados' && <Button variant="contained" onClick={handleRegisterSelected} color="secondary">Mover ao Inicio</Button>}
            {title !== 'Em Progresso' && <Button variant="contained" onClick={handleStartSelected}>Iniciar</Button>}
            {title !== 'Finalizados' && <Button variant="contained" onClick={handleCompleteSelected} color="success">Finalizar</Button>}
            <Button variant="contained" onClick={handleCancelSelected} color="error">Cancelar</Button>
          </>
        )}
      </div>

      <div className={styles.container}>
        {deliveries?.length && deliveries.length > 0 ? (
          <>
            {/* @ts-ignore */}
            {deliveries?.map((delivery) => <DeliveryBox key={delivery.id} delivery={delivery} selected={selectedDeliveries.includes(delivery.id)} onClick={handleBoxClick} />)}
          </>
        ) : (
          <h3>Entregas não encontrados...</h3>
        )}
      </div>
    </>
  );
};

