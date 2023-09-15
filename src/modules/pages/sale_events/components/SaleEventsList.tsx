import { SaleEvent } from "@/modules/orders/domain/SaleEvent";
import Head from "next/head";
import { SaleEventBox } from "./SaleEventBox";
import styles from "./SaleEventsList.module.scss";

export const SaleEventsList = ({saleEvents}: {saleEvents:SaleEvent[]}) => {
  return (
    <>
      <Head>
        <title>Marmitex - SaleEvents</title>
      </Head>

      <h2 className={styles.title}>Eventos de Venda Cadastrados</h2>
      <div className={styles.container}>
        {saleEvents?.map((saleEvent) => <SaleEventBox key={saleEvent.id} saleEvent={saleEvent} />)}
      </div>
    </>
  );
};

