import Head from "next/head";
import { BudgetBox } from "../BudgetBox/BudgetBox";
import styles from "./BudgetsList.module.scss";
import { Budget } from "../../domain/Budget";

export const BudgetsList = ({budgets}: {budgets:Budget[]}) => {
  return (
    <>
      <Head>
        <title>Co-Finance - Budgets</title>
      </Head>

      <h2 className={styles.title}>Selecione o Orçamento</h2>
      <div className={styles.container}>
        {budgets?.map((budget) => <BudgetBox key={budget.id} budget={budget} />)}
      </div>
    </>
  );
};

