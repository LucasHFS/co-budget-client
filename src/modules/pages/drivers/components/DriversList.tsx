import { Driver } from "@/modules/drivers/domain/Driver";
import Head from "next/head";
import { DriverBox } from "./DriverBox";
import styles from "./DriversList.module.scss";

export const DriversList = ({drivers}: {drivers:Driver[]}) => {
  return (
    <>
      <Head>
        <title>Marmitex - Drivers</title>
      </Head>

      <h2 className={styles.title}>Motoristas Cadastrados</h2>

      <div className={styles.container}>
        {drivers?.map((driver) => <DriverBox key={driver.id} driver={driver} />)}
      </div>
    </>
  );
};

