import { Budget } from "@/modules/orders/domain/Budget";
import Head from "next/head";
import { BudgetBox } from "./BudgetBox";
import styles from "./BudgetsList.module.scss";

export const BudgetsList = ({budgets}: {budgets:Budget[]}) => {
  return (
    <>
      <Head>
        <title>Marmitex - Budgets</title>
      </Head>

      <h2 className={styles.title}>Orçamentos de Venda Cadastrados</h2>
      <div className={styles.container}>
        {budgets?.map((budget) => <BudgetBox key={budget.id} budget={budget} />)}
      </div>
    </>
  );
};

