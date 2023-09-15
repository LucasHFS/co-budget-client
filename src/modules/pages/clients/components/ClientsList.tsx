import { Client } from "@/modules/clients/domain/Client";
import Head from "next/head";
import { ClientBox } from "./ClientBox";
import styles from "./ClientsList.module.scss";

export const ClientsList = ({clients}: {clients:Client[]}) => {
  return (
    <>
      <Head>
        <title>Marmitex - Clients</title>
      </Head>

      <h2 className={styles.title}>Clientes Cadastrados</h2>

      <div className={styles.container}>
        {clients?.map((client) => <ClientBox key={client.id} client={client} />)}
      </div>
    </>
  );
};

